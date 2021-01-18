import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../storage';
import {isShowHabit} from '../../helpers';
import {Title, Bar, Percents} from './styled';
import {Box} from '../Box';
import {IHabit} from '../../storage/habits';
import {IProgressData} from '../../../service/models/Progress';

export const DayProgress = observer((props: {items: IHabit[]; currentDate: string;}) => {
    const { items, currentDate} = props;
    const {progressStore} = useContext(StoreContext);

    let current = 0;
    progressStore.progress.forEach((item: IProgressData) => {
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
