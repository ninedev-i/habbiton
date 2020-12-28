import React, {useState} from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DatePicker from './DatePicker';
import {getFormattedDate} from '../../helpers';

const Picker = ({setDate}: {setDate: Function}) => {
    const [currentDay] = useState(getFormattedDate());

    return (
        <DatePicker
            mode="single"
            disableDaysOfWeek
            selected={new Date(currentDay)}
            setSelected={(selection: Date) => setDate(getFormattedDate(selection))}
        />
    );
};

describe('<DatePicker /> tests', () => {
    const setDate = jest.fn();
    beforeEach(() => {
        render(
            <Picker setDate={setDate} />,
        );
    });

    test('DatePicker rendered', () => {
        const day28ofMonth = '28';
        expect(screen.getByText(day28ofMonth)).toBeInTheDocument();
    });

    test('Change date', () => {
        const randomDay = Math.round(Math.random() * (28 - 1));
        const settedDate = new Date();
        userEvent.click(screen.getByText(String(randomDay)));
        settedDate.setDate(randomDay);
        expect(setDate).toHaveBeenCalledWith(getFormattedDate(settedDate));
    });
});
