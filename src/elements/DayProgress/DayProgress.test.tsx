import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {getFormattedDate} from '../../helpers';
import DayProgress from './DayProgress';
import {IHabit, IProgress} from '../../storage';

const renderDayProgress = (habits: IHabit[], progress: IProgress, currentDate: string) => {
    return render(
        <DayProgress
            items={habits}
            progress={progress}
            currentDate={currentDate}
        />,
    );
};

const getRandomData = () => {
    const date = (() => {
        const startDate = new Date(2018, 0, 1).getTime();
        const endDate = new Date(2020, 0, 1).getTime();
        let timestamp = Math.round(Math.random() * (endDate - startDate));
        timestamp += startDate;
        return getFormattedDate(new Date(timestamp));
    })();

    return {
        date,
        habits: [{
            key: 0,
            title: 'Testing habit',
            dateRange: [date, null],
            weekDays: [true, true, true, true, true, true, true],
            countNumber: 6,
        }],
    };
};

describe('<DayProgress /> tests', () => {
    const {date, habits} = getRandomData();
    const randomCountNumber: number = 3;
    const progress: IProgress = new Map();
    progress.set(date, {0: randomCountNumber});

    renderDayProgress(habits, progress, date);

    test('Check initial progress', () => {
        const habitProgressWidth = Math.round((randomCountNumber * 100) / habits[0].countNumber);
        const divWidth = parseInt(getComputedStyle(screen.getByTestId('progress')).width, 10);

        expect(divWidth).toBe(habitProgressWidth);
    });

    test('Change progress', () => {
        progress.set(date, {0: 6});
        renderDayProgress(habits, progress, date);

        const divWidth = parseInt(getComputedStyle(screen.getByTestId('progress')).width, 10);
        expect(divWidth).toBe(100);
    });
});
