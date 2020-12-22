import {IHabit} from './storage';

export const getFormattedDate = (date: Date = new Date()): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const isShowHabit = (habit: IHabit, currentDate: string) => {
    const {dateRange, weekDays} = habit;
    const chosenDay = new Date(currentDate);
    let dayNumber = chosenDay.getDay() - 1;
    dayNumber = dayNumber === -1 ? 6 : dayNumber;
    return chosenDay >= new Date(dateRange[0]) && weekDays[dayNumber];
};
