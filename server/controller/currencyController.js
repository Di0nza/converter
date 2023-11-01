const axios = require('axios');
const {Currency} = require("../schemas/currency");
const ratesFromNationalBelarusianBank = 'https://api.nbrb.by/exrates/rates?periodicity=0'

const rates = async () => {
    try {
        const curList = await Currency.find();
        if (!curList) {
            const {data} = await axios.get(ratesFromNationalBelarusianBank);
            for (const item of data) {
                await new Currency({
                    abbreviation: item.Cur_Abbreviation,
                    name: item.Cur_Name,
                    scale: item.Cur_Scale,
                    rate: item.Cur_OfficialRate
                }).save();
            }
            console.log("Записей не было");
        } else if (new Date(Date.now()) - (new Date(curList[0].update)) >= 1000 * 60 * 60 * 2) {
            const {data} = await axios.get(ratesFromNationalBelarusianBank);
            for (const item of data) {
                const cur = await Currency.findOne({abbreviation: item.Cur_Abbreviation});
                console.log(cur)
                cur.rate = item.Cur_OfficialRate;
                cur.update = new Date(Date.now());
                await cur.save();
            }
            console.log("Записи старше 2 часов")
        } else {
            console.log(`Взяли актуальные записи из бд`, Date.now());
        }
        return Currency.find();
    }catch (e){
        console.log(e.message);
    }
}

class CurrencyController {

