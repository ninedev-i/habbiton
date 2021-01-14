import React, {ReactNode} from 'react';
import {BrowserRouter} from 'react-router-dom';
import StoreProvider from '../../storage/store';
import ThemeProvider from '../../themes';

export const Wrapper = (props: {children: ReactNode}) => {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <StoreProvider {...props} />
            </ThemeProvider>
        </BrowserRouter>
    );
};
