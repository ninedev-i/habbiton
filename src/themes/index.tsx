import React, {createContext, useState} from 'react';
import {keyframes, ThemeProvider as Provider} from 'styled-components';

export interface IThemeProps {
    color?: string;
    background?: string;
    headerBg?: string;
    contentBg?: string;
    progressBg?: string;
    inputBg?: string;
    inputBorder?: string;
}

type ITheme = 'light'|'dark';
export const getTheme = (): ITheme => localStorage.getItem('theme') as ITheme || 'light';

export const saveTheme = (chosenTheme: ITheme) => localStorage.setItem('theme', chosenTheme);

export const constants = {
    blueMain: '#7fd7e7',
    accentColor: '#f58b79',
    transition: '0.5s ease-out',
    fadeIn: keyframes`
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    `,
};

const themes: {light: IThemeProps, dark: IThemeProps} = {
    light: {
        color: '#232227',
        background: '#f0f2f5',
        headerBg: '#7fd7e7',
        contentBg: '#fff',
        progressBg: '#d7f9ff',
        inputBg: '#fff',
        inputBorder: '1px solid #cfcfcf',
    },
    dark: {
        color: '#fff',
        background: '#232227',
        headerBg: '#333237',
        contentBg: '#454449',
        progressBg: '#7fd7e7',
        inputBg: '#444446',
        inputBorder: '1px solid #626164',
    },
};

export const ThemeContext = createContext({theme: 'light', toggleTheme: () => {}});

export default function ThemeProvider(props: any) {
    const [theme, setTheme] = useState(themes[getTheme()]);
    const toggleTheme = () => {
        const chosenTheme = getTheme() === 'light' ? 'dark' : 'light';
        setTheme(themes[chosenTheme]);
        saveTheme(chosenTheme);
    };

    const value = {theme: getTheme(), toggleTheme};

    return (
        <ThemeContext.Provider value={value}>
            <Provider theme={theme} {...props} />
        </ThemeContext.Provider>
    );
}
