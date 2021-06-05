import React, { useEffect, useState } from 'react';
import Reminder from './Reminder';
import { useMyRemindersQuery, Reminder as ReminderResult } from '../generated/graphql';
import { useHistory } from 'react-router';
import toLoginPageIfAuthError from '../functions/toLoginPageIfAuthError';
import { Button, Space } from 'antd';
import RemoveMyExpiredReminders from './RemoveMyExpiredReminders';

const Reminders: React.FC = () => {
    const history = useHistory();
    const { data, loading, error, refetch } = useMyRemindersQuery({
        onError: (err) => {
            toLoginPageIfAuthError(err, history);
            console.error(err);
        },
    });
    const [reminders, setReminders] = useState<ReminderResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!data) return;
        setReminders(data.myReminders);
    }, [data]);

    const removeReminder = (uuid: string) => {
        setReminders((prev) => prev.filter(({ id }) => uuid !== id));
    };

    const removeReminders = (uuids: Set<string>) => {
        setReminders((prev) => prev.filter(({ id }) => !uuids.has(id)));
    };

    return (
        <>
            <Space>
                <Button
                    onClick={() => {
                        setIsLoading(true);
                        refetch()
                            .catch((err) => {
                                toLoginPageIfAuthError(err, history);
                                console.error(err);
                            })
                            .finally(() => setIsLoading(false));
                    }}
                    type="primary"
                    loading={isLoading}
                >
                    refetch myReminders
                </Button>
                <RemoveMyExpiredReminders removeReminders={removeReminders} />
            </Space>
            <br />
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
