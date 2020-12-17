import React, {useState} from 'react';
import List from '~/elements/List/List';
import DayProgress from '~/elements/DayProgress/DayProgress';
import DatePicker from '~/elements/DatePicker/DatePicker';
import {getProgress, saveProgress} from '../storage';
import {getFormattedDate} from '~/helpers';
import './Habits.less';

export default function Habits(props) {
    const {habits, currentDay, setCurrentDay} = props;
    const [progress, setProgress] = useState(getProgress());

    const increaseProgress = (key, day = currentDay) => {
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
        <div className="flex-row">
            <div className="habits-main">
                <DayProgress
                    items={habits}
                    progress={progress}
                    currentDate={currentDay}
                />

                <List
                    items={habits}
                    progress={progress}
                    currentDate={currentDay}
                    increaseProgress={increaseProgress}
                />
            </div>
            <div className="habits-calendar">
                <DatePicker
                    mode="single"
                    disableDaysOfWeek="{true}"
                    selected={new Date(currentDay)}
                    setSelected={(selection) => setCurrentDay(getFormattedDate(selection))}
                />
            </div>
        </div>
    );
}
