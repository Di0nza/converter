const axios = require('axios');
const {Currency} = require("../schemas/currency");
const ratesFromNationalBelarusianBank = 'https://api.nbrb.by/exrates/rates?periodicity=0'

const rates = async () => {
    const curList = await Currency.find();
    console.log(curList)
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
}

class CurrencyController {

    async getCurrencies(req, res) {
        try {
            //triggerCurrency это та валюта, поле которой изменил пользователь
            const triggerCur = req.body.cur;
            //amount это то, что пользователь ввел в поле
            const amount = req.body.value;
            const curNamesArr = req.body.curNamesArr;

            //Один рубль к валюте, например если 1$=3BYN, то oneBynToCur 0.33 для доллара (т.е. 1BYN=0.33$)
            const oneBynToCur = [];
            const resultCurrencies = [];

            //массив с данными о валютах из апи
            const data = await rates();

            if (triggerCur !== 'BYN') {

                //
                let oneTriggerCurToByn;
                for (const item of data) {
                    if (curNamesArr.includes(item.abbreviation) && item.abbreviation) {
                        oneBynToCur.push({
                            CurAbbreviation: item.abbreviation,
                            value: (parseInt(item.scale) / parseFloat(item.rate)) //этот перевод, чтобы узнать сколько получим валюты из 1 бел руб
                        })
                        if (item.abbreviation === triggerCur) {
                            oneTriggerCurToByn = parseFloat(item.rate)/parseInt(item.scale);
                        }
                    }
                }

                console.log(oneBynToCur)
                //Добавляем белорусские рубли вручную, т.к. нац.банк не отдает бел.руб отдельным элементом в массиве валют
                resultCurrencies.push({
                    CurAbbreviation: 'BYN',
                    value: parseFloat((oneTriggerCurToByn * amount).toFixed(4))
                })

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