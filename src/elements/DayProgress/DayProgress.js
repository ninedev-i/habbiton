import React, {useContext} from 'react';
import {ThemeContext} from '../../themes';
import './DayProgress.less';

export default function DayProgress(props) {
    const {progress, items} = props;
    const currentProgress = progress.get(new Date().toLocaleDateString()) || {};

    let current = 0;
    Object.keys(currentProgress).forEach((key) => {
        current += currentProgress[key];
    });
    const total = items.reduce((a, b) => a + (b ? +b.countNumber : 0), 0);

    let width = Math.round((current * 100) / total);
    width = width ? {width: `${width}%`} : {width: 0};

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
                    style={width}
                />
            </div>
        </div>
    );
}
