import {$host} from './index'


export const getDefaultCurrencies = async () =>{
    const {data} = await $host.get('api/currency/default');
    return data;
}

export const getCurrencies = async () =>{
    const {data} = await $host.get('api/currency/');
    return data;
}

export const getSpecialCurrency = async (form) =>{
    const {data} = await $host.post('api/currency/getSpecial', form);
    return data;
}