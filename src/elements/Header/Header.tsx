import React, {useContext} from 'react';
import { useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {ThemeContext, constants} from '../../themes';

const Container = styled.header`
    background: ${({theme}) => theme.headerBg};
    transition: ${constants.transition};
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;

const Logo = styled.a`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
`;

const HeaderButton = styled.div`
    color: #fff;
    cursor: pointer;
    margin-right: 12px;
    border: 1px solid white;
    padding: 2px 8px;
    border-radius: 9px;
    font-size: 14px;
    text-decoration: none;

    &:hover {
        background: rgba(0, 0, 0, 0.05)
    }
`;

export default function Header() {
    const {theme, toggleTheme, settings} = useContext(ThemeContext);
    const router = useHistory();

    return (
        <Container theme={settings}>
            <Logo onClick={() => router.push('/')}>Habbiton</Logo>
            <div className="flex-row">
                <HeaderButton
                    role="presentation"
                    onClick={() => router.push('/add')}
                >
                    + Habit
                </HeaderButton>
                <HeaderButton
                    title="Toggle theme"
                    role="presentation"
                    onClick={() => toggleTheme()}
                >
                    {theme === 'light' ? 'Dark theme' : 'Light theme'}
                </HeaderButton>
            </div>
        </Container>
    );
}
