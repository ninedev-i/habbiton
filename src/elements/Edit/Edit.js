import React, {useState, useContext} from 'react';
import SimpleReactCalendar from 'simple-react-calendar';
import {ThemeContext} from '../../themes';
import './DatePicker.less';
import './Edit.less';

function dateFormatter({start, end}) {
    return `${start.toLocaleString('en-US', {month: 'short', day: 'numeric'})} —
    ${end.toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}`;
}

export default function Edit(props) {
    const {items, addHabit} = props;
    const newItemInitial = {
        key: items.length,
        title: '',
        dateRange: null,
        progress: 0,
    };

    const [newItem, setNewItem] = useState(newItemInitial);
    const [isEdited, setIsEdited] = useState(false);

    const handleAdd = () => {
        const addedItem = {...newItem, ...{key: +items.length}};
        addHabit(addedItem);
        setNewItem(newItemInitial);
        setIsEdited(!isEdited);
    };

    const {settings} = useContext(ThemeContext);
    const editTheme = {
        background: settings.background,
    };

    return (
        <>
            {isEdited
                ? (
                    <div className="edit-container" style={editTheme}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newItem.title}
                            onChange={(ev) => setNewItem({...newItem, ...{title: ev.target.value}})}
                        />

                        {newItem.dateRange
                            ? <div className="edit-link">{dateFormatter(newItem.dateRange)}</div>
                            : <div className="edit-link">Set date range</div>}

                        <button type="button" className="button edit-saveButton" onClick={handleAdd}>+</button>

                        <SimpleReactCalendar
                            blockClassName="date-picker"
                            mode="range"
                            activeMonth={new Date()}
                            selected={newItem.dateRange}
                            onSelect={(dateRange) => setNewItem({...newItem, dateRange})}
                        />
                    </div>
                )
                : (
                    <div
                        role="presentation"
                        className="link"
                        onClick={() => setIsEdited(!isEdited)}
                    >
                        Add habit
                    </div>
                )}
        </>
    );
}
