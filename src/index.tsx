import React, {Suspense, lazy, useState, useContext, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import {StoreContext} from './storage';
import {showNotification} from './helpers';
import {Wrapper} from './elements/Wrapper';
import {Header} from './elements/Header';
import {Box} from './elements/Box';

const Habits = lazy(() => import('./routes/Habits'));
const Edit = lazy(() => import('./routes/Edit'));

const ContentWrapper = styled.div`
    background: ${(props) => props.theme.background};
    padding: 12px;
    display: flex;
    justify-content: center;
    height: calc(100% - 74px);
    transition: 0.5s ease-out;
`;

const App = observer(() => {
    const {time, habitStore} = useContext(StoreContext);
    const [times, setTimes] = useState<string[]>([]);

    useEffect(() => {
        habitStore.getHabits();
    }, []);

    useEffect(() => {
        setTimes(habitStore.habits.map((item) => item.notifications).flat());
    }, [habitStore.habits]);

    useEffect(() => {
        if (times.includes(time)) {
            habitStore.habits
                .filter((item) => item.notifications.includes(time))
                .forEach((item) => showNotification(item.title));
        }
    }, [time, times]);

    return (
        <>
            <Header />
            <ContentWrapper>
                <Suspense fallback={<div>Loading…</div>}>
                    <Box flexBasis="1024px">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={Habits}
                            />

                            <Route
                                path="/add"
                                component={Edit}
                            />

                            <Route
                                path="/edit/:id"
                                component={Edit}
                            />
                        </Switch>
                    </Box>
                </Suspense>
            </ContentWrapper>
        </>
    );
});

ReactDOM.render(
    <Wrapper>
        <App />
    </Wrapper>,
    document.getElementById('root'),
);
