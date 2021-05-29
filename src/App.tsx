import React from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Me from './components/Me';
import Reminders from './components/Reminders';

const App: React.FC = () => {
    return (
        <>
            <Login />
            <Me />
            <Logout />
            <hr />
            <Reminders />
        </>
    );
};

export default App;
