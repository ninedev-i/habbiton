import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../storage';
import {isShowHabit} from '../../helpers';
import {ListItem, Title, Progress, Done, Toolbar, Counter} from './styled';
import {IList} from './interface';

export const List = observer((props: IList) => {
    const {items, currentDate} = props;
    const {progressStore} = useContext(StoreContext);
    const router = useHistory();

    const list = items.map((item) => {
        if (!isShowHabit(item, currentDate)) {
            return;
        }

        const current = (item._id && progressStore.progress.get(item._id)?.progress) || 0;
        const width = Math.round((current * 100) / item.countNumber);

        return (
            <ListItem
                key={item._id}
                role="presentation"
                onClick={() => progressStore.increaseProgress(item, currentDate)}
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
