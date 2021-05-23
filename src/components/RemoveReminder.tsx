import React, { useState } from 'react';
import { useRemoveReminderMutation } from '../generated/graphql';

const RemoveReminder: React.FC = () => {
    const [removeReminder, response] = useRemoveReminderMutation();
    const [id, setId] = useState<string>('');

    return (
        <>
            <span>id</span>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
            <button onClick={() => removeReminder({ variables: { id } })}>remove</button>
            <pre>{JSON.stringify(response.data, null, 4)}</pre>
        </>
    );
};

export default RemoveReminder;
