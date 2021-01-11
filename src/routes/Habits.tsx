import React, {useState} from 'react';
import styled from 'styled-components';
import List from '../elements/List/List';
import DayProgress from '../elements/DayProgress/DayProgress';
import DatePicker from '../elements/DatePicker/DatePicker';
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
    const [progress, setProgress] = useState(getProgress());

    const increaseProgress = (key: string, day = currentDay) => {
        const clonedProgress = new Map(progress);
        if (!progress.get(day)) {
            clonedProgress.set(day, {});
            setProgress(clonedProgress);
        }

        const habitProgress = clonedProgress.get(day);
        const maxCounter = habits.find((item) => item._id === key).countNumber;
        if (!habitProgress[key] || habitProgress[key] < maxCounter) {
            habitProgress[key] = habitProgress[key] ? habitProgress[key] + 1 : 1;
            clonedProgress.set(day, habitProgress);
            setProgress(clonedProgress);
            saveProgress(clonedProgress);
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
