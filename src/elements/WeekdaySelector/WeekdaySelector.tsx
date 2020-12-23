import React, {useContext} from 'react';
import styled from 'styled-components';
import {ThemeContext, constants} from '../../themes';

const CheckboxLabel = styled.label`
    cursor: pointer;
    display: block;
    padding: 6px 12px;
    margin-right: 12px;
    background: #fafbfc;
    color: #9e9e9e;
`;
const CheckboxInput = styled.input`
    display: none;
    &:checked + .weekdaySelector-label {
        background: ${constants.blueMain};
        color: #fff;
    }
`;
const Caption = styled.div`
    margin: 0 0 4px 0;
    padding: 0;
    font-size: 14px;
    font-weight: bold;
    transition: ${constants.transition};
    color: ${({theme}) => theme.color};
`;

interface IWeekdaySelector {
    selection: boolean[];
    onSelect: Function;
}

export default function WeekdaySelector(props: IWeekdaySelector) {
    const {settings} = useContext(ThemeContext);

    return (
        <div className="flex-column margin-bottom">
            <Caption theme={settings}>Active days</Caption>
            <DaysList {...props} />
        </div>
    );
}

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
