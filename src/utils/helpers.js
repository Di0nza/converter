export const formatStringWithSpaces = (str) => {
    const parts = str.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    const decimalPart = parts[1] !== undefined ? `.${parts[1]}` : '';

    return `${integerPart}${decimalPart}`;
}

export const removeSpacesFromString = (str) => {
    if (typeof str === 'string') {
        return str.replace(/\s/g, '');
    }
    return str;
}