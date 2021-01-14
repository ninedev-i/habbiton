import React from 'react';
import {observer} from 'mobx-react-lite';
import {LabelStyled, InputStyled, InputNumberContainer, NumberContainer} from './styled';
import {IInputField, ILabel, IInput, IButtonWrapper} from './interface';

export const InputField = observer((props: IInputField) => {
    const {inputId, inputType, label, className, onChange} = props;

    const containerClass = `flex-column ${className}`;

    const changeHandler = (value: number) => {
        let output;
        if (inputType === 'number') {
            output = value;
            if (output === 0) {
                output = 1;
            } else if (output < 0) {
                output *= -1;
            }
        } else {
            output = value;
        }
        return onChange(output);
    };

    return (
        <div className={containerClass}>
            <Label
                forId={inputId}
                caption={label}
            />
            {inputType === 'number'
                ? (
                    <ButtonWrapper changeHandler={changeHandler} {...props}>
                        <Input
                            changeHandler={changeHandler}
                            checkValue={(val: number) => {
                                if (!val) {
                                    return changeHandler(1);
                                }
                            }}
                            {...props}
                        />
                    </ButtonWrapper>
                )
                : (
                    <Input
                        changeHandler={changeHandler}
                        checkValue={() => {}}
                        {...props}
                    />
                )}
        </div>
    );
});

function Label({caption, forId}: ILabel) {
    if (!caption) {
        return;
    }

    return (
        <LabelStyled
            htmlFor={forId}
        >
            {caption}
        </LabelStyled>
    );
}

function Input({inputId, inputType, placeholder, value, changeHandler, checkValue}: IInput) {
    return (
        <InputStyled
            id={inputId}
            type={inputType}
            placeholder={placeholder}
            value={value}
            min={1}
            onChange={(ev) => changeHandler(ev.target.value)}
            onBlur={(ev) => checkValue(ev.target.value, inputType)}
        />
    );
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
