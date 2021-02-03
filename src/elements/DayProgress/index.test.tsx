import React, {useContext} from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {getFormattedDate} from '../../helpers';
import {Wrapper} from '../Wrapper';
import {StoreContext} from '../../storage';
import {DayProgress} from './index';
import {IHabit} from '../../storage/habits';

const date = getFormattedDate(new Date());
const tomorrow = getFormattedDate(new Date(+new Date() + 86400000));
const habitId = '0';

interface IRender {
    items: IHabit[];
    currentDate: string;
    countNumber: number;
}

const RenderedProgress = ({items, currentDate, countNumber}: IRender) => {
    const {progressStore} = useContext(StoreContext);
    const progress = new Map();
    progress.set(habitId, {date: currentDate, habitId, progress: countNumber});
    progressStore.setProgress(progress);

    return (
        <DayProgress
            items={items}
            currentDate={currentDate}
        />
    );
};

const renderDayProgress = (habits: IHabit[], currentDate: string, countNumber: number) => {
    return render(
        <Wrapper>
            <RenderedProgress items={habits} currentDate={currentDate} countNumber={countNumber} />
        </Wrapper>,
    );
};

const getData = () => {
    return {
        currentDate: date,
        habits: [{
            _id: habitId,
            title: 'Testing habit',
            dateRange: [date, tomorrow],
            weekDays: [true, true, true, true, true, true, true],
            countNumber: 100,
            notifications: [],
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
    const {habits, currentDate} = getData();

    test('Check initial progress', () => {
        renderDayProgress(habits, currentDate, countNumber);
        const habitProgressWidth = getPercentWidth(countNumber, habits[0].countNumber);

        expect(getCurrentProgressWidth()).toBe(habitProgressWidth);
    });
});
