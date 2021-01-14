import React, {useState} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react-lite';
import {useHistory, useParams} from 'react-router-dom';
import {InputField} from '../elements/InputField';
import {WeekdaySelector} from '../elements/WeekdaySelector';
import {getFormattedDate} from '../helpers';
import {Button} from '../elements/Button';
import {Box} from '../elements/Box';
import {IHabit} from '../storage';

const Container = styled(Box)`
    background: ${(props) => props.theme.contentBg};
`;

const TextComponent = styled.div`
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
        <Container
            flex
            column
            boxShadow
            margin="0 0 12px 0"
            padding="12px"
            borderRadius="6px"
        >
            <TextComponent as="h1">{habitId ? 'Edit habit' : 'Add new habit'}</TextComponent>

            <InputField
                inputId="caption"
                label="Caption"
                placeholder="Habit name"
                inputType="text"
                value={newItem.title}
                onChange={(title: string) => setNewItem({...newItem, ...{title}})}
            />

            <InputField
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

            <Box flex>
                <Button
                    caption={habitId ? 'Save' : 'Add'}
                    padding="0 12px"
                    color="#fff"
                    background="7fd7e7"
                    borderRadius="5px"
                    onClick={handleEdit}
                />

                <Button
                    caption="Cancel"
                    padding="0 12px"
                    margin="0 0 0 12px"
                    border="1px solid #7fd7e7"
                    borderRadius="5px"
                    onClick={() => router.push('/')}
                />
            </Box>
        </Container>
    );
});

export default Edit;
