import styled from 'styled-components';
import React from 'react';

export interface IButton {
    caption?: string;
    flex?: boolean;
    column?: boolean;
    margin?: string;
    padding?: string;
    grow?: string;
    color?: string;
    border?: string;
    borderRadius?: string;
    background?: string;
    boxShadow?: boolean;
    onClick?: any;
}

const StyledButton = styled.button<IButton>`
    color: ${(props) => props.color || props.theme.color};
    margin: ${({margin = '0'}) => `${margin}`};
    padding: ${({padding = '0'}) => `${padding}`};
    border-radius: ${({borderRadius = '0'}) => `${borderRadius}`};
    border: ${({border = '0'}) => `${border}`};
    background: ${({background}) => `${background ? `#${background}` : 'none'}`};
    box-shadow: ${({boxShadow}) => (boxShadow ? '0 0 15px -4px rgba(34, 60, 80, 0.1)' : 'none')};
    transition: 0.5s ease-out;
    height: 30px;
    cursor: pointer;
`;

export const Button = (props: IButton) => {
    const {caption} = props;
    return (
        <StyledButton type="button" {...props}>
            {caption}
        </StyledButton>
    );
};
