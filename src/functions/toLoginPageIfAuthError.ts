import { ApolloError } from '@apollo/client';
import * as H from 'history';

const toLoginPageIfAuthError = (err: ApolloError, history: H.History<H.LocationState>): boolean => {
    if (err?.message === 'not authenticated') {
        history.push('/login');
        return true;
    }
    return false;
};

export default toLoginPageIfAuthError;
