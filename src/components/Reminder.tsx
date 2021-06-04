import React from 'react';
import RemoveReminder from './RemoveReminder';
import RescheduleReminder from './RescheduleReminder';

interface ReminderProps {
    id: string;
    permalink: string;
    postAt: number;
    authorName: string;
    channelName: string;
    removeReminder: (uuid: string) => void;
}

const Reminder: React.FC<ReminderProps> = ({ id, permalink, postAt, authorName, channelName, removeReminder }) => {
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
            <RescheduleReminder reminderId={id} postAt={postAt} />
            <br />
            <strong>author:</strong>&nbsp;<span>{authorName}</span>
            <br />
            <strong>channel:</strong>&nbsp;<span>&#35;{channelName}</span>
            <br />
            <RemoveReminder reminderId={id} removeReminder={removeReminder} />
        </div>
    );
};

export default Reminder;
