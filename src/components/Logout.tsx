import React from 'react';
import { useLogoutMutation } from '../generated/graphql';

const Logout: React.FC = () => {
    const [logout, response] = useLogoutMutation();

    return (
        <div>
            <button onClick={() => logout()}>logout</button>
            <span>{JSON.stringify(response.data)}</span>
        </div>
    );
};

export default Logout;
