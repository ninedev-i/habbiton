import {keyframes} from 'styled-components';
import {IHabit} from './storage/habits';

export const getFormattedDate = (date: Date = new Date()): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const isShowHabit = (habit: IHabit, currentDate: string) => {
    const {dateRange, weekDays} = habit;
    const chosenDay = new Date(currentDate);
    let dayNumber = chosenDay.getDay() - 1;
    dayNumber = dayNumber === -1 ? 6 : dayNumber;
    return typeof dateRange[0] === 'string' && chosenDay >= new Date(dateRange[0]) && weekDays
        ? weekDays[dayNumber]
        : false;
};

export const constants = {
    blueMain: '#7fd7e7',
    accentColor: '#f58b79',
    transition: '0.5s ease-out',
    fadeIn: keyframes`
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    `,
};

export const showNotification = (text: string) => {
    if (Notification.permission === 'granted') {
        new Notification(text);
    } else if (Notification.permission !== 'denied') {
        return Notification.requestPermission((permission) => {
            if (permission === 'granted') {
                new Notification(text);
            }
        });
    }
};
