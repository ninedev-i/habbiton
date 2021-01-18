import React, {ReactNode} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {GlobalStyle} from '../GlobalStyle';
import StoreProvider from '../../storage';
import ThemeProvider from '../../themes';

export const Wrapper = (props: {children: ReactNode}) => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <ThemeProvider>
                <StoreProvider {...props} />
            </ThemeProvider>
        </BrowserRouter>
    );
};
