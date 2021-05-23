import React from 'react';
import { useMeQuery } from '../generated/graphql';

const Me: React.FC = () => {
    const { data, refetch } = useMeQuery();

    return (
        <div>
            <button onClick={() => refetch()}>refetch me</button>
            <span>{String(data?.me.slackId)}</span>
        </div>
    );
};

export default Me;
