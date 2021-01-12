import React, {useContext, SyntheticEvent} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {isShowHabit} from '../../helpers';
import {ThemeContext, constants} from '../../themes';
import {IHabit, IProgress} from '../../storage';

const ListItem = styled.div`
    transition: ${constants.transition};
    background: ${({theme}) => theme.contentBg};
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

const Title = styled.div`
    transition: ${constants.transition};
    color: ${({theme}) => theme.color};
    position: relative;
`;

const Progress = styled.div<{width: number}>`
    transition: ${constants.transition};
    background: ${({theme}) => theme.progressBg};
    color: ${({theme}) => theme.color};
    width: ${({width}) => (width ? `${width}%` : 0)};
    height: 100%;
    bottom: 0;
    position: absolute;
    left: 0;
`;

const Done = styled.div`
    animation: ${constants.fadeIn} ${constants.transition};
    background: ${({theme}) => theme.color};
    transition: ${constants.transition};
    position: absolute;
    height: 1px;
    top: 24px;
    left: 6px;
    width: calc(100% - 12px);
    z-index: 1;
    background: #000;
`;

const Toolbar = styled.div`
    color: ${({theme}) => theme.color};
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

const Counter = styled.div`
    transition: ${constants.transition};
    color: ${({theme}) => theme.color};
    font-size: 14px;
    z-index: 1;
`;

interface IList {
    items: IHabit[];
    progress: IProgress;
    currentDate: string;
    increaseProgress: Function;
}

export default function List(props: IList) {
    const {items, progress, currentDate, increaseProgress} = props;
    const {settings} = useContext(ThemeContext);
    const router = useHistory();

    const editItem = (ev: SyntheticEvent, key: string) => {
        ev.stopPropagation();
        router.push(`edit/${key}`);
    };

    const list = items.map((item) => {
        if (!isShowHabit(item, currentDate)) {
            return;
        }

        const current = progress.get(item._id)?.progress || 0;
        const width = Math.round((current * 100) / item.countNumber);

        return (
            <ListItem
                theme={settings}
                key={item._id}
                role="presentation"
                onClick={() => increaseProgress(item._id)}
            >
                <Progress
                    theme={settings}
                    width={width}
                />
                <Title
                    theme={settings}
                >
                    {item.title}
                </Title>
                <Counter
                    className="list-item__counter"
                    theme={settings}
                >
                    <span>{current}</span>
                    <span>/</span>
                    <span>{item.countNumber}</span>
                </Counter>
                {current >= item.countNumber && <Done theme={settings} />}
                <Toolbar
                    className="list-item__toolbar"
                    role="presentation"
                    theme={settings}
                    onClick={(ev) => editItem(ev, item._id)}
                >
                    Edit
                </Toolbar>
            </ListItem>
        );
    });

    return <ul>{list}</ul>;
}
