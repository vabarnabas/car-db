export const getCurrentDateTime = (time: number) => {
    const addZero = (number: number | string) => {
        if (number < 10) {number = "0" + number}
        return number;
    }
    const date = new Date(time);
    return (date.getFullYear() + '.' + addZero(date.getMonth()+1) + '.' + addZero(date.getDate()) + '. ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()))
}