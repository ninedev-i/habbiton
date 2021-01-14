import React, {SyntheticEvent} from 'react';
import {useHistory} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {isShowHabit} from '../../helpers';
import {ListItem, Title, Progress, Done, Toolbar, Counter} from './styled';
import {IHabit, IProgress} from '../../storage';

interface IList {
    items: IHabit[];
    progress: IProgress;
    currentDate: string;
    increaseProgress: Function;
}

export const List = observer((props: IList) => {
    const {items, progress, currentDate, increaseProgress} = props;
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
                key={item._id}
                role="presentation"
                onClick={() => increaseProgress(item._id)}
            >
                <Progress
                    width={width}
                />
                <Title>
                    {item.title}
                </Title>
                <Counter
                    className="list-item__counter"
                >
                    <span>{current}</span>
                    <span>/</span>
                    <span>{item.countNumber}</span>
                </Counter>
                {current >= item.countNumber && <Done />}
                <Toolbar
                    className="list-item__toolbar"
                    role="presentation"
                    onClick={(ev) => editItem(ev, item._id)}
                >
                    Edit
                </Toolbar>
            </ListItem>
        );
    });

    return <ul>{list}</ul>;
});
