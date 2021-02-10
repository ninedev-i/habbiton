import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../storage';
import {isShowHabit} from '../../helpers';
import {Title, Bar, Percents} from './styled';
import {Box} from '../Box';

export const DayProgress = observer(() => {
    const {currentDay, progressStore, habitStore} = useContext(StoreContext);

    let current = 0;
    progressStore.progress.forEach((item) => {
        current += item.progress;
    });
    const total = habitStore.habits.reduce((a, b) => a + (b && isShowHabit(b, currentDay) ? +b.countNumber : 0), 0);
    const width = Math.round((current * 100) / total);

    return (
        <Box flex column>
            <Title>Day progress</Title>
            <Bar role="progressbar">
                <Percents progressWidth={width} data-testid="progress" />
            </Bar>
        </Box>
    );
});
