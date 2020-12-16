import React from 'react';
import './DayProgress.less';

export default function DayProgress(props) {
    const {progress, items} = props;
    const currentProgress = progress.get(new Date().toLocaleDateString());

    let current = 0;
    Object.keys(currentProgress).forEach((key) => {
        current += currentProgress[key];
    });
    const total = items.reduce((a, b) => a + (b ? +b.countNumber : 0), 0);

    let width = Math.round((current * 100) / total);
    width = width ? {width: `${width}%`} : {width: 0};

    return (
        <div className="flex-column">
            <div className="dayProgress-title">Day progress</div>
            <div className="dayProgress-bar">
                <div
                    className="dayProgress-bar__percents"
                    style={width}
                />
            </div>
        </div>
    );
}
