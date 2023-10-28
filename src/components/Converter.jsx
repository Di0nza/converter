import React, {useEffect, useState} from 'react';
import './componentStyles.css'
import {getCurrencies, getDefaultCurrencies, getSpecialCurrency} from "../http/api";
const Converter = () => {
    const [curArr, setCurErr]= useState([]);
    const [usdValue, setUsdValue] = useState('');
    const [eurValue, setEurValue] = useState('');
    const [rubValue, setRubValue] = useState('');
    const [bynValue, setBynValue] = useState('');
    const [convertTrigger, setConvertTrigger] = useState({cur:'',amount:''})
    const [firstLoad, setFirstLoad] = useState(true)

    const handleUsdChange = (event) => {
        setUsdValue(event.target.value);
        setConvertTrigger({cur:'USD',amount: event.target.value});
    };

    const handleEurChange = (event) => {
        setEurValue(event.target.value);
        setConvertTrigger({cur:'EUR',amount: event.target.value});
    };

    const handleRubChange = (event) => {
        setRubValue(event.target.value);
        setConvertTrigger({cur:'RUB',amount: event.target.value});
    };

    const handleBynChange = (event) => {
        setBynValue(event.target.value);
        setConvertTrigger({cur:'BYN',amount: event.target.value});
    };

    const convert = (trigger, value) => {
        getSpecialCurrency({cur: trigger, value: value}).then((data)=>{
            setBynValue(data[0].value);
            setEurValue(data[1].value);
            setRubValue(data[2].value);
            setUsdValue(data[3].value);
        });
    }

    useEffect(()=>{
        getDefaultCurrencies().then((data)=>{
            console.log(data)
            setBynValue(data[0].value);
            setEurValue(data[1].value);
            setRubValue(data[2].value);
            setUsdValue(data[3].value);
            setFirstLoad(false)
        })
    },[])

    useEffect(()=>{
        if(!firstLoad) {
            console.log(convertTrigger.cur, convertTrigger.amount)
            convert(convertTrigger.cur, convertTrigger.amount);
        }
    },[convertTrigger])




    return (
        <div className='converter-container__content'>
            <div className="converter-container__item">
                <label className='converter-container__labels' htmlFor="usd">USD:</label>
                <input
                    className='converter-container__inputs'
                    type="text"
                    id="usd"
                    value={usdValue}
                    onChange={handleUsdChange}
                />
            </div>
            <div className="converter-container__item">
                <label className='converter-container__labels' htmlFor="eur">EUR:</label>
                <input
                    className='converter-container__inputs'
                    type="text"
                    id="eur"
                    value={eurValue}
                    onChange={handleEurChange}
                />
            </div>
            <div className="converter-container__item">
                <label className='converter-container__labels' htmlFor="rub">RUB:</label>
                <input
                    className='converter-container__inputs'
                    type="text"
                    id="rub"
                    value={rubValue}
                    onChange={handleRubChange}
                />
            </div>
            <div className="converter-container__item">
                <label className='converter-container__labels' htmlFor="byn">BYN:</label>
                <input
                    className='converter-container__inputs'
                    type="text"
                    id="byn"
                    value={bynValue}
                    onChange={handleBynChange}
                />
            </div>
        </div>
    );
};

export default Converter;