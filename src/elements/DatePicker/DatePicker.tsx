import React from 'react';
import Calendar from 'simple-react-calendar';
// import Day from 'simple-react-calendar/lib/RenderPropsComponents/Day';

import './DatePicker.less';

interface IDatePicker {
    mode: string;
    disableDaysOfWeek: boolean;
    selected: Date;
    setSelected: Function;
}

export default function DatePicker(props: IDatePicker) {
    const {mode, selected, setSelected, disableDaysOfWeek} = props;

    return (
        <Calendar
            blockClassName="date-picker"
            disableDaysOfWeek={disableDaysOfWeek}
            mode={mode || 'range'}
            activeMonth={new Date()}
            // renderDay={(properties: IDatePicker) => <DayAccented {...properties} />}
            selected={selected}
            onSelect={(selection: IDatePicker) => setSelected(selection)}
        />
    );
}

// function DayAccented(/* props: IDatePicker */) {
//     const {ISODate} = props;
//     return <Day {...props} />;
//     return <div>day</div>;
// }
