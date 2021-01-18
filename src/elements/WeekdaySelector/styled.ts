import styled from 'styled-components';
import {constants} from '../../helpers';

export const CheckboxLabel = styled.label`
    cursor: pointer;
    display: block;
    padding: 6px 12px;
    margin-right: 12px;
    background: #f0f2f5;
    color: #9e9e9e;
`;

export const CheckboxInput = styled.input`
    display: none;
    &:checked + .weekdaySelector-label {
        background: ${constants.blueMain};
        color: #fff;
    }
`;

export const Caption = styled.div`
    margin: 0 0 4px 0;
    padding: 0;
    font-size: 14px;
    font-weight: bold;
    transition: ${constants.transition};
    color:  ${(props) => props.theme.color};
`;
