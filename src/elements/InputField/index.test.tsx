import React, {useState} from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {InputField} from './index';

const NumberInput = ({val = 1}) => {
    const [numberValue, setNumberValue] = useState(val);

    return (
        <InputField
            inputId="testId"
            label="Test label"
            inputType="number"
            placeholder="Test placeholder"
            value={numberValue}
            onChange={(countNumber: number) => setNumberValue(countNumber)}
        />
    );
};

const renderNumberInput = (val?: number) => {
    render(<NumberInput val={val} />);
};

describe('<InputField /> tests', () => {
    test('Check initial state', () => {
        const val = 15;
        renderNumberInput(val);
        expect(screen.getByLabelText('Test label')).toHaveValue(val);
    });

    test('Is label click focusing input', () => {
        renderNumberInput(6);
        userEvent.click(screen.getByText('Test label'));
        expect(document.activeElement?.id).toBe('testId');
    });

    test('Input negative value', () => {
        renderNumberInput(6);
        const negativeValue = -26;
        const input = screen.getByLabelText('Test label');
        userEvent.type(input, `/{del/}${negativeValue}`);
        expect(input).toHaveValue(Math.abs(negativeValue));
    });

    test('Change value on button click', () => {
        const initValue = 6;
        renderNumberInput(initValue);
        const input = screen.getByLabelText('Test label');
        userEvent.click(screen.getByText('-'));
        expect(input).toHaveValue(initValue - 1);
        userEvent.dblClick(screen.getByText('+'));
        expect(input).toHaveValue(initValue + 1);
    });
});
