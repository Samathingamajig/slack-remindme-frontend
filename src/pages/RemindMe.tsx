import React from 'react';
import { Redirect } from 'react-router';
import Logout from '../components/Logout';
import Reminders from '../components/Reminders';
import { useMeQuery } from '../generated/graphql';

const RemindMe: React.FC = () => {
    const { data: meData, loading: meLoading, error: meError } = useMeQuery({ fetchPolicy: 'no-cache' });
    console.log('RemindMe rendered');

    if (meLoading) return <h3>Loading authentication</h3>;
    if (meError || meData === undefined) {
        if (meError?.message === 'not authenticated') return <Redirect to="/login" />;
        console.log(meError?.message);

        return (
            <>
                <h3>Error while authenticating</h3>
                <pre>{JSON.stringify(meError, null, 4)}</pre>
            </>
        );
    }

    if (meData.me === null || meData.me.slackId === null) return <Redirect to="/login" />;

    return (
        <>
            <Logout />
            <hr />
            <Reminders />
        </>
    );
};

export default RemindMe;
