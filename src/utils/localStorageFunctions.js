export const getSavedCurrencies = () => {
    const curToSaveObject = {
        savedCurrencies: [
            {abbreviation: 'USD', amount: '1'},
            {abbreviation: 'EUR', amount: ''},
            {abbreviation: 'RUB', amount: ''},
            {abbreviation: 'BYN', amount: ''}
        ]
    };
    const curToSaveString = JSON.stringify(curToSaveObject)

    const savedCurString = localStorage.getItem('currencies');
    if (savedCurString) {
        // Если данные найдены, преобразуем их обратно в объект
        const savedCurObject = JSON.parse(savedCurString);

        // Теперь savedData содержит извлеченные данные
        const restoredSavedCurArr = savedCurObject.savedCurrencies;
        console.log(restoredSavedCurArr);
        return restoredSavedCurArr;
    } else {
        localStorage.setItem('currencies', curToSaveString);
        return curToSaveObject.savedCurrencies;
    }
}

export const updateSavedCurrencies = (curArr) =>{
    const curToSaveObject = {
        savedCurrencies: []
    };
    curToSaveObject.savedCurrencies = curArr;
    const curToSaveString = JSON.stringify(curToSaveObject);
    localStorage.setItem('currencies', curToSaveString);
}
