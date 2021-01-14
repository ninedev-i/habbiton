import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {ThemeContext} from '../../themes';
import {Container, Logo, HeaderButton} from './styled';

export const Header = observer(() => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const router = useHistory();

    return (
        <Container>
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
});
