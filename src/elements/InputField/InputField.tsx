import React, {ReactNode, useContext} from 'react';
import styled from 'styled-components';
import {ThemeContext} from '../../themes';

const InputStyled = styled.input`
    width: calc(100% - 14px);
    background: ${({theme}) => theme.inputBg};
    color: ${({theme}) => theme.color};
    border: ${({theme}) => theme.inputBorder};
    
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;

const InputNumberContainer = styled.div`
    margin: 0 6px;
`;

const LabelStyled = styled.label`
    color: ${({theme}) => theme.color};
`;

const NumberContainer = styled.div`
    width: 100px;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
`;

interface IInputField {
    inputId: string;
    inputType: string;
    placeholder: string;
    value: string|number;
    label: string;
    className: string;
    onChange: Function;
}

export default function InputField(props: IInputField) {
    const {inputId, inputType, label, className, onChange} = props;
    const {settings} = useContext(ThemeContext);

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
                theme={settings}
            />
            {inputType === 'number'
                ? (
                    <ButtonWrapper changeHandler={changeHandler} {...props}>
                        <Input
                            theme={settings}
                            changeHandler={changeHandler}
                            {...props}
                        />
                    </ButtonWrapper>
                )
                : (
                    <Input
                        theme={settings}
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
        <LabelStyled
            htmlFor={forId}
            theme={theme}
        >
            {caption}
        </LabelStyled>
    );
}

interface IInput extends IInputField {
    theme: {};
    changeHandler: Function;
}

function Input({inputId, inputType, placeholder, value, changeHandler, theme}: IInput) {
    return (
        <InputStyled
            id={inputId}
            theme={theme}
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
        <NumberContainer>
            <button className="button-accented" type="button" onClick={() => changeValue()}>-</button>
            <InputNumberContainer>{children}</InputNumberContainer>
            <button className="button-accented" type="button" onClick={() => changeValue(true)}>+</button>
        </NumberContainer>
    );
}
