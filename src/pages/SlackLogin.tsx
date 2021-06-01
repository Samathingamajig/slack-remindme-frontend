import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SlackLoginButton from '../components/SlackLoginButton';
import { useLoginMutation, useMeQuery } from '../generated/graphql';

const SlackLogin: React.FC = () => {
    console.log('SlackLogin rendered');

    const { data: meData, loading: meLoading } = useMeQuery({ fetchPolicy: 'no-cache' });

    const history = useHistory();
    const [loginError, setLoginError] = useState<boolean>(false);
    const [login] = useLoginMutation({
        onCompleted: (res) => {
            console.log('response:', res.login);
            if (res.login === true) {
                console.log('pushing');
                history.push('/');
            } else {
                setLoginError(true);
            }
        },
    });
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const slackCode = query.get('code');
    const error = query.get('error');

    useEffect(() => {
        if (meLoading) return;
        if (meData?.me.slackId !== null) return history.push('/');

        if (slackCode) {
            console.log('sending login request');
            login({ variables: { slackCode } });
        }
        if (!slackCode && !error) history.push('/login');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meData]);

    if (meLoading) return <h3>Loading authentication</h3>;

    if (error)
        return (
            <>
                <h2>An error occurred while authenticating:</h2>
                <code>{JSON.stringify(error)}</code>
                <hr />
                <SlackLoginButton />
            </>
        );

    if (loginError)
        return (
            <>
                <h2>There was an error while logging in</h2>
                <hr />
                <SlackLoginButton />
            </>
        );

    return <>Logging you in...</>;
};

export default SlackLogin;
