import styled from 'styled-components';

export interface IBox {
    flex?: boolean;
    column?: boolean;
    margin?: string;
    padding?: string;
    grow?: string;
    borderRadius?: string;
    boxShadow?: boolean;
    spaceBetween?: boolean;
    width?: string;
    flexBasis?: string;
}

export const Box = styled.div<IBox>`
    display: ${({flex}) => (flex ? 'flex' : 'block')};
    flex-direction: ${({column}) => (column ? 'column' : 'row')};
    flex-grow: ${({grow = '0'}) => `${grow}`};
    justify-content: ${({spaceBetween}) => `${spaceBetween ? 'space-between' : 'normal'}`};
    width: ${({width = 'auto'}) => `${width}`};
    flex-basis: ${({flexBasis = 'auto'}) => `${flexBasis}`};
    margin: ${({margin = '0'}) => `${margin}`};
    padding: ${({padding = '0'}) => `${padding}`};
    border-radius: ${({borderRadius = '0'}) => `${borderRadius}`};
    box-shadow: ${({boxShadow}) => (boxShadow ? '0 0 15px -4px rgba(34, 60, 80, 0.1)' : 'none')};
`;
