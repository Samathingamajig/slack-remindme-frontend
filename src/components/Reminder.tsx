import React from 'react';
import { useRemoveReminderMutation } from '../generated/graphql';

interface ReminderProps {
    id: string;
    permalink: string;
    postAt: number;
    authorName: string;
    channelName: string;
    removeReminder: (uuid: string) => void;
}

const Reminder: React.FC<ReminderProps> = ({ id, permalink, postAt, authorName, channelName, removeReminder }) => {
    const [removeSelf] = useRemoveReminderMutation({
        onCompleted: ({ removeReminder: { success, errors } }) => {
            if (success) {
                removeReminder(id);
                return;
            }
            errors?.forEach((err) => console.error(err));
        },
        variables: { id },
        onError: (err) => console.error(err),
    });

    return (
        <div style={{ margin: '.5rem', border: '2px solid black' }}>
            <strong>id:</strong>&nbsp;<span>{id}</span>
            <br />
            <strong>permalink:</strong>&nbsp;
            <span>
                <a href={permalink} target="_blank" rel="noreferrer">
                    {permalink}
                </a>
            </span>
            <br />
            <strong>postAt:</strong>&nbsp;<span>{new Date(postAt * 1000).toLocaleString()}</span>
            <br />
            <strong>author:</strong>&nbsp;<span>{authorName}</span>
            <br />
            <strong>channel:</strong>&nbsp;<span>&#35;{channelName}</span>
            <br />
            <button onClick={() => removeSelf()}>delete</button>
        </div>
    );
};

export default Reminder;
