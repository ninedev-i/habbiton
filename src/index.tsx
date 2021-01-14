import React, {Suspense, lazy, useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import {getHabits, saveHabits, IHabit} from './storage';
import {getFormattedDate} from './helpers';
import {Wrapper} from './elements/Wrapper';
import {Header} from './elements/Header';

const Habits = lazy(() => import('./routes/Habits'));
const Edit = lazy(() => import('./routes/Edit'));

const habitsLazyLoading = getHabits();

const ContentWrapper = styled.div`
    background: ${(props) => props.theme.background};
    padding: 12px;
    height: calc(100% - 74px);
    transition: 0.5s ease-out;
`;

const App = observer(() => {
    const [habits, setHabits] = useState([]);
    const [currentDay, setCurrentDay] = useState(getFormattedDate());

    useEffect(() => {
        habitsLazyLoading
            .then((data) => setHabits(data));
    }, []);

    const updateHabits = (updatedItem: IHabit, key: string) => {
        return saveHabits(updatedItem).then((data) => {
            const editedHabits = key
                ? habits.slice(0).map((item) => (item._id === key ? data : item))
                : [...habits, data];
            setHabits(editedHabits);
        });
    };

    return (
        <>
            <Header />
            <ContentWrapper>
                <Suspense fallback={<div>Loading…</div>}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Habits
                                    habits={habits}
                                    currentDay={currentDay}
                                    setCurrentDay={setCurrentDay}
                                />
                            )}
                        />

                        <Route
                            path="/add"
                            render={() => (
                                <Edit
                                    habits={habits}
                                    updateHabits={(item: IHabit, habitId: string) => updateHabits(item, habitId)}
                                />
                            )}
                        />

                        <Route
                            path="/edit/:id"
                            render={() => (
                                <Edit
                                    habits={habits}
                                    updateHabits={(item: IHabit, habitId: string) => updateHabits(item, habitId)}
                                />
                            )}
                        />
                    </Switch>
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
