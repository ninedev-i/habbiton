import React, {useState} from 'react';
import {InputField} from '../InputField';
import {Box} from '../Box';
import {ButtonWithReset, Caption} from './styled';

export const Timers = (props: {selection: string[], onSelect: Function}) => {
    const [fieldValue, setFieldValue] = useState('');

    const {selection, onSelect} = props;

    const changeHandler = (val: string) => {
        if (val.length < 5) {
            return;
        }
        const updatedTimes = selection.slice(0);
        updatedTimes.push(val);
        onSelect(updatedTimes);
        setFieldValue('');
    };

    const inputs = selection.map((time, key) => {
        return (
            <ButtonWithReset key={key.toString()}>
                {time}
                <button
                    type="button"
                    onClick={() => {
                        const updatedTimes = selection.slice(0);
                        updatedTimes.splice(key, 1);
                        onSelect(updatedTimes);
                    }}
                >
                    x
                </button>
            </ButtonWithReset>
        );
    });

    return (
        <div>
            <Caption>Notifications</Caption>
            <Box flex>{selection.length > 0 && inputs}</Box>
            <InputField
                inputType="time"
                inputId="timer_id"
                inputWidth="68px"
                placeholder=""
                value={fieldValue}
                label=""
                onChange={(val: string) => {
                    setFieldValue(val);
                    if (fieldValue.length === 5) {
                        changeHandler(val);
                    }
                }}
            />
        </div>
    );
};
