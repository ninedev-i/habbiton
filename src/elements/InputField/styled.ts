import styled from 'styled-components';

export const InputStyled = styled.input`
    width: calc(100% - 14px);
    background: ${(props) => props.theme.inputBg};
    color: ${(props) => props.theme.color};
    border: ${(props) => props.theme.inputBorder};
    
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;

export const InputNumberContainer = styled.div`
    margin: 0 6px;
`;

export const LabelStyled = styled.label`
    color: ${(props) => props.theme.color};
`;

export const NumberContainer = styled.div`
    width: 100px;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
`;
