import React, {useEffect, useState} from 'react';
import {getSortedCurrencies} from "../http/api";
import {getSavedCurrencies} from "../utils/localStorageFunctions";

const ConverterTable = () => {

//Массив валют, которые отображаются на страницы таблицами
    const [curArr, setCurArr] = useState(getSavedCurrencies);

    useEffect(() => {
        const curNamesArr = curArr.map(item => item.abbreviation);
        getSortedCurrencies({
            cur: 'USD',
            value: 1,
            curNamesArr: curNamesArr,
            sortField: null,
            sortOrder: null
        }).then((data) => {
                const newData = data.map(item => {
                    return ({
                        abbreviation: item.CurAbbreviation,
                        amount: item.value
                    })
                })
                setCurArr(newData)
            }
        )
    }, []);

    return (
        <div>
            {curArr.map((item, index) => (
                <>
                    <div>{item.abbreviation} | {item.amount}</div>
                </>
            ))}
        </div>
    );
};

export default ConverterTable;