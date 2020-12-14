import React, {Suspense, lazy, useContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.less';
import ThemeProvider, {ThemeContext} from './themes';
import Header from './elements/Header/Header';

const Habits = lazy(() => import('./routes/Habits'));
const Statistic = lazy(() => import('./routes/Statistic'));

function App() {
    const {settings} = useContext(ThemeContext);
    const containerTheme = {
        background: settings.background,
    };

    return (
        <>
            <Header />
            <div className="container" style={containerTheme}>
                <Suspense fallback={<div>Loading…</div>}>
                    <Switch>
                        <Route exact path="/" component={Habits} />
                        <Route path="/about" component={Statistic} />
                    </Switch>
                </Suspense>
            </div>
        </>
    );
}

ReactDOM.render(
    <Router>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Router>,
    document.getElementById('root'),
);
