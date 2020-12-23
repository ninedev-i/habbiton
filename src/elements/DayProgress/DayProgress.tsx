import React, {useContext} from 'react';
import styled from 'styled-components';
import {ThemeContext, constants} from '../../themes';
import {isShowHabit} from '../../helpers';
import {IProgress, IHabit} from '../../storage';

const Title = styled.div`
    color: ${({theme}) => theme.color};
    font-weight: bold;
    margin-bottom: 6px;
    font-size: 15px;
`;

const Bar = styled.div`
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background: #e8e8e8;
    overflow: hidden;
`;

const Percents = styled.div<{width: number}>`
    width: ${({width}) => (width ? `${width}%` : 0)};
    background:${constants.accentColor};
    transition: ${constants.transition};
    height: inherit;
`;

interface IDayProgress {
    progress: IProgress;
    items: IHabit[];
    currentDate: string;
}

export default function DayProgress(props: IDayProgress) {
    const {progress, items, currentDate} = props;
    const {settings} = useContext(ThemeContext);
    const currentProgress = progress.get(currentDate) || {};

    let current = 0;
    Object.keys(currentProgress).forEach((key) => {
        current += currentProgress[key];
    });
    const total = items.reduce((a, b) => a + (b && isShowHabit(b, currentDate) ? +b.countNumber : 0), 0);
    const width = Math.round((current * 100) / total);

    return (
        <div className="flex-column">
            <Title theme={settings}>Day progress</Title>
            <Bar>
                <Percents width={width} />
            </Bar>
        </div>
    );
}
