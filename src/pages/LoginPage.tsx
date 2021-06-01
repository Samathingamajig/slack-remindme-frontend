import React from 'react';
import { Redirect } from 'react-router';
import SlackLoginButton from '../components/SlackLoginButton';
import { useMeQuery } from '../generated/graphql';

const LoginPage: React.FC = () => {
    // console.log('LoginPage rendered');

    const { data: meData, loading: meLoading, error: meError } = useMeQuery();

    if (meLoading) return <h3>Loading authentication</h3>;
    if (meError || meData === undefined) {
        return (
            <>
                <h3>Error while authenticating</h3>
                <pre>{JSON.stringify(meError, null, 4)}</pre>
            </>
        );
    }

    if (meData.me !== null && meData.me.slackId !== null) return <Redirect to="/" />;

    return <SlackLoginButton />;
};

export default LoginPage;
