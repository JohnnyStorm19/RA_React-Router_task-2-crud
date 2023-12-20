export const getDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const dateObj = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
        minute: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    }
    return dateObj;
}