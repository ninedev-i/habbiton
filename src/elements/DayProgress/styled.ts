import styled from 'styled-components';
import {constants} from '../../helpers';

export const Title = styled.div`
    color: ${(props) => props.theme.color};
    font-weight: bold;
    margin-bottom: 6px;
    font-size: 15px;
`;

export const Bar = styled.div`
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background: #e8e8e8;
    overflow: hidden;
`;

export const Percents = styled.div<{progressWidth: number}>`
    width: ${({progressWidth}) => (progressWidth ? `${progressWidth}%` : 0)};
    background:${constants.accentColor};
    transition: ${constants.transition};
    height: inherit;
`;
