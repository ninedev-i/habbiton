import React from 'react';
import {Box} from '../Box';
import {Button} from '../Button';
import {LabelStyled, InputStyled, InputNumberContainer, NumberContainer} from './styled';
import {IInputField, ILabel, IInput, IButtonWrapper} from './interface';

export const InputField = (props: IInputField) => {
    const {inputId, inputType, label, onChange} = props;

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
        <Box flex column margin="0 0 12px 0">
            {label && inputId && (
                <Label
                    forId={inputId}
                    caption={label}
                />
            ) }
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
        </Box>
    );
};

function Label({caption, forId}: ILabel) {
    if (!caption) {
        return (
            <div />
        );
    }

    return (
        <LabelStyled
            htmlFor={forId}
        >
            {caption}
        </LabelStyled>
    );
}

function Input({inputId, inputType, placeholder, value, changeHandler, checkValue, inputWidth}: IInput) {
    return (
        <InputStyled
            id={inputId}
            type={inputType}
            placeholder={placeholder}
            width={inputWidth}
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

    const background = '7fd7e7';
    return (
        <NumberContainer>
            <Button
                caption="-"
                padding="0 12px"
                color="#fff"
                background={background}
                borderRadius="5px"
                onClick={() => changeValue()}
            />
            <InputNumberContainer>{children}</InputNumberContainer>
            <Button
                caption="+"
                padding="0 12px"
                color="#fff"
                background={background}
                borderRadius="5px"
                onClick={() => changeValue(true)}
            />
        </NumberContainer>
    );
}
