import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../../themes';
import Header from './Header';

describe('<Header /> tests', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <Header />
                    <Switch>
                        <Route exact path="/">Home</Route>
                        <Route exact path="/add">Add</Route>
                    </Switch>
                </ThemeProvider>
            </BrowserRouter>,
        );
    });

    test('Logo rendered', () => {
        const logo = screen.getByText('Habbiton');
        expect(logo).toBeInTheDocument();
    });

    test('Toggle theme', () => {
        const getThemeButton = () => screen.getByTitle('Toggle theme');
        let previousTheme = getThemeButton().innerHTML;
        const isToggled = (previous: string, current: string) => {
            previousTheme = previousTheme === 'Dark theme' ? 'Light theme' : 'Dark theme';
            return previous !== current;
        };

        userEvent.click(getThemeButton());
        expect(isToggled(previousTheme, getThemeButton().innerHTML)).toBeTruthy();

        userEvent.click(getThemeButton());
        expect(isToggled(previousTheme, getThemeButton().innerHTML)).toBeTruthy();
    });

    test('Change page to /add', () => {
        const routeButton = screen.getByText('+ Habit');
        expect(window.location.pathname).toBe('/');
        userEvent.click(routeButton);
        expect(window.location.pathname).toBe('/add');
    });

    test('Change page to /', () => {
        const logo = screen.getByText('Habbiton');
        userEvent.click(logo);
        expect(window.location.pathname).toBe('/');
    });
});
