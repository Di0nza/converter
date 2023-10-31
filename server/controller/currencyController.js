const axios = require('axios');


class CurrencyController {

    async getAll(req, res) {
        try {
            const curNamesArr = req.body
            const {data} = await axios.get('https://api.nbrb.by/exrates/rates?periodicity=0')

            //Один рубль к валюте, например если 1$=3BYN, то oneBynToCur 0.33 для доллара (т.е. 1BYN=0.33$)
            const oneBynToCur = [];

            let oneUSDToByn;

            for (const cur of data) {
                if (curNamesArr.includes(cur.Cur_Abbreviation) && cur.Cur_Abbreviation !== 'USD') {
                    oneBynToCur.push({
                        CurAbbreviation: cur.Cur_Abbreviation,
                        value: (parseInt(cur.Cur_Scale) / parseFloat(cur.Cur_OfficialRate))
                    })
                } else if (cur.Cur_Abbreviation === 'USD') {
                    oneBynToCur.push({
                        CurAbbreviation: cur.Cur_Abbreviation,
                        value: (parseInt(cur.Cur_Scale) / parseFloat(cur.Cur_OfficialRate))
                    })
                    oneUSDToByn = parseFloat(cur.Cur_OfficialRate);
                }
            }

            console.log(oneBynToCur)

            const resultCurrencies = [];

            resultCurrencies.push({
                CurAbbreviation: 'BYN',
                value: oneUSDToByn
            })
            for (const cur of oneBynToCur) {
                const calculatedValue = parseFloat(cur.value) * parseFloat(oneUSDToByn)
                resultCurrencies.push({
                    CurAbbreviation: cur.CurAbbreviation,
                    value: parseFloat(calculatedValue.toFixed(4))
                })
            }

            resultCurrencies.sort((a, b) => a.CurAbbreviation.localeCompare(b.CurAbbreviation))
            console.log(resultCurrencies)
            return res.json(resultCurrencies);
        } catch (e) {
            console.log(e.message);
            return res.status(500).message('ERROR 500. INTERNAL SERVER ERROR.')
        }
    }

    async getSpecial(req, res) {
        try {

            const triggerCur = req.body.cur;
            const amount = req.body.value;
            const curNamesArr = req.body.curNamesArr;

            const {data} = await axios.get('https://api.nbrb.by/exrates/rates?periodicity=0')

            //Один рубль к валюте, например если 1$=3BYN, то oneBynToCur 0.33 для доллара (т.е. 1BYN=0.33$)
            const oneBynToCur = [];
            const resultCurrencies = [];

            if(triggerCur !== 'BYN') {


                let oneTriggerCurToByn;

                for (const cur of data) {
                    if (curNamesArr.includes(cur.Cur_Abbreviation) && cur.Cur_Abbreviation !== triggerCur) {
                        oneBynToCur.push({
                            CurAbbreviation: cur.Cur_Abbreviation,
                            value: (parseInt(cur.Cur_Scale) / parseFloat(cur.Cur_OfficialRate))
                        })
                    } else if (cur.Cur_Abbreviation === triggerCur) {
                        oneBynToCur.push({
                            CurAbbreviation: cur.Cur_Abbreviation,
                            value: (parseInt(cur.Cur_Scale) / parseFloat(cur.Cur_OfficialRate))
                        })
                        oneTriggerCurToByn = parseFloat(cur.Cur_OfficialRate);
                    }
                }

                console.log(oneBynToCur)



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

                resultCurrencies.sort((a, b) => a.CurAbbreviation.localeCompare(b.CurAbbreviation))
                console.log(resultCurrencies)
                return res.json(resultCurrencies);

            }else if (triggerCur === 'BYN'){

                resultCurrencies.push({
                    CurAbbreviation: 'BYN',
                    value: amount
                })
                for (const cur of data) {
                    if (curNamesArr.includes(cur.Cur_Abbreviation) && cur.Cur_Abbreviation !== triggerCur) {
                        resultCurrencies.push({
                            CurAbbreviation: cur.Cur_Abbreviation,
                            value: parseFloat(((parseInt(cur.Cur_Scale) / parseFloat(cur.Cur_OfficialRate)) * amount).toFixed(4))
                        })
                    }
                }
                resultCurrencies.sort((a, b) => a.CurAbbreviation.localeCompare(b.CurAbbreviation))
                console.log(resultCurrencies)
                return res.json(resultCurrencies);
            }
        } catch (e) {
            console.log(e.message);
            return res.status(500).message('ERROR 500. INTERNAL SERVER ERROR.')
        }
    }

    async getLabels(req, res){
        try{
            const {data} = await axios.get('https://api.nbrb.by/exrates/rates?periodicity=0')
            const labels = data.map(item => item.Cur_Abbreviation);
            return res.json(labels);
        }catch (e){
            console.log(e.message);
            return res.status(500).message('ERROR 500. INTERNAL SERVER ERROR.')
        }
    }

}

module.exports = new CurrencyController();