import React from 'react';
import { useMyRemindersQuery } from '../generated/graphql';

const MyReminders: React.FC = () => {
    const { data, loading, error, refetch } = useMyRemindersQuery();

    return (
        <>
            <button onClick={() => refetch()}>refetch myReminders</button>
            {loading && <p>loading...</p>}
            {error && (
                <div>
                    <h2>error</h2>
                    <pre>{JSON.stringify(error, null, 4)}</pre>
                </div>
            )}
            {data && <pre>{JSON.stringify(data, null, 4)}</pre>}
        </>
    );
};

export default MyReminders;
