import React, {useState, useEffect} from 'react';
import List from '../elements/List/List';
import Edit from '../elements/Edit/Edit';
import {getHabits, saveHabits} from '../storage';

export default function Habits() {
    const defaultHabit = {
        key: 0,
        title: 'Training',
        dateRange: null,
        progress: 10,
    };
    const initialItem = getHabits(defaultHabit);
    const [habits, setHabits] = useState(initialItem);

    useEffect(() => {
        saveHabits(habits);
    }, [habits]);

    const increaseProgress = (key) => {
        const updatedHabits = habits.slice(0);
        updatedHabits.map((item) => {
            if (item.key === key && item.progress < 100) {
                item.progress += 10;
            }
            return item;
        });
        setHabits(updatedHabits);
    };

    return (
        <>
            <Edit items={habits} addHabit={(item) => setHabits([...habits, item])} />
            <List items={habits} increaseProgress={increaseProgress} />
        </>
    );
}
