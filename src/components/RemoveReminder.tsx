import React, { useState } from 'react';
import { useRemoveReminderMutation } from '../generated/graphql';
import { Button, Popconfirm } from 'antd';
import { useHistory } from 'react-router';
import toLoginPageIfAuthError from '../functions/toLoginPageIfAuthError';

const RemoveReminder: React.FC<{
    reminderId: string;
    removeReminder: (uuid: string) => void;
}> = ({ reminderId, removeReminder }) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [removeSelf] = useRemoveReminderMutation({
        onCompleted: ({ removeReminder: { success, errors } }) => {
            setIsLoading(false);
            if (success) {
                removeReminder(reminderId);
                return;
            }
            errors?.forEach((err) => console.error(err));
        },
        variables: { id: reminderId },
        onError: (err) => {
            setIsLoading(false);
            toLoginPageIfAuthError(err, history);
            console.error(err);
        },
    });

    return (
        <Popconfirm
            title={'Are you sure?'}
            onConfirm={() => {
                setIsLoading(true);
                removeSelf();
            }}
            okText="Yes"
            placement="topLeft"
        >
            <Button type="primary" danger loading={isLoading}>
                delete
            </Button>
        </Popconfirm>
    );
};

export default RemoveReminder;
