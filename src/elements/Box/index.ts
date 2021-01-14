import styled from 'styled-components';

interface IBox {
    flex?: boolean;
    column?: boolean;
    margin?: string;
    padding?: string;
    grow?: string;
    borderRadius?: string;
    boxShadow?: boolean;
}

export const Box = styled.div<IBox>`
    align-items: baseline;
    display: ${({flex}) => (flex ? 'flex' : 'block')};
    flex-direction: ${({column}) => (column ? 'column' : 'row')};
    flex-grow: ${({grow = '0'}) => `${grow}`};
    margin: ${({margin = '0'}) => `${margin}`};
    padding: ${({padding = '0'}) => `${padding}`};
    border-radius: ${({borderRadius = '0'}) => `${borderRadius}`};
    box-shadow: ${({boxShadow}) => (boxShadow ? '0 0 15px -4px rgba(34, 60, 80, 0.1)' : 'none')};
`;
