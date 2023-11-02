import React, {useEffect, useState} from 'react';
import './componentStyles.css'
import {getCurrencyLabels, getCurrencies} from "../http/api";
import {getSavedCurrencies, updateSavedCurrencies} from "../utils/localStorageFunctions";

const Converter = () => {

    //Массив валют, которые отображаются на страницы с инпутами
    const [curArr, setCurArr] = useState(getSavedCurrencies);

    /*Массив аббревиатур валют, которые будут на странице в независимости от выбранных пользователем валют*/
    const baseCurrencies = ['USD', 'EUR', 'RUB', 'BYN'];

    /*Валюта, которую изменяет пользователь, является триггером для отправки запроса на сервер*/
    const [convertTrigger, setConvertTrigger] = useState({abbreviation: '', amount: ''})

    /*Массив с аббревиатурами валют*/
    const [curLabels, setCurLabels] = useState([]);

    /*Состояние для выбранной к добавлению валюты*/
    const [selectedCurrencyToAdd, setSelectedCurrencyToAdd] = useState('');

    const [showDropdown, setShowDropdown] = useState(false);


    /*Добавление валюты с инпутом на страницу */
    const handleCurrencyToAddChange = (selectedCurrency) => {
        setSelectedCurrencyToAdd(selectedCurrency);
        const updatedCurArr = [...curArr, { abbreviation: selectedCurrency, amount: '' }];
        setCurArr(updatedCurArr);
        updateSavedCurrencies(updatedCurArr);
        setCurLabels(curLabels.filter((currency) => currency !== selectedCurrency));
        setConvertTrigger({ abbreviation: updatedCurArr[0].abbreviation, amount: updatedCurArr[0].amount });
        //вызываю, чтобы произошла конвертация, после добавления новой валюты на страницу, можно было просто вызвать функцию convert()
        setShowDropdown(false);

    };

    /*Удаление валюты с инпутом со страницы*/
    const removeCurField = (index) => {
        let data = [...curArr];
        setSelectedCurrencyToAdd('')
        const labels = [...curLabels, data[index].abbreviation].sort((a, b) => a.localeCompare(b));
        setCurLabels(labels);
        /*эта сортировка выше не расхождение с тз, просто если пользователь удаляет валюту, которая ранее была
        добавлена, со страницы, то она попадает в конец списка доступных аббревиатур, поэтому чтобы лишний раз
        не делать запрос на сервер, я сортирую тут*/
        data.splice(index, 1);
        setCurArr(data);
        updateSavedCurrencies(data);
    }

    /*Обработчик изменения значений в инпутах*/
    const handleCurChange = (index, event) => {
        let data = [...curArr];
        data[index].amount = event.target.value
        setCurArr(data);
        updateSavedCurrencies(data);
        setConvertTrigger({abbreviation: data[index].abbreviation, amount: data[index].amount});
    };

    /*Отправка на сервер валюты-триггера, его числового значения введенного пользователем, и массива валют,
     для которых нужно провести расчет*/
    const convert = (trigger, value) => {
        const curNamesArr = curArr.map(item => item.abbreviation)
        getCurrencies({cur: trigger, value: value, curNamesArr: curNamesArr}).then((data) => {
            const newData = [...curArr];
            data.forEach((currency) => {
                if (currency.CurAbbreviation !== trigger) {
                    const {CurAbbreviation, value} = currency;
                    const currencyToUpdate = newData.find((item) => item.abbreviation === CurAbbreviation);
                    if (currencyToUpdate) {
                        currencyToUpdate.amount = value;
                    }
                }
            })
            setCurArr(newData);
            updateSavedCurrencies(newData);
        });
    }


    /*Отслеживание изменения триггера, а так же логика с обработкой данных, если поле ввода - пустая строка*/
    useEffect(() => {

        if (convertTrigger.amount !== '') {
            convert(convertTrigger.abbreviation, convertTrigger.amount);
        } else {
            setCurArr((prevArr) => prevArr.map((item) => {
                return {
                    ...item,
                    amount: (item.abbreviation === convertTrigger.abbreviation) ? "" : 0
                }
            }))
        }

    }, [convertTrigger]);

    /*Заполнение страницы данными при загрузке*/
    useEffect(() => {
        const curNamesArr = curArr.map(item => item.abbreviation);
        getCurrencies({cur: curArr[0].abbreviation, value: curArr[0].amount, curNamesArr: curNamesArr}).then((data) => {
            const newData = [...curArr];
            data.forEach((currency) => {
                const {CurAbbreviation, value} = currency;
                const currencyToUpdate = newData.find((item) => item.abbreviation === CurAbbreviation);
                if (currencyToUpdate) {
                    currencyToUpdate.amount = value;
                }
            })
            setCurArr(newData);
            updateSavedCurrencies(newData);
        })
        getCurrencyLabels().then((data) => {
            setCurLabels(data.filter((currency) => !curArr.some((item) => item.abbreviation === currency)));
        })
    }, [])

    return (
        <div className='converter-container__content'
             style={{backgroundColor: showDropdown ? '#181818' : 'rgba(23, 23, 23, 0.80)'}}
        >
            <div className='converter-container__text'>
                Exchange rates from the Belarusian National Bank
            </div>

            <div className='converter-container__scroll'>
                {curArr.map((item, index) => {
                    return (
                        <div className='converter-container__item' key={index}>
                            <label className='converter-container__labels'>{item.abbreviation}:</label>
                            <input className='converter-container__inputs'
                                   type="text"
                                   value={item.amount}
                                   onChange={event => {
                                       const inputValue = event.target.value;
                                       const filteredValue = inputValue.replace(/[^0-9. ]/g, "");
                                       if (filteredValue.split(".").length <= 2 && /^[0-9.]*$/.test(inputValue)) {
                                           handleCurChange(index, {target: {value: filteredValue}});
                                       }
                                   }}/>
                            {!baseCurrencies.includes(item.abbreviation) ?
                                <button className='converter-container__buttonDelete'
                                        onClick={() => removeCurField(index)}
                                >X
                                </button>
                                : null}
                        </div>
                    )
                })}
            </div>
            {showDropdown && (
                <div className="converter-container__options-list">
                    <div className="converter-container__options">
                        {curLabels.map((label, index) => (
                            <div
                                className="converter-container__option"
                                key={index}
                                style={{backgroundColor: index % 2 === 1 ? '#282828' : 'none', padding: index % 2 === 1 ? '7px 10px' : '1px 10px'}}
                                onClick={() => handleCurrencyToAddChange(label)}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="converter-container__item">
                <div>
                    <div className="converter-container__select" onClick={() => setShowDropdown(!showDropdown)}>
                        {!showDropdown ? 'Add currency' : 'Hide currency'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Converter;
