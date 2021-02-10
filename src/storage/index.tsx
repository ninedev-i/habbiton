import React, {createContext} from 'react';
import {makeObservable, observable, action} from 'mobx';
import axios from 'axios';
import {getFormattedDate} from '../helpers';
import {Habits} from './habits';
import {Progress} from './progress';

const data = axios.create({
    baseURL: 'http://localhost:3000',
});

class RootStore {
    time: string;
    currentDay: string;
    habitStore: Habits = new Habits(data);
    progressStore: Progress = new Progress(data);

    constructor() {
        this.time = '';
        this.currentDay = getFormattedDate();
        makeObservable(this, {
            time: observable,
            setTime: action,
            currentDay: observable,
            setCurrentDay: action.bound,
        });
        setInterval(this.setTime.bind(this), 1000);
    }

    setTime() {
        const now = new Date();
        this.time = `${now.getHours()}:${now.getMinutes()}`;
    }

    setCurrentDay(currentDay: Date) {
        this.currentDay = getFormattedDate(currentDay);
    }
}

export const StoreContext = createContext(new RootStore());

export default function StoreProvider(props: any) {
    return <StoreContext.Provider value={new RootStore()} {...props} />;
}
