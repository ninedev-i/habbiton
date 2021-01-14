import React from 'react';
import {observer} from 'mobx-react-lite';
import {isShowHabit} from '../../helpers';
import {Title, Bar, Percents} from './styled';
import {Box} from '../Box';
import {IProgress, IHabit} from '../../storage';

export const DayProgress = observer((props: {progress: IProgress; items: IHabit[]; currentDate: string;}) => {
    const {progress, items, currentDate} = props;

    let current = 0;
    progress.forEach((item) => {
        current += item.progress;
    });
    const total = items.reduce((a, b) => a + (b && isShowHabit(b, currentDate) ? +b.countNumber : 0), 0);
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
