import {$host} from './index'

/**Получение всех возможных аббревиатур валют*/
export const getCurrencyLabels = async () => {
    const {data} = await $host.get('api/currency/labels')
    return data;
}
/**
 -------------------------------------------------------------------
 Пример тела ответа:
 [ "AUD", "AMD", "BGN", ... ]
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
            "value": 3.1958
     },
     {
            "CurAbbreviation": "USD",
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
            "value": 0.9385
     },
     {
            "CurAbbreviation": "USD",
            "value": 1
     },
     {
            "CurAbbreviation": "BYN",
            "value": 3.162
     },
     {
            "CurAbbreviation": "RUB",
            "value": 91.9186
     }
 ]
 ----------------------------------------------------------------------------------------------------------------------
 */