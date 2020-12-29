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

const getData = (countNumber: number) => {
    const today = new Date();
    const currentDate = getFormattedDate(new Date());
    const nextDate = getFormattedDate(new Date(today.setDate(today.getDate() + 1)));

    const progress: IProgress = new Map();
    progress.set(currentDate, {0: countNumber});
    progress.set(nextDate, {0: 50});

    return {
        currentDate,
        nextDate,
        progress,
        habits: [{
            key: 0,
            title: 'Testing habit',
            dateRange: [currentDate, null],
            weekDays: [true, true, true, true, true, true, true],
            countNumber: 100,
        }],
    };
};

/**
 * @param currentCount – current counter's value
 * @param totalCount – max counter's value
 */
const getPercentWidth = (currentCount: number, totalCount: number) => Math.round((currentCount * 100) / totalCount);

/**
 * Real width of progress in percents
 */
const getCurrentProgressWidth = () => parseInt(getComputedStyle(screen.getByTestId('progress')).width, 10);

describe('<DayProgress /> tests', () => {
    const countNumber = 60;
    const {habits, currentDate, nextDate, progress} = getData(countNumber);

    test('Check initial progress', () => {
        renderDayProgress(habits, progress, currentDate);
        const habitProgressWidth = getPercentWidth(countNumber, habits[0].countNumber);

        expect(getCurrentProgressWidth()).toBe(habitProgressWidth);
    });

    test('Check progress in another day', () => {
        renderDayProgress(habits, progress, nextDate);

        expect(getCurrentProgressWidth()).toBe(50);
    });
});
