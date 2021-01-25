import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import {find} from 'styled-components/test-utils';
import {Wrapper} from '../Wrapper';
import {Box, IBox} from './index';

const renderBox = (props?: IBox) => {
    return render(
        <Wrapper>
            <Box {...props}>Test text</Box>
        </Wrapper>,
    );
};

describe('<Box /> tests', () => {
    test('Check content', () => {
        renderBox();
        const box = find(document.querySelector('body'), Box);
        expect(box).toHaveTextContent('Test text');
    });

    test('Check default props', () => {
        renderBox();
        const box = find(document.querySelector('body'), Box);
        expect(box).toHaveStyle(`
            display: block;
            flex-direction: row;
            margin: 0;
            padding: 0;
            flex-grow: 0;
            border-radius: 0;
            box-shadow: none;
            justify-content: normal;
            width: auto;
            flex-basis: auto;
        `);
    });

    test('Check props', () => {
        const properties = {
            flex: true,
            column: true,
            margin: '20px',
            padding: '10px',
            grow: '3',
            borderRadius: '10px',
            boxShadow: true,
            spaceBetween: true,
            width: '140px',
            flexBasis: '160px',
        };

        renderBox(properties);
        const box = find(document.querySelector('body'), Box);
        expect(box).toHaveStyle(`
            display: flex;
            flex-direction: column;
            margin: 20px;
            padding: 10px;
            flex-grow: 3;
            border-radius: 10px;
            box-shadow: 0 0 15px -4px rgba(34,60,80,0.1);
            justify-content: space-between;
            width: 140px;
            flex-basis: 160px;
        `);
    });
});
