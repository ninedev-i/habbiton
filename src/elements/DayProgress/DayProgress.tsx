import React, {useContext} from 'react';
import {ThemeContext} from '../../themes';
import {isShowHabit} from '../../helpers';
import {IProgress, IHabit} from '../../storage';
import './DayProgress.less';

interface IDayProgress {
    progress: IProgress;
    items: IHabit[];
    currentDate: string;
}

export default function DayProgress(props: IDayProgress) {
    const {progress, items, currentDate} = props;
    const currentProgress = progress.get(currentDate) || {};

    let current = 0;
    Object.keys(currentProgress).forEach((key) => {
        current += currentProgress[key];
    });
    const total = items.reduce((a, b) => a + (b && isShowHabit(b, currentDate) ? +b.countNumber : 0), 0);

    const width = Math.round((current * 100) / total);
    const progressWidth = width ? {width: `${width}%`} : {width: 0};

    const {settings} = useContext(ThemeContext);
    const textTheme = {
        color: settings.color,
    };

    return (
        <div className="flex-column">
            <div className="dayProgress-title" style={textTheme}>Day progress</div>
            <div className="dayProgress-bar">
                <div
                    className="dayProgress-bar__percents"
                    style={progressWidth}
                />
            </div>
        </div>
    );
}
