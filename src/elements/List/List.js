import React, {useContext} from 'react';
import {ThemeContext} from '../../themes';
import './List.less';

export default function List(props) {
    const {settings} = useContext(ThemeContext);
    const itemTheme = {
        background: settings.contentBg,
    };

    const {items} = props;
    const list = items.map((item) => {
        const progress = {
            width: `${item.progress}%`,
            background: settings.progressBg,
            color: settings.color,
        };
        const title = {
            color: settings.color,
        };

        return (
            <li
                className="list-item"
                style={itemTheme}
                key={item.key.toString()}
                role="presentation"
                onClick={() => props.increaseProgress(item.key)}
            >
                <div className="list-item__progress" style={progress} />
                <div className="list-item__title" style={title}>{item.title}</div>
            </li>
        );
    });

    return (
        <ul className="list-container">
            {list}
        </ul>
    );
}
