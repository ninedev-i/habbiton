import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {getFormattedDate} from '../../helpers';
import {DayProgress} from './index';
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
    const currentDate = getFormattedDate(new Date());
    const habitId = '0';
    const progress = new Map();
    progress.set(habitId, {date: currentDate, habitId, progress: countNumber});

    return {
        currentDate,
        progress,
        habits: [{
            _id: habitId,
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
    const {habits, currentDate, progress} = getData(countNumber);

    test('Check initial progress', () => {
        renderDayProgress(habits, progress, currentDate);
        const habitProgressWidth = getPercentWidth(countNumber, habits[0].countNumber);

        expect(getCurrentProgressWidth()).toBe(habitProgressWidth);
    });
});
