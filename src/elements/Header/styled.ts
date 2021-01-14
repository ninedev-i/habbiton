import styled from 'styled-components';
import {constants} from '../../helpers';

export const Container = styled.header`
    background: ${(props) => props.theme.headerBg};
    transition: ${constants.transition};
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;

export const Logo = styled.a`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
`;
export const HeaderButton = styled.div`
    color: #fff;
    cursor: pointer;
    margin-right: 12px;
    border: 1px solid white;
    padding: 2px 8px;
    border-radius: 9px;
    font-size: 14px;
    text-decoration: none;

    &:hover {
        background: rgba(0, 0, 0, 0.05)
    }
`;
