import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {ThemeContext} from '~/themes';
import './List.less';

export default function List(props) {
    const {items, progress, currentDate} = props;
    const {settings} = useContext(ThemeContext);
    const router = useHistory();
    const currentProgress = progress.get(currentDate);

    const list = items.map((item) => {
        const current = (currentProgress && currentProgress[item.key]) || 0;
        let width = Math.round((current * 100) / item.countNumber);
        width = width ? `${width}%` : 0;
        const progressTheme = {
            width,
            background: settings.progressBg,
            color: settings.color,
        };
        const titleTheme = {
            color: settings.color,
        };
        const itemTheme = {
            background: settings.contentBg,
        };

        const editItem = (ev, key) => {
            ev.stopPropagation();
            router.push(`edit/${key}`);
        };

        return (
            <li
                className="list-item"
                style={itemTheme}
                key={item.key.toString()}
                role="presentation"
                onClick={() => props.increaseProgress(item.key)}
            >
                <div className="list-item__progress" style={progressTheme} />
                <div className="list-item__title" style={titleTheme}>{item.title}</div>
                <div className="list-item__counter">
                    <span>{current}</span>
                    <span>/</span>
                    <span>{item.countNumber}</span>
                </div>
                <div
                    className="list-item__toolbar"
                    role="presentation"
                    onClick={(ev) => editItem(ev, item.key)}
                >
                    Edit
                </div>
            </li>
        );
    });

    return (
        <ul className="list-container">
            {list}
        </ul>
    );
}
