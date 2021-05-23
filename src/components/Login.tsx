import React, { useState } from 'react';
import { useLoginMutation } from '../generated/graphql';

const Login: React.FC = () => {
    const [login, response] = useLoginMutation();
    const [slackId, setSlackId] = useState<string>('');

    return (
        <div>
            <input type="text" value={slackId} onChange={(e) => setSlackId(e.target.value)} />
            <button onClick={() => login({ variables: { slackId } })}>login</button>
            <span>{JSON.stringify(response.data, null, 4)}</span>
        </div>
    );
};

export default Login;
