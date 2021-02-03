import React, {createContext} from 'react';
import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';
import {Habits} from './habits';
import {Progress} from './progress';

const data = axios.create({
    baseURL: 'http://localhost:3000',
});

class RootStore {
    time: string;
    habitStore: Habits = new Habits(data);
    progressStore: Progress = new Progress(data);

    constructor() {
        this.time = '';
        makeAutoObservable(this);
        setInterval(this.count.bind(this), 1000);
    }

    count() {
        runInAction(() => {
            const now = new Date();
            this.time = `${now.getHours()}:${now.getMinutes()}`;
        });
    }
}

export const StoreContext = createContext({time: '', habitStore: new Habits(data), progressStore: new Progress(data)});

export default function StoreProvider(props: any) {
    return <StoreContext.Provider value={new RootStore()} {...props} />;
}
