import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Wrapper} from '../Wrapper';
import {Button, IButton} from './index';

const renderButton = (props?: IButton) => {
    return render(
        <Wrapper>
            <Button caption="Test button" {...props} />
        </Wrapper>,
    );
};

describe('<Button /> tests', () => {
    test('Check content', () => {
        renderButton();
        const button = screen.getByText('Test button');
        expect(button).toHaveTextContent('Test button');
    });

    test('Check default props', () => {
        renderButton();
        const button = screen.getByText('Test button');
        expect(button).toHaveStyle(`
            margin: 0;
            padding: 0;
            border-radius: 0;
            border: 0;
            background: none;
            box-shadow: none;
            transition: 0.5s ease-out;
            height: 30px;
            cursor: pointer;
        `);
    });

    test('Check props', () => {
        const properties = {
            color: 'green',
            margin: '10px',
            padding: '15px',
            borderRadius: '2px',
            border: '2px',
            background: 'fff',
            boxShadow: true,
        };

        renderButton(properties);
        const button = screen.getByText('Test button');
        expect(button).toHaveStyle(`
            color: green;
            margin: 10px;
            padding: 15px;
            border-radius: 2px;
            border: 2px;
            background: #fff;
            box-shadow: 0 0 15px -4px rgba(34,60,80,0.1);
        `);
    });
});
