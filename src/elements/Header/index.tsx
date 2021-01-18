import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {ThemeContext} from '../../themes';
import {Container, Logo, HeaderButton} from './styled';
import {Box} from '../Box';

export const Header = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const router = useHistory();

    return (
        <Container>
            <Logo onClick={() => router.push('/')}>Habbiton</Logo>
            <Box flex>
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
            </Box>
        </Container>
    );
};
