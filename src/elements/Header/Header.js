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
            <div className="header-logo">Habbiton</div>
            <div className="header-link__container">
                <div
                    className="header-link"
                    title="Toggle theme"
                    role="presentation"
                    onClick={() => toggleTheme()}
                >
                    {theme}
                </div>
                <Link to="/" className="header-link">Home</Link>
                <Link to="/about" className="header-link">Statistic</Link>
            </div>
        </header>
    );
}
