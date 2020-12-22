import React, {useContext} from 'react';
import {ThemeContext} from '../../themes';
import './WeekdaySelector.less';

interface IWeekdaySelector {
    selection: boolean[];
    onSelect: Function;
}

export default function WeekdaySelector(props: IWeekdaySelector) {
    const {settings} = useContext(ThemeContext);
    const textTheme = {
        color: settings.color,
    };

    const {selection, onSelect} = props;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun', 'Sat'];
    const list = days.map((day, i) => {
        return (
            <div key={day}>
                <input
                    className="weekdaySelector-input"
                    id={day}
                    type="checkbox"
                    name="option2"
                    value="true"
                    key={day}
                    checked={selection[i]}
                    onChange={(ev) => onSelect(i, ev.target.checked)}
                />
                <label className="weekdaySelector-label" htmlFor={day}>{day}</label>
            </div>
        );
    });

    return (
        <div className="flex-column margin-bottom">
            <div className="weekdaySelector-caption" style={textTheme}>Active days</div>
            <div className="flex-row">{list}</div>
        </div>
    );
}
