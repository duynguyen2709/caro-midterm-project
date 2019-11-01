import React from 'react';
import moment from 'moment';
import './Message.css';

export default function Message(props) {
    const {
        data,
        isMine,
        startsSequence,
        endsSequence
    } = props;

    const friendlyTimestamp = moment(data.timestamp).format('HH:mm');
    return (
        <div className={[
            'message',
            `${isMine ? 'mine' : ''}`,
            `${startsSequence ? 'start' : ''}`,
            `${endsSequence ? 'end' : ''}`
        ].join(' ')}>
            <div className="bubble-container">
                <div className="bubble" title={friendlyTimestamp}>
                    {data.message}
                </div>
            </div>
        </div>
    );
}