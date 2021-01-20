import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react-lite';
import {useHistory, useParams} from 'react-router-dom';
import {StoreContext} from '../storage';
import {InputField} from '../elements/InputField';
import {WeekdaySelector} from '../elements/WeekdaySelector';
import {getFormattedDate} from '../helpers';
import {Button} from '../elements/Button';
import {Timers} from '../elements/Timers';
import {Box} from '../elements/Box';
import {IHabit} from '../storage/habits';

const Container = styled(Box)`
    background: ${(props) => props.theme.contentBg};
`;

const TextComponent = styled.div`
    color: ${(props) => props.theme.color};
`;

const Edit = observer(() => {
    const {habitStore} = useContext(StoreContext);
    const router = useHistory();
    const habitId = useParams<{id: string}>().id;
    let initialItem;
    if (habitId) {
        initialItem = habitStore.habits.find((item: IHabit) => item._id === habitId);
    } else {
        initialItem = {
            title: '',
            dateRange: [getFormattedDate(), null],
            countNumber: 1,
            weekDays: [true, true, true, true, true, false, false],
            notifications: [],
        };
    }

    const [newItem, setNewItem] = useState(initialItem);

    const background = '7fd7e7';
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
                inputWidth="auto"
                value={newItem.title}
                onChange={(title: string) => setNewItem({...newItem, ...{title}})}
            />

            <InputField
                inputId="countNumber"
                label="How many times per day"
                inputType="number"
                inputWidth="15px"
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

            <Timers
                selection={newItem.notifications}
                onSelect={(notifications: string[]) => {
                    setNewItem({...newItem, ...{notifications}});
                }}
            />

            <Box flex spaceBetween grow="1" width="100%">
                <Box>
                    <Button
                        caption={habitId ? 'Save' : 'Add'}
                        padding="0 12px"
                        color="#fff"
                        background={background}
                        borderRadius="5px"
                        onClick={() => {
                            habitStore
                                .saveHabit(newItem)
                                .then(() => router.push('/'));
                        }}
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

                <Button
                    caption="Delete"
                    padding="0 12px"
                    margin="0 0 0 12px"
                    border="1px solid #f58b79"
                    borderRadius="5px"
                    onClick={() => {
                        habitStore
                            .deleteHabit(habitId)
                            .then(() => router.push('/'));
                    }}
                />
            </Box>
        </Container>
    );
});

export default Edit;
