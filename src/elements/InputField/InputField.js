import React, {useContext} from 'react';
import {ThemeContext} from '~/themes';
import './InputField.less';

export default function InputField(props) {
    const {settings} = useContext(ThemeContext);
    const {inputId, inputType, label, className, onChange} = props;

    const textTheme = {
        color: settings.color,
    };
    const inputTheme = {
        background: settings.inputBg,
        border: settings.inputBorder,
    };

    const containerClass = `flex-column ${className}`;

    const changeHandler = (value) => {
        let output = value;
        if (inputType === 'number') {
            output = +output;

            if (output <= 0) {
                output = 1;
            }
        }
        return onChange(output);
    };

    return (
        <div className={containerClass}>
            <Label
                forId={inputId}
                caption={label}
                theme={textTheme}
            />
            {inputType === 'number'
                ? <ButtonWrapper changeHandler={changeHandler} {...props}>
                    <Input
                        theme={{...inputTheme, ...textTheme}}
                        changeHandler={changeHandler}
                        {...props}
                    />
                </ButtonWrapper>
                : <Input
                    theme={{...inputTheme, ...textTheme}}
                    changeHandler={changeHandler}
                    {...props}
                />}
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

function Input({inputId, inputType, placeholder, value, changeHandler, theme}) {
    return (
        <input
            id={inputId}
            className="input"
            style={theme}
            type={inputType}
            placeholder={placeholder}
            value={value}
            min={1}
            onChange={(ev) => changeHandler(ev.target.value)}
        />
    );
}

function ButtonWrapper({value, changeHandler, children}) {
    const changeValue = (isIncrease) => {
        changeHandler(isIncrease ? ++value : --value);
    }

    return (
        <div className="flex-row input-number__container">
            <button className="button-accented" onClick={() => changeValue()}>-</button>
            <div className="input-number">{children}</div>
            <button className="button-accented" onClick={() => changeValue(true)}>+</button>
        </div>
    );
}
