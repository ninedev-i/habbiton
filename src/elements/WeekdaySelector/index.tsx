import React from 'react';
import {observer} from 'mobx-react-lite';
import {CheckboxLabel, CheckboxInput, Caption} from './styled';

interface IWeekdaySelector {
    selection: boolean[];
    onSelect: Function;
}

export const WeekdaySelector = observer((props: IWeekdaySelector) => {
    return (
        <div className="flex-column margin-bottom">
            <Caption>Active days</Caption>
            <DaysList {...props} />
        </div>
    );
});

function DaysList(props: IWeekdaySelector) {
    const {selection, onSelect} = props;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun', 'Sat'];
    const list = days.map((day, i) => {
        return (
            <div key={day}>
                <CheckboxInput
                    id={day}
                    type="checkbox"
                    name="option2"
                    value="true"
                    key={day}
                    checked={selection[i]}
                    onChange={(ev) => onSelect(i, ev.target.checked)}
                />
                <CheckboxLabel className="weekdaySelector-label" htmlFor={day}>{day}</CheckboxLabel>
            </div>
        );
    });

    return <div className="flex-row">{list}</div>;
}
