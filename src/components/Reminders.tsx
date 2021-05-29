import React, { useEffect, useState } from 'react';
import Reminder from './Reminder';
import { useMyRemindersQuery, Reminder as ReminderResult } from '../generated/graphql';

const Reminders: React.FC = () => {
    const { data, loading, error, refetch } = useMyRemindersQuery();
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
                reminders.map(({ id, permalink, postAt }, i) => (
                    <Reminder {...{ id, permalink, postAt, removeReminder }} key={id} />
                ))}
        </>
    );
};

export default Reminders;
