import React, { useEffect, useState } from 'react';
import Reminder from './Reminder';
import { useMyRemindersQuery, Reminder as ReminderResult } from '../generated/graphql';
import { useHistory } from 'react-router';
import toLoginPageIfAuthError from '../functions/toLoginPageIfAuthError';

const Reminders: React.FC = () => {
    const history = useHistory();
    const { data, loading, error, refetch } = useMyRemindersQuery({
        onError: (err) => {
            toLoginPageIfAuthError(err, history);
            console.error(err);
        },
    });
    const [reminders, setReminders] = useState<ReminderResult[]>([]);

    useEffect(() => {
        if (!data) return;
        setReminders(data.myReminders);
    }, [data]);

    const removeReminder = (uuid: string) => {
        setReminders((prev) => prev.filter(({ id }) => uuid !== id));
    };

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
            {data &&
                reminders.map((reminder, i) => <Reminder {...{ removeReminder, ...reminder }} key={reminder.id} />)}
        </>
    );
};

export default Reminders;
