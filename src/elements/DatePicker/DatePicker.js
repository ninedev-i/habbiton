import React from 'react';
import SimpleReactCalendar from 'simple-react-calendar';

export default function DatePicker() {
    return (
        <SimpleReactCalendar
            blockClassName="date-picker"
            mode="range"
            activeMonth={new Date()}
            // selected={newItem.dateRange}
            // onSelect={(dateRange) => setNewItem({...newItem, dateRange})}
        />
    );
}
