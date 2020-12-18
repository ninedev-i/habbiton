export const getFormattedDate = (date = new Date()) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const isShowHabit = ({dateRange, weekDays}, currentDate) => {
    const chosenDay = new Date(currentDate);
    let dayNumber = chosenDay.getDay() - 1;
    dayNumber = dayNumber === -1 ? 6 : dayNumber;
    return chosenDay >= new Date(dateRange[0]) && weekDays[dayNumber];
};
