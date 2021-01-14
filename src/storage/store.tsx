import React, {useContext, createContext} from 'react';
import {useLocalObservable} from 'mobx-react-lite';

const createStore = () => {
    return {
        data: 'value',
        setData() {
            this.data = 'value updated';
        },
    };
};

const StoreContext = createContext(null);

export default function StoreProvider(props: any) {
    const dataStore = useLocalObservable(createStore);

    return <StoreContext.Provider value={dataStore} {...props} />;
}

export const useStore = () => useContext(StoreContext);
