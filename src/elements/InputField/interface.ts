import {ReactNode} from 'react';

export interface IInputField {
    inputId: string;
    inputType: string;
    placeholder: string;
    value: string|number;
    label: string;
    onChange: Function;
}

export interface ILabel {caption: string;
    forId: string;
}

export interface IInput extends IInputField {
    changeHandler: Function;
    checkValue: Function;
}

export interface IButtonWrapper {
    value: string|number;
    changeHandler: Function;
    children: ReactNode;
}
