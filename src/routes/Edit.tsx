import React, {useState} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react-lite';
import {useHistory, useParams} from 'react-router-dom';
import {InputField} from '../elements/InputField';
import {WeekdaySelector} from '../elements/WeekdaySelector';
import {getFormattedDate} from '../helpers';
import {IHabit} from '../storage';

const Container = styled.div`
    background: ${(props) => props.theme.contentBg};
`;

const Title = styled.h1`
    color: ${(props) => props.theme.color};
`;

const SaveButton = styled.button`
  color: ${(props) => props.theme.color};
`;

interface IEdit {
    habits: IHabit[];
    updateHabits: Function;
}

const Edit = observer((props: IEdit) => {
    const router = useHistory();
    const {habits, updateHabits} = props;
    const habitId = useParams<{id: string}>().id;
    let initialItem;
    if (habitId) {
        initialItem = habits.find((item) => item._id === habitId);
    } else {
        initialItem = {
            title: '',
            dateRange: [getFormattedDate(), null],
            countNumber: 1,
            weekDays: [true, true, true, true, true, false, false],
        };
    }

    const [newItem, setNewItem] = useState(initialItem);

    const handleEdit = () => {
        const addedItem = {...newItem};
        updateHabits(addedItem, habitId)
            .then(() => router.push('/'));
    };

    return (
        <Container className="block flex-column margin-bottom">
            <Title>{habitId ? 'Edit habit' : 'Add new habit'}</Title>

            <InputField
                className="margin-bottom"
                inputId="caption"
                label="Caption"
                placeholder="Habit name"
                inputType="text"
                value={newItem.title}
                onChange={(title: string) => setNewItem({...newItem, ...{title}})}
            />

            <InputField
                className="margin-bottom"
                inputId="countNumber"
                label="How many times per day"
                inputType="number"
                placeholder=""
                value={newItem.countNumber}
                onChange={(countNumber: number) => setNewItem({...newItem, ...{countNumber}})}
            />

            <WeekdaySelector
                selection={newItem.weekDays}
                onSelect={(day: number, isChecked: boolean) => {
                    const weekDays = newItem.weekDays.slice(0);
                    weekDays[day] = isChecked;
                    setNewItem({...newItem, ...{weekDays}});
                }}
            />

            <div className="flex-row">
                <button
                    type="button"
                    className="button-accented"
                    onClick={handleEdit}
                >
                    {habitId ? 'Save' : 'Add'}
                </button>

                <SaveButton
                    type="button"
                    className="button-unaccented margin-left"
                    onClick={() => router.push('/')}
                >
                    Cancel
                </SaveButton>
            </div>
        </Container>
    );
});

export default Edit;