    async getCurrencies(req, res) {
        try {
            //массив с данными о валютах из апи
            const data = await rates();
            //triggerCurrency это та валюта, поле которой изменил пользователь
            const triggerCur = req.body.cur;
            const isTriggerCurInData = data.some(item => item.abbreviation === triggerCur || triggerCur === 'BYN');
            if(!isTriggerCurInData){
                return res.status(412).json({error: 'Error 422. Unprocessable Entity. Wrong currency abbreviation.'});
            }
            //amount это то, что пользователь ввел в поле
            const amount = req.body.value;
            if(!(/^[0-9.]*$/.test(amount))){
                return res.status(412).json({error: 'Error 422. Unprocessable Entity. Wrong currency amount.'});
            }
            //curNamesArr это массив валют, по которым нужно вернуть данные конвертации
            const curNamesArr = req.body.curNamesArr;
            console.log(curNamesArr)
            const areAllCurNamesArrInData = curNamesArr.every(curName => data.some(item=> item.abbreviation === curName || curName === 'BYN'));
            if(!areAllCurNamesArrInData){
                return res.status(412).json({error: 'Error 422. Unprocessable Entity. Wrong currency array.'});
            }

            //Один рубль к валюте, например если 1$=3BYN, то oneBynToCur 0.33 для доллара (т.е. 1BYN=0.33$)
            const oneBynToCur = [];
            const resultCurrencies = [];

            if (triggerCur !== 'BYN') {

                /**
                 Допустим нам пришли такие данные от нац банка:
                 data = [
                    {
                        "Cur_Abbreviation": "USD",
                        "Cur_Scale": 1,
                        "Cur_OfficialRate": 3.162
                    },
                    {
                        "Cur_Abbreviation": "EUR",
                        "Cur_Scale": 1,
                        "Cur_OfficialRate": 3.3692
                    },
                    {
                        "Cur_Abbreviation": "RUB",
                        "Cur_Scale": 100,
                        "Cur_OfficialRate": 3.44
                    }
                 ]
                 В следующем цикле мы вычисляем сколько в 1BYN будет иностранной валюты
                 для этого высчитываем value = Cur_Scale/Cur_OfficialRate, тогда получаем
                 массив oneBynToCur = [
                    {
                        "CurAbbreviation": "USD",
                        "value": 1/3.162 = 0.3162 (ps. 1BYN = 0.3162 USD)
                    },
                    {
                        "CurAbbreviation": "EUR",
                        "value": 1/3.3692 = 0.2968 (ps. 1BYN = 0.2968 EUR)
                    },
                    {
                        "CurAbbreviation": "RUB",
                        "value": 100/3.44 = 29.0697 (ps. 1BYN = 29.0697 RUB)
                    }
                 ]
                 */
                let oneTriggerCurToByn;
                for (const item of data) {
                    if (curNamesArr.includes(item.abbreviation) && item.abbreviation) {
                        oneBynToCur.push({
                            CurAbbreviation: item.abbreviation,
                            value: (parseInt(item.scale) / parseFloat(item.rate)) //этот перевод, чтобы узнать сколько получим валюты из 1 бел руб
                        })
                        if (item.abbreviation === triggerCur) {
                            oneTriggerCurToByn = parseFloat(item.rate)/parseInt(item.scale); //1 единица валюты в бел рублях
                        }
                    }
                }


                console.log('1byn = value \n',oneBynToCur)
                /** Добавляем белорусские рубли вручную, т.к. нац.банк не отдает бел.руб отдельным элементом в массиве валют*/
                resultCurrencies.push({
                    CurAbbreviation: 'BYN',
                    value: parseFloat((oneTriggerCurToByn * amount).toFixed(4))
                })

                /**
                 Теперь для того, чтобы получить результат конвертации мы должны получившиеся значения из предыдущего
                 цикла умножить на курс валюты, которую вводил пользователь (trigger), и на количество, введенное пользователем
                 Допустим trigger = USD, amount = 1 => oneTriggerCurToByn это курс доллара к бел рублю т.е. 1$ = 3.162 BYN
                 resultCurrencies = [
                    {
                        "CurAbbreviation": "USD",
                        "value": 0.3162 * 3.162 * 1 = 1(ps. 1USD = 1 USD)
                    },
                    {
                        "CurAbbreviation": "EUR",
                        "value": 0.2968 * 3.162 * 1 = 0.9384 (ps. 1USD = 0.9384 EUR)
                    },
                    {
                        "CurAbbreviation": "RUB",
                        "value": 29.0697 * 3.162 * 1 = 91.9186 (ps. 1USD = 91.9186 RUB)
                    },
                     //вручную добавленные белорусские рубли
                    {
                        "CurAbbreviation": "BYN",
                        "value": 3.162 * 1 = 3.162 (ps. 1USD = 3.162 BYN)
                    }
                 ]
                 */
                for (const cur of oneBynToCur) {
                    const calculatedValue = parseFloat(cur.value) * parseFloat(oneTriggerCurToByn) * amount;
                    resultCurrencies.push({
                        CurAbbreviation: cur.CurAbbreviation,
                        value: parseFloat(calculatedValue.toFixed(4))
                    })
                }

                console.log(resultCurrencies)
                return res.json(resultCurrencies);

            } else if (triggerCur === 'BYN') {

                /**
                 Если же валюта, которую изменял пользователь была белорусскими рублями, то можно пропустить этап
                 вычисления oneBynToCur, т.к. нац банк выдает ответ в переводе в бел рубли
                 Поэтому чтобы получить результат конвертации
                 мы должны вычислить Cur_Scale/Cur_OfficialRate (сколько в 1BYN будет иностранной валюты) и умножить на
                 amount (количесто бел рублей введенных пользователем) для примера возьмем 100 бел рублей
                 resultCurrencies = [
                    {
                        "CurAbbreviation": "USD",
                        "value": 1/3.162 * 100 = 31.6255 (ps. 100BYN = 31.6255 USD)
                    },
                    {
                        "CurAbbreviation": "EUR",
                        "value": 1/3.3692 * 100 = 29.6806 (ps. 100BYN = 29.6806 EUR)
                    },
                    {
                        "CurAbbreviation": "RUB",
                        "value": 100/3.44 * 100 = 2906.9767 (ps. 100BYN = 2906.9767 RUB)
                    },
                     //вручную добавленные белорусские рубли
                    {
                        "CurAbbreviation": "BYN",
                        "value": 100
                    }
                 ]
                 */
                resultCurrencies.push({
                    CurAbbreviation: 'BYN',
                    value: amount
                })
                for (const cur of data) {
                    if (curNamesArr.includes(cur.abbreviation) && cur.abbreviation !== triggerCur) {
                        resultCurrencies.push({
                            CurAbbreviation: cur.abbreviation,
                            value: parseFloat(((parseInt(cur.scale) / parseFloat(cur.rate)) * amount).toFixed(4))
                        })
                    }
                }
                console.log(resultCurrencies)
                return res.json(resultCurrencies);
            }
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({error: 'ERROR 500. INTERNAL SERVER ERROR.'});
        }
    }

    async getLabels(req, res) {
        try {
            const data = await Currency.find();
            const labels = data.map(item => item.abbreviation).sort((a, b) => a.localeCompare(b));
            return res.json(labels);
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({error: 'ERROR 500. INTERNAL SERVER ERROR.'});
        }
    }

}

module.exports = new CurrencyController();