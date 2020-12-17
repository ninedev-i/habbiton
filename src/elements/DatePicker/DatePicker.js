import React from 'react';
import SimpleReactCalendar from 'simple-react-calendar';
import Day from 'simple-react-calendar/lib/RenderPropsComponents/Day';
import './DatePicker.less';

export default function DatePicker(props) {
    const {mode, selected, setSelected, disableDaysOfWeek} = props;

    return (
        <SimpleReactCalendar
            blockClassName="date-picker"
            disableDaysOfWeek={disableDaysOfWeek}
            mode={mode || 'range'}
            activeMonth={new Date()}
            renderDay={(properties) => <DayAccented {...properties} />}
            selected={selected}
            onSelect={(selection) => setSelected(selection)}
        />
    );
}

function DayAccented(props) {
    // const {ISODate} = props;
    return <Day {...props} />;
}
