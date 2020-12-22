import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ThemeContext} from '../../themes';
import './Header.less';

export default function Header() {
    const {theme, toggleTheme, settings} = useContext(ThemeContext);
    const bgTheme = {
        background: settings.headerBg,
    };

    return (
        <header className="header-container" style={bgTheme}>
            <Link to="/" className="header-logo">Habbiton</Link>
            <div className="header-link__container">
                <Link to="/add" className="header-link header-toggleTheme">+ Habit</Link>

                <div
                    className="header-link header-toggleTheme"
                    title="Toggle theme"
                    role="presentation"
                    onClick={() => toggleTheme()}
                >
                    {theme === 'light' ? 'Dark theme' : 'Light theme'}
                </div>
            </div>
        </header>
    );
}
