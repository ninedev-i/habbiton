import React, {createContext, useState} from 'react';
import {keyframes} from 'styled-components';
import {getTheme, saveTheme} from '../storage';

export const ThemeContext = createContext({
    theme: 'light',
    settings: null,
    toggleTheme: null,
});

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

export default function ThemeProvider(props: any) {
    const [theme, setTheme] = useState(getTheme());
    const toggleTheme = () => {
        const chosenTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(chosenTheme);
        saveTheme(chosenTheme);
    };

    const themes = {
        light: {
            color: '#232227',
            background: '#fafbfc',
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

    const settings = themes[theme];
    const value = {theme, toggleTheme, settings};

    return <ThemeContext.Provider value={value} {...props} setTheme={setTheme} />;
}
