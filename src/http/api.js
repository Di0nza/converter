import {$host} from './index'


export const getDefaultCurrencies = async (curNamesArr) =>{
    console.log(curNamesArr)
    const {data} = await $host.post('api/currency/default', curNamesArr);
    return data;
}

export const getCurrencyLabels = async () => {
    const {data} = await $host.get('api/currency/labels')
    return data;
}

export const getSpecialCurrency = async (form) =>{
    const {data} = await $host.post('api/currency/getSpecial', form);
    return data;
}