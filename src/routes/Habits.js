import React, {useState, useEffect} from 'react';
import List from '../elements/List/List';
import Edit from '../elements/Edit/Edit';
import {getHabits, saveHabits, getProgress, saveProgress} from '../storage';

export default function Habits() {
    const defaultHabit = {
        key: 0,
        title: 'Training',
        dateRange: null,
    };
    const initialItem = getHabits(defaultHabit);
    const [habits, setHabits] = useState(initialItem);
    const today = new Date().toLocaleDateString();
    const [progress, setProgress] = useState(getProgress());

    useEffect(() => {
        saveHabits(habits);
    }, [habits]);

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
            <Edit items={habits} addHabit={(item) => setHabits([...habits, item])} />
            <List
                items={habits}
                progress={progress}
                increaseProgress={increaseProgress}
            />
        </>
    );
}
