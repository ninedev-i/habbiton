import styled from 'styled-components';
import {constants} from '../../helpers';

export const ButtonWithReset = styled.div`
    background: ${constants.blueMain};
    color: #fff;
    padding: 6px 12px;
    width: 57px;
    align-items: baseline;
    margin: 6px 12px 12px 0;
    font-size: 14px;
  
    & button {
        border: 0;
        background: inherit;
        color: inherit;
        cursor: pointer;
      
        &:hover {
            text-decoration: underline;
        }
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
