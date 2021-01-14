import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {List} from '../elements/List';
import {DayProgress} from '../elements/DayProgress';
import {DatePicker} from '../elements/DatePicker';
import {getProgress, saveProgress, IHabit} from '../storage';
import {getFormattedDate} from '../helpers';

const Calendar = styled.div`
    width: 250px;
    padding: 0 12px;
`;

interface IHabits {
    habits: IHabit[];
    currentDay: string;
    setCurrentDay: Function;
}

export default function Habits(props: IHabits) {
    const {habits, currentDay, setCurrentDay} = props;
    const [progress, setProgress] = useState(new Map());

    useEffect(() => {
        getProgress(currentDay)
            .then((res) => setProgress(res));
    }, [currentDay]);

    const increaseProgress = (key: string, day = currentDay) => {
        const clonedProgress = new Map(progress);
        if (!progress.get(key)) {
            clonedProgress.set(key, {progress: 0, date: day, habitId: key});
            setProgress(clonedProgress);
        }

        let habitProgress = clonedProgress.get(key).progress;
        const maxCounter = habits.find((item) => item._id === key).countNumber;
        if (!habitProgress || habitProgress < maxCounter) {
            habitProgress = habitProgress ? habitProgress + 1 : 1;
            clonedProgress.set(key, {...clonedProgress.get(key), ...{progress: habitProgress}});
            saveProgress(clonedProgress.get(key))
                .then((res) => {
                    // add _id field if new one
                    clonedProgress.set(key, res);
                    setProgress(clonedProgress);
                });
        }
    };

    return (
        <div className="flex-row">
            <div className="flex-grow">
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
            <Calendar>
                <DatePicker
                    mode="single"
                    disableDaysOfWeek
                    selected={new Date(currentDay)}
                    setSelected={(selection: Date) => setCurrentDay(getFormattedDate(selection))}
                />
            </Calendar>
        </div>
    );
}
