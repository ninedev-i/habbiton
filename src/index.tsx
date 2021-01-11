import React, {Suspense, lazy, useContext, useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {getHabits, saveHabits, IHabit} from './storage';
import {getFormattedDate} from './helpers';
import {ThemeContext} from './themes';
import Header from './elements/Header/Header';
import Wrapper from './elements/Wrapper/Wrapper';
import './index.less';

const Habits = lazy(() => import('./routes/Habits'));
const Edit = lazy(() => import('./routes/Edit'));

const habitsLazyLoading = getHabits();

function App() {
    const {settings} = useContext(ThemeContext);
    const [habits, setHabits] = useState([]);
    const [currentDay, setCurrentDay] = useState(getFormattedDate());

    useEffect(() => {
        habitsLazyLoading
            .then((data) => setHabits(data));
    }, []);

    const updateHabits = (updatedItem: IHabit, key: string) => {
        saveHabits(updatedItem).then((data) => {
            const editedHabits = key
                ? habits.slice(0).map((item) => (item._id === key ? data : item))
                : [...habits, data];
            setHabits(editedHabits);
        });
    };

    const wrapperTheme = {
        background: settings.background,
    };

    return (
        <>
            <Header />
            <div className="wrapper" style={wrapperTheme}>
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
            </div>
        </>
    );
}

ReactDOM.render(
    <Wrapper>
        <App />
    </Wrapper>,
    document.getElementById('root'),
);
