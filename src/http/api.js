import {$host} from './index'

/**Получение всех возможных аббревиатур валют*/
export const getCurrencyLabels = async () => {
    const {data} = await $host.get('api/currency/labels')
    return data;
}
/**
 -------------------------------------------------------------------
 Пример тела ответа:
 [
    {
        "CurAbbreviation": "AED",
        "CurFullName": "UAE dirham"
    },
    {
        "CurAbbreviation": "AMD",
        "CurFullName": "Armenian dram"
    },
    {
        "CurAbbreviation": "AUD",
        "CurFullName": "Australian dollar"
    },
    ...
 ]
 -------------------------------------------------------------------
 */

/**Получение результата конвертации по валютам добавленных на страницу*/
export const getCurrencies = async (form) => {
    const {data} = await $host.post('api/currency/', form);
    return data;
}
/**
 -------------------------------------------------------------------
 Пример тела запроса:
 {"cur": "USD", "value": "1", "curNamesArr": ["USD", "EUR", "RUB", "BYN"]}
 -------------------------------------------------------------------
 Пример тела ответа:
 [
     {
            "CurAbbreviation": "BYN",
            "CurFullName": "Belarusian ruble",
            "value": 3.1958
     },
     {
            "CurAbbreviation": "USD",
            "CurFullName": "U.S. dollar",
            "value": 1
     },
     ...
 ]
 -------------------------------------------------------------------
 */

export const getSortedCurrencies = async (form) => {
    const {data} = await  $host.post('api/currency/sort', form);
    return data;
}
/**
 ----------------------------------------------------------------------------------------------------------------------
 Пример тела запроса:
 {"cur": "USD", "value": "1", "curNamesArr": ["USD", "EUR", "RUB", "BYN"], "sortField": "value", "sortOrder": "desc"}
 ----------------------------------------------------------------------------------------------------------------------
 Пример тела ответа:
 [
     {
            "CurAbbreviation": "EUR",
            "CurFullName": "Euro",
            "value": 0.9385
     },
     {
            "CurAbbreviation": "USD",
            "CurFullName": "U.S. dollar",
            "value": 1
     },
     {
            "CurAbbreviation": "BYN",
            "CurFullName": "Belarusian ruble",
            "value": 3.162
     },
     {
            "CurAbbreviation": "RUB",
            "CurFullName": "Russian ruble",
            "value": 91.9186
     }
 ]
 ----------------------------------------------------------------------------------------------------------------------
 */