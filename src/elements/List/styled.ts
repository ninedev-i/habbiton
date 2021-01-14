import styled from 'styled-components';
import {constants} from '../../helpers';

export const ListItem = styled.div`
    transition: ${constants.transition};
    background: ${(props) => props.theme.contentBg};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 6px;
    box-shadow: 0 0 15px -4px rgba(34, 60, 80, 0.1);
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 15px -4px rgba(34, 60, 80, 0.3);
        transition: 0.2s ease-out;

        .list-item__toolbar {
            display: block;
        }

        .list-item__counter {
            display: none;
        }
    }
`;

export const Title = styled.div`
    transition: ${constants.transition};
    color: ${(props) => props.theme.color};
    position: relative;
`;

export const Progress = styled.div<{width: number}>`
    transition: ${constants.transition};
    background: ${(props) => props.theme.progressBg};
    color: ${(props) => props.theme.color};
    width: ${({width}) => (width ? `${width}%` : 0)};
    height: 100%;
    bottom: 0;
    position: absolute;
    left: 0;
`;

export const Done = styled.div`
    animation: ${constants.fadeIn} ${constants.transition};
    background: ${(props) => props.theme.color};
    transition: ${constants.transition};
    position: absolute;
    height: 1px;
    top: 24px;
    left: 6px;
    width: calc(100% - 12px);
    z-index: 1;
    background: #000;
`;

export const Toolbar = styled.div`
    color: ${(props) => props.theme.color};
    position: absolute;
    display: none;
    z-index: 1000;
    right: 0;
    padding: 12px;
    top: 0;

    &:hover {
        text-decoration: underline;
    }
`;

export const Counter = styled.div`
    transition: ${constants.transition};
    color: ${(props) => props.theme.color};
    font-size: 14px;
    z-index: 1;
`;
