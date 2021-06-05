import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import { useLogoutMutation } from '../generated/graphql';

const LogoutButton: React.FC = () => {
    const history = useHistory();
    const [logout, response] = useLogoutMutation({
        onCompleted: (res) => {
            console.log({ res });
            if (res.logout) {
                console.log('pushing to /login via logout');
                history.push('/login');
            }
        },
    });

    return (
        <div>
            <Button danger onClick={() => logout()}>
                logout
            </Button>
            <span>{JSON.stringify(response.data)}</span>
        </div>
    );
};

export default LogoutButton;
