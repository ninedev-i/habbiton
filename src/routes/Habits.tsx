import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import styled from 'styled-components';
import {StoreContext} from '../storage';
import {List} from '../elements/List';
import {DayProgress} from '../elements/DayProgress';
import {DatePicker} from '../elements/DatePicker';
import {Box} from '../elements/Box';

const Calendar = styled.div`
    width: 270px;
    padding: 0 12px;
`;

const Habits = observer(() => {
    const {currentDay, progressStore} = useContext(StoreContext);

    useEffect(() => {
        progressStore.getProgress(currentDay);
    }, [currentDay]);

    return (
        <Box flex>
            <Box grow="1" margin="8px 12px 0 0">
                <DayProgress />
                <List />
            </Box>
            <Calendar>
                <DatePicker
                    mode="single"
                    disableDaysOfWeek
                />
            </Calendar>
        </Box>
    );
});

export default Habits;
