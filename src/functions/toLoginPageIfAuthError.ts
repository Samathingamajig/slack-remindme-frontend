import { ApolloError } from '@apollo/client';
import { notification } from 'antd';
import * as H from 'history';

const toLoginPageIfAuthError = (err: ApolloError, history: H.History<H.LocationState>): boolean => {
    if (err?.message === 'not authenticated') {
        history.push('/login');
        notification.open({
            type: 'error',
            placement: 'bottomRight',
            message: 'Authentication has expired, please login again',
        });
        return true;
    }
    return false;
};

export default toLoginPageIfAuthError;
