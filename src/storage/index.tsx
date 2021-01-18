import React, {createContext} from 'react';
import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import {Habits} from './habits';
import {Progress} from './progress';

const data = axios.create({
    baseURL: 'http://localhost:3000',
});

class RootStore {
    habitStore = new Habits(data);

    progressStore = new Progress(data);

    constructor() {
        makeAutoObservable(this);
    }
}

export const StoreContext = createContext(null);

export default function StoreProvider(props: any) {
    return <StoreContext.Provider value={new RootStore()} {...props} />;
}
