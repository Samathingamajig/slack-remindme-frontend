import React from 'react';
import { useRemoveReminderMutation } from '../generated/graphql';

interface ReminderProps {
    id: string;
    permalink: string;
    postAt: number;
    removeReminder: (uuid: string) => void;
}

const Reminder: React.FC<ReminderProps> = ({ id, permalink, postAt, removeReminder }) => {
    const [removeSelf] = useRemoveReminderMutation({ onCompleted: () => removeReminder(id), variables: { id } });

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
            <strong>postAt:</strong>&nbsp;<span>{String(new Date(postAt * 1000))}</span>
            <br />
            <button onClick={() => removeSelf()}>delete</button>
        </div>
    );
};

export default Reminder;
