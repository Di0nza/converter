import React, {useEffect, useState} from 'react';
import {getSortedCurrencies} from "../http/api";
import {getSavedCurrencies} from "../utils/localStorageFunctions";
import sortArrows from '../img/arrows.svg'
import sortArrowsUp from '../img/arrowUp.svg'
import sortArrowsDown from '../img/arrowDown.svg'
import {formatStringWithSpaces} from "../utils/helpers";

const ConverterTable = () => {

//Массив валют, которые отображаются на страницы таблицами
    const [curArr, setCurArr] = useState(getSavedCurrencies);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const handleSortClick = (field) =>{
        if(sortField === field){
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        }else{
            setSortField(field);
            if(field === "abbreviation"){
                setSortOrder("asc");
            }else {
                setSortOrder("desc");
            }

        }
    }


    useEffect(() => {
        const curNamesArr = curArr.map(item => item.abbreviation);
        getSortedCurrencies({
            cur: 'USD',
            value: 1,
            curNamesArr: curNamesArr,
            sortField: sortField,
            sortOrder: sortOrder
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
    }, [sortField, sortOrder]);



    return (
        <div className='converter-container__content'>
            <div className='converter-sort-container'>
                <div className='converter-sort-btn'
                     onClick={()=> handleSortClick("abbreviation")}>
                    <p>Title</p>
                    <img src={sortField === "abbreviation" ? (sortOrder === null ? sortArrows : (sortOrder === "asc" ? sortArrowsUp : sortArrowsDown)) : sortArrows}/>
                </div>
                <div className='converter-sort-btn'
                     onClick={()=> handleSortClick("value")}>
                    <p>Value</p>
                    <img src={sortField === "value" ? (sortOrder === null ? sortArrows : (sortOrder === "desc" ? sortArrowsUp : sortArrowsDown)) : sortArrows}/>
                </div>
            </div>
            <div className='converter-container__table'>
                {curArr.map((item, index) => (
                    <>
                        <div
                            className='converter-container__table-row'
                            style={{backgroundColor: index % 2 === 1 ? '#282828' : 'none', padding: index % 2 === 1 ? '7px 10px' : '2px 10px'}}
                        >
                            <div>{item.abbreviation}</div>
                            <p>{formatStringWithSpaces(""+item.amount)}</p>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default ConverterTable;
