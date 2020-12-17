export const getFormattedDate = (date = new Date()) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const isShowHabit = ({dateRange}, currentDate) => {
    return new Date(currentDate) >= new Date(dateRange[0]);
};
