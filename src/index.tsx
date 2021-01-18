import React, {Suspense, lazy, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import {getFormattedDate} from './helpers';
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

const App = () => {
    const [currentDay, setCurrentDay] = useState(getFormattedDate());

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
                                render={() => (
                                    <Habits
                                        currentDay={currentDay}
                                        setCurrentDay={setCurrentDay}
                                    />
                                )}
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
};

ReactDOM.render(
    <Wrapper>
        <App />
    </Wrapper>,
    document.getElementById('root'),
);
