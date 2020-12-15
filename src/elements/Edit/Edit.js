import React, {useState, useContext} from 'react';
// import SimpleReactCalendar from 'simple-react-calendar';
import {ThemeContext} from '../../themes';
import './DatePicker.less';
import './Edit.less';

// function dateFormatter({start, end}) {
//     return `${start.toLocaleString('en-US', {month: 'short', day: 'numeric'})} —
//     ${end.toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}`;
// }

export default function Edit(props) {
    const {items, addHabit} = props;
    const newItemInitial = {
        key: items.length,
        title: '',
        dateRange: null,
        countNumber: 1,
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
        background: settings.contentBg,
    };
    const textTheme = {
        color: settings.color,
    };
    const inputTheme = {
        background: settings.inputBg,
        border: settings.inputBorder,
    };

    return (
        <>
            {isEdited
                ? (
                    <div className="edit-container flex-column margin-bottom" style={editTheme}>
                        <h1 style={textTheme}>Add new habit</h1>
                        <div className="flex-column margin-bottom">
                            <label
                                htmlFor="caption"
                                style={textTheme}
                            >
                                Caption
                            </label>
                            <input
                                id="caption"
                                style={{...inputTheme, ...textTheme}}
                                type="text"
                                placeholder="Habit name"
                                value={newItem.title}
                                onChange={(ev) => {
                                    setNewItem({...newItem, ...{title: ev.target.value}});
                                }}
                            />
                        </div>

                        {/* {newItem.dateRange
                            ? <div className="edit-link">{dateFormatter(newItem.dateRange)}</div>
                            : <div className="edit-link">Set date range</div>} */}

                        <div className="flex-column margin-bottom">
                            <label
                                htmlFor="countNumber"
                                style={textTheme}
                            >
                                How many times per day
                            </label>
                            <input
                                id="countNumber"
                                style={{...inputTheme, ...textTheme}}
                                type="number"
                                value={newItem.countNumber}
                                min={1}
                                onChange={(ev) => {
                                    setNewItem({...newItem, ...{countNumber: ev.target.value}});
                                }}
                            />
                        </div>

                        <div className="flex-row">
                            <button
                                type="button"
                                className="button-accented"
                                onClick={handleAdd}
                            >
                                Add
                            </button>

                            <button
                                type="button"
                                className="button-unaccented margin-left"
                                style={textTheme}
                                onClick={() => setIsEdited(false)}
                            >
                                Cancel
                            </button>
                        </div>

                        {/* <SimpleReactCalendar
                            blockClassName="date-picker"
                            mode="range"
                            activeMonth={new Date()}
                            selected={newItem.dateRange}
                            onSelect={(dateRange) => setNewItem({...newItem, dateRange})}
                        /> */}
                    </div>
                )
                : (
                    <div
                        role="presentation"
                        className="link"
                        onClick={() => {
                            setIsEdited(!isEdited);
                            setNewItem(newItemInitial);
                        }}
                    >
                        Add habit
                    </div>
                )}
        </>
    );
}
