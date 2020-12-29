import React, {ReactNode} from 'react';
import {BrowserRouter} from 'react-router-dom';
import ThemeProvider from '../../themes';

export default function Wrapper(props: {children: ReactNode}) {
    return (
        <BrowserRouter>
            <ThemeProvider {...props} />
        </BrowserRouter>
    );
}
