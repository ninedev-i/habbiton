import React, {useState, useContext} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import InputField from '~/elements/InputField/InputField';
import {ThemeContext} from '~/themes';

export default function Edit(props) {
    const router = useHistory();
    const {habits, updateHabits} = props;
    const habitId = useParams().id;
    let initialItem;
    if (habitId) {
        initialItem = habits.find((item) => item.key === +habitId);
    } else {
        initialItem = {
            title: '',
            dateRange: null,
            countNumber: 1,
        };
    }

    const [newItem, setNewItem] = useState(initialItem);

    const handleEdit = () => {
        const key = habitId || +habits.sort((a, b) => a.key - b.key).reverse()[0].key + 1;
        const addedItem = {...newItem, ...{key: +key}};
        updateHabits(addedItem, habitId);
        router.push('/');
    };

    const {settings} = useContext(ThemeContext);
    const editTheme = {
        background: settings.contentBg,
    };
    const textTheme = {
        color: settings.color,
    };

    return (
        <div className="block flex-column margin-bottom" style={editTheme}>
            <h1 style={textTheme}>
                {habitId ? 'Edit ' : 'Add new '}
                habit
            </h1>

            <InputField
                className="margin-bottom"
                inputId="caption"
                label="Caption"
                placeholder="Habit name"
                inputType="text"
                value={newItem.title}
                onChange={(title) => setNewItem({...newItem, ...{title}})}
            />

            <InputField
                className="margin-bottom"
                inputId="countNumber"
                label="How many times per day"
                inputType="number"
                value={newItem.countNumber}
                onChange={(countNumber) => setNewItem({...newItem, ...{countNumber}})}
            />

            <div className="flex-row">
                <button
                    type="button"
                    className="button-accented"
                    onClick={handleEdit}
                >
                    {habitId ? 'Save' : 'Add'}
                </button>

                <button
                    type="button"
                    className="button-unaccented margin-left"
                    style={textTheme}
                    onClick={() => router.push('/')}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
