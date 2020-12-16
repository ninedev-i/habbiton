import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import List from '../elements/List/List';
import DayProgress from '../elements/DayProgress/DayProgress';
import {getProgress, saveProgress} from '../storage';

export default function Habits(props) {
    const {habits} = props;
    const today = new Date().toLocaleDateString();
    const [progress, setProgress] = useState(getProgress());

    const increaseProgress = (key, day = today) => {
        const clonedProgress = new Map(progress);
        if (!progress.get(day)) {
            clonedProgress.set(day, {});
            setProgress(clonedProgress);
        }

        const habitProgress = clonedProgress.get(day);
        const maxCounter = habits.find((item) => item.key === key).countNumber;
        if (!habitProgress[key] || habitProgress[key] < maxCounter) {
            habitProgress[key] = habitProgress[key] ? habitProgress[key] + 1 : 1;
            clonedProgress.set(day, habitProgress);
            setProgress(clonedProgress);
            saveProgress(clonedProgress);
        }
    };

    return (
        <>
            <DayProgress
                items={habits}
                progress={progress}
            />

            <List
                items={habits}
                progress={progress}
                increaseProgress={increaseProgress}
            />
        </>
    );
}
