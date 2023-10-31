import React, {useEffect, useState} from 'react';
import './componentStyles.css'
import {getCurrencyLabels, getDefaultCurrencies, getSpecialCurrency} from "../http/api";
const Converter = () => {
    const [curArr, setCurArr] = useState([
        {name: 'USD', amount: ''},
        {name: 'EUR', amount: ''},
        {name: 'RUB', amount: ''},
        {name: 'BYN', amount: ''},
    ]);

    const [convertTrigger, setConvertTrigger] = useState({cur: '', amount: ''})
    const [firstLoad, setFirstLoad] = useState(true)
    const [curLabels, setCurLabels] = useState([]);

    const [selectedCurrencyToAdd, setSelectedCurrencyToAdd] = useState(''); // Состояние для выбранной валюты

    const handleCurrencyToAddChange = (event) => {
        setSelectedCurrencyToAdd(event.target.value);
        setCurArr([...curArr, {name: event.target.value, amount: ''}])
        setConvertTrigger({cur: curArr[0].name, amount: curArr[0].amount})
    };

    const handleCurChange = (index, event) => {
        let data = [...curArr];
        data[index].amount = event.target.value;
        setCurArr(data);
        setConvertTrigger({cur: data[index].name, amount: data[index].amount});
    };

    const convert = (trigger, value) => {
        const curNamesArr = curArr.map(item=> item.name)
        getSpecialCurrency({cur: trigger, value: value, curNamesArr: curNamesArr}).then((data) => {
            const newData = [...curArr];
            data.forEach((currency)=>{
                const {CurAbbreviation, value} = currency;
                const currencyToUpdate = newData.find((item)=> item.name === CurAbbreviation);
                if (currencyToUpdate){
                    currencyToUpdate.amount = value;
                }
            })
            setCurArr(newData);
        });
    }



    useEffect(() => {
        const curNamesArr = curArr.map(item=> item.name);
        getDefaultCurrencies(curNamesArr).then((data) => {
            const newData = [...curArr];
            data.forEach((currency)=>{
                const {CurAbbreviation, value} = currency;
                const currencyToUpdate = newData.find((item)=> item.name === CurAbbreviation);
                if (currencyToUpdate){
                    currencyToUpdate.amount = value;
                }
            })
            setCurArr(newData);
            setFirstLoad(false)
        })
        getCurrencyLabels().then((data) => {
            setCurLabels(data.filter((currency) => !curArr.some((item) => item.name === currency)));
        })
    }, [])



    useEffect(() => {
        if (!firstLoad) {
            console.log(convertTrigger.cur, convertTrigger.amount)
            convert(convertTrigger.cur, convertTrigger.amount);
            console.log(curArr)
        }
    }, [convertTrigger]);

    useEffect(() => {
        setCurLabels(curLabels.filter((currency) => !curArr.some((item) => item.name === currency)));
    }, [curArr])


    return (
        <div className='converter-container__content'>
            <div className='converter-container__text'>
                Exchange rates from the National Bank
            </div>

            {curArr.map((cur, index) => {
                return (
                    <div className='converter-container__item'>
                        <label className='converter-container__labels'>{cur.name}:</label>
                        <input className='converter-container__inputs'
                               type="text"
                               id={index}
                               value={cur.amount}
                               onChange={event => handleCurChange(index, event)}/>
                    </div>
                )
            })}

            <div className="converter-container__item">
                <div>
                    <select
                        className="converter-container__select"
                        id="currencyDropdown"
                        onChange={handleCurrencyToAddChange}
                        value={selectedCurrencyToAdd}
                    >

                        <option className="converter-container__option" value=""> + Add currency</option>
                        {curLabels.map((label, index) => (
                            <option className="converter-container__option" key={index} value={label}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );


};

export default Converter;