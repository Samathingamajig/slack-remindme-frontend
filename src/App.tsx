import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RemindMe from './pages/RemindMe';
import SlackLogin from './pages/SlackLogin';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={RemindMe} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/slack-login" component={SlackLogin} />
                <Route component={() => <Redirect to="/" />} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
