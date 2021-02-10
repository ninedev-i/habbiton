import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../storage';
import {isShowHabit} from '../../helpers';
import {ListItem, Title, Progress, Done, Toolbar, Counter} from './styled';

export const List = observer(() => {
    const {habitStore, progressStore, currentDay} = useContext(StoreContext);
    const router = useHistory();

    const list = habitStore.habits.map((item) => {
        if (!isShowHabit(item, currentDay)) {
            return;
        }

        const current = (item._id && progressStore.progress.get(item._id)?.progress) || 0;
        const width = Math.round((current * 100) / item.countNumber);

        return (
            <ListItem
                key={item._id}
                role="presentation"
                onClick={() => progressStore.increaseProgress(item, currentDay)}
            >
                <Progress
                    width={width}
                />
                <Title>
                    {item.title}
                </Title>
                <Counter className="list-item__counter">
                    <span>{current}</span>
                    <span>/</span>
                    <span>{item.countNumber}</span>
                </Counter>
                {current >= item.countNumber && <Done />}
                <Toolbar
                    className="list-item__toolbar"
                    role="presentation"
                    onClick={(ev) => {
                        ev.stopPropagation();
                        router.push(`edit/${item._id}`);
                    }}
                >
                    Edit
                </Toolbar>
            </ListItem>
        );
    });

    return <ul>{list}</ul>;
});
