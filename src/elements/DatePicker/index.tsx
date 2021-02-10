import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import Calendar from 'simple-react-calendar';
import {StoreContext} from '../../storage';
import {CalendarStyles} from './styles';

interface IDatePicker {
    mode: string;
    disableDaysOfWeek: boolean;
}

export const DatePicker = observer((props: IDatePicker) => {
    const {mode, disableDaysOfWeek} = props;
    const {currentDay, setCurrentDay} = useContext(StoreContext);

    return (
        <>
            <CalendarStyles />
            <Calendar
                blockClassName="date-picker"
                disableDaysOfWeek={disableDaysOfWeek}
                mode={mode || 'range'}
                activeMonth={new Date()}
                selected={new Date(currentDay)}
                onSelect={(selection: Date) => setCurrentDay(selection)}
            />
        </>
    );
});
