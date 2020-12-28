import React, {useState} from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import InputField from './InputField';

const getRandomNumber = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

const NumberInput = ({val = 1}) => {
    const [numberValue, setNumberValue] = useState(val);

    return (
        <InputField
            className="testClass"
            inputId="testId"
            label="Test label"
            inputType="number"
            placeholder="Test placeholder"
            value={numberValue}
            onChange={(countNumber: number) => setNumberValue(countNumber)}
        />
    );
};

describe('<InputField /> tests', () => {
    const renderNumberField = (val?: number) => {
        render(
            <NumberInput val={val} />,
        );
    };

    test('Check initial state', () => {
        const val = getRandomNumber(1, 99);
        renderNumberField(val);
        expect(screen.getByLabelText('Test label')).toHaveValue(val);
    });

    test('Is label click focusing input', () => {
        renderNumberField(6);
        userEvent.click(screen.getByText('Test label'));
        expect(document.activeElement.id).toBe('testId');
    });

    test('Input negative value', () => {
        renderNumberField(6);
        const inputedValue = getRandomNumber(-99, -1);
        const input = screen.getByLabelText('Test label');
        userEvent.type(input, `/{del/}${inputedValue}`);
        expect(input).toHaveValue(Math.abs(inputedValue));
    });

    test('Change value on button click', () => {
        const initValue = 6;
        renderNumberField(initValue);
        const input = screen.getByLabelText('Test label');
        userEvent.click(screen.getByText('-'));
        expect(input).toHaveValue(initValue - 1);
        userEvent.dblClick(screen.getByText('+'));
        expect(input).toHaveValue(initValue + 1);
    });
});
