import React, { useState } from 'react';
import { useUpdateReminderMutation } from '../generated/graphql';

const UpdateReminder: React.FC = () => {
    const [updateReminder, response] = useUpdateReminderMutation();
    const [id, setId] = useState<string>('');
    const [postAt, setPostAt] = useState<number>(0);

    return (
        <>
            <span>id</span>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
            <span>postAt</span>
            <input type="number" value={postAt} onChange={(e) => setPostAt(parseInt(e.target.value, 10) || 0)} />
            <button onClick={() => updateReminder({ variables: { id, postAt } })}>update</button>
            <pre>{JSON.stringify(response.data, null, 4)}</pre>
        </>
    );
};

export default UpdateReminder;
