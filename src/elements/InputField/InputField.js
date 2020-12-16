import React, {useContext} from 'react';
import {ThemeContext} from '../../themes';

export default function InputField(props) {
    const {settings} = useContext(ThemeContext);

    const {inputId, inputType, placeholder, label, className, value, onChange} = props;

    const textTheme = {
        color: settings.color,
    };
    const inputTheme = {
        background: settings.inputBg,
        border: settings.inputBorder,
    };

    const containerClass = `flex-column ${className}`;

    return (
        <div className={containerClass}>
            <Label
                forId={inputId}
                caption={label}
                theme={textTheme}
            />
            <input
                id={inputId}
                style={{...inputTheme, ...textTheme}}
                type={inputType}
                placeholder={placeholder}
                value={value}
                min={1}
                onChange={(ev) => {
                    let output = ev.target.value;
                    if (inputType === 'number') {
                        output = +output;
                    }
                    return onChange(output);
                }}
            />
        </div>
    );
}

function Label({caption, forId, theme}) {
    if (!caption) {
        return '';
    }

    return (
        <label
            htmlFor={forId}
            style={theme}
        >
            {caption}
        </label>
    );
}
