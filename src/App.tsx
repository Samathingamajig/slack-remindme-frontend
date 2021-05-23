import React from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Me from './components/Me';
import MyReminders from './components/MyReminders';
import RemoveReminder from './components/RemoveReminder';
import UpdateReminder from './components/UpdateReminder';

const App: React.FC = () => {
    return (
        <>
            <h1>Hello</h1>
            <Login />
            <Me />
            <Logout />
            <hr />
            <MyReminders />
            <hr />
            <UpdateReminder />
            <hr />
            <RemoveReminder />
        </>
    );
};

export default App;
