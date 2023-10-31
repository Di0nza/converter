import React, {useEffect, useState} from 'react';
import './componentStyles.css'
import {getCurrencyLabels, getCurrencies} from "../http/api";

const Converter = () => {
    //Массив валют, которые отображаются на страницы с инпутами
    const [curArr, setCurArr] = useState([
        {abbreviation: 'USD', amount: ''},
        {abbreviation: 'EUR', amount: ''},
        {abbreviation: 'RUB', amount: ''},
        {abbreviation: 'BYN', amount: ''},
    ]);

    /*Массив аббревиатур валют, которые будут на странице в независимости от выбранных пользователем валют*/
    const baseCurrencies = ['USD', 'EUR', 'RUB', 'BYN'];

    /*Валюта, которую изменяет пользователь, является триггером для отправки запроса на сервер*/
    const [convertTrigger, setConvertTrigger] = useState({abbreviation: '', amount: ''})

    /*Массив с аббревиатурами валют*/
    const [curLabels, setCurLabels] = useState([]);

    /*Состояние для выбранной к добавлению валюты*/
    const [selectedCurrencyToAdd, setSelectedCurrencyToAdd] = useState('');

    /*Добавление валюты с инпутом на страницу */
    const handleCurrencyToAddChange = (event) => {
        setSelectedCurrencyToAdd(event.target.value);
        setCurArr([...curArr, {abbreviation: event.target.value, amount: ''}]);
        setCurLabels(curLabels.filter((currency) => currency !== event.target.value));
        setConvertTrigger({abbreviation: curArr[0].abbreviation, amount: curArr[0].amount});
        //вызываю, чтобы произошла конвертация, после добавления новой валюты на страницу, можно было просто вызвать функцию convert()
    };

    /*Удаление валюты с инпутом со страницы*/
    const removeCurField = (index) => {
        let data = [...curArr];
        setSelectedCurrencyToAdd('')
        const labels = [...curLabels, data[index].abbreviation].sort((a,b)=> a.localeCompare(b));
        setCurLabels(labels);
        /*эта сортировка выше не расхождение с тз, просто если пользователь удаляет валюту, которая ранее была
        добавлена, со страницы, то она попадает в конец списка доступных аббревиатур, поэтому чтобы лишний раз
        не делать запрос на сервер, я сортирую тут*/
        data.splice(index, 1);
        setCurArr(data);
    }

    /*Обработчик изменения значений в инпутах*/
    const handleCurChange = (index, event) => {
        let data = [...curArr];
        data[index].amount = event.target.value
        setCurArr(data);
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
        });
    }

    /*Заполнение страницы данными при загрузке*/
    useEffect(() => {
        const curNamesArr = curArr.map(item => item.abbreviation);
        getCurrencies({cur: 'USD', value: "1", curNamesArr: curNamesArr}).then((data) => {
            const newData = [...curArr];
            data.forEach((currency) => {
                const {CurAbbreviation, value} = currency;
                const currencyToUpdate = newData.find((item) => item.abbreviation === CurAbbreviation);
                if (currencyToUpdate) {
                    currencyToUpdate.amount = value;
                }
            })
            setCurArr(newData);
        })
        getCurrencyLabels().then((data) => {
            setCurLabels(data.filter((currency) => !curArr.some((item) => item.abbreviation === currency)));
        })
    }, [])

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

    return (
        <div className='converter-container__content'>
            <div className='converter-container__text'>
                Exchange rates from the National Bank
            </div>

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