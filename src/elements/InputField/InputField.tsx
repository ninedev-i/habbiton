import React, {ReactNode, useContext} from 'react';
import {ThemeContext} from '../../themes';
import './InputField.less';

interface IInputField {
    inputId: string;
    inputType: string;
    placeholder?: string;
    value: string|number;
    label: string;
    className: string;
    onChange: Function;
}

export default function InputField(props: IInputField) {
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

    const changeHandler = (value: string|number) => {
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
                ? (
                    <ButtonWrapper changeHandler={changeHandler} {...props}>
                        <Input
                            theme={{...inputTheme, ...textTheme}}
                            changeHandler={changeHandler}
                            {...props}
                        />
                    </ButtonWrapper>
                )
                : (
                    <Input
                        theme={{...inputTheme, ...textTheme}}
                        changeHandler={changeHandler}
                        {...props}
                    />
                )}
        </div>
    );
}

interface ILabel {
    caption: string;
    forId: string;
    theme: {};
}

function Label({caption, forId, theme}: ILabel) {
    if (!caption) {
        return;
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

interface IInput extends IInputField {
    theme: {};
    changeHandler: Function;
}

function Input({inputId, inputType, placeholder, value, changeHandler, theme}: IInput) {
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

interface IButtonWrapper {
    value: string|number;
    changeHandler: Function;
    children: ReactNode;
}

function ButtonWrapper({value, changeHandler, children}: IButtonWrapper) {
    const changeValue = (isIncrease?: boolean) => {
        changeHandler(isIncrease ? +value + 1 : +value - 1);
    };

    return (
        <div className="flex-row input-number__container">
            <button className="button-accented" type="button" onClick={() => changeValue()}>-</button>
            <div className="input-number">{children}</div>
            <button className="button-accented" type="button" onClick={() => changeValue(true)}>+</button>
        </div>
    );
}
