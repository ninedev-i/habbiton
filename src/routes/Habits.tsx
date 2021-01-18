import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';
import {StoreContext} from '../storage';
import {List} from '../elements/List';
import {DayProgress} from '../elements/DayProgress';
import {DatePicker} from '../elements/DatePicker';
import {getFormattedDate} from '../helpers';
import {Box} from '../elements/Box';

const Calendar = styled.div`
    width: 270px;
    padding: 0 12px;
`;

const Habits = (props: {currentDay: string, setCurrentDay: Function}) => {
    const {currentDay, setCurrentDay} = props;
    const {habitStore, progressStore} = useContext(StoreContext);

    useEffect(() => {
        progressStore.getProgress(currentDay);
    }, [currentDay]);

    return (
        <Box flex>
            <Box grow="1" margin="8px 12px 0 0">
                <DayProgress
                    items={habitStore.habits}
                    currentDate={currentDay}
                />

                <List
                    items={habitStore.habits}
                    currentDate={currentDay}
                />
            </Box>
            <Calendar>
                <DatePicker
                    mode="single"
                    disableDaysOfWeek
                    selected={new Date(currentDay)}
                    setSelected={(selection: Date) => setCurrentDay(getFormattedDate(selection))}
                />
            </Calendar>
        </Box>
    );
};

export default Habits;
