import { Button, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import toLoginPageIfAuthError from '../functions/toLoginPageIfAuthError';
import { useRemoveMyExpiredRemindersMutation } from '../generated/graphql';

const RemoveMyExpiredReminders: React.FC<{
    removeReminders: (uuids: Set<string>) => void;
}> = ({ removeReminders }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const history = useHistory();
    const [removeExpiredReminders] = useRemoveMyExpiredRemindersMutation({
        onError: (err) => {
            toLoginPageIfAuthError(err, history);
            console.error(err);
        },
    });

    return (
        <Popconfirm
            title="Are you sure?"
            onConfirm={async () => {
                setIsLoading(true);
                const deletedRemindersRaw = await removeExpiredReminders();
                const deletedRemindersSet = new Set(deletedRemindersRaw.data?.removeMyExpiredReminders.reminderIds);
                if (deletedRemindersSet.size === 0) {
                    setIsLoading(false);
                    return;
                }
                removeReminders(deletedRemindersSet);
                setIsLoading(false);
            }}
        >
            <Button type="primary" danger loading={isLoading}>
                remove expired reminders
            </Button>
        </Popconfirm>
    );
};

export default RemoveMyExpiredReminders;
