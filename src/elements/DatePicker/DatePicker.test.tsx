import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DatePicker from './DatePicker';
import {getFormattedDate} from '../../helpers';

const renderPicker = (setDate: Function) => {
    return render(
        <DatePicker
            mode="single"
            disableDaysOfWeek
            selected={new Date()}
            setSelected={(selection: Date) => setDate(getFormattedDate(selection))}
        />,
    );
};

describe('<DatePicker /> tests', () => {
    const setDate = jest.fn();

    test('Check change date callback', () => {
        renderPicker(setDate);
        const randomDay = Math.round(Math.random() * (28 - 1));
        const settedDate = new Date();
        userEvent.click(screen.getByText(String(randomDay)));
        settedDate.setDate(randomDay);
        expect(setDate).toHaveBeenCalledWith(getFormattedDate(settedDate));
    });
});
