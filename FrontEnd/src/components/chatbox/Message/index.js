import React from 'react';
import moment from 'moment';
import './Message.css';

const Message = React.memo((props) => {
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
}, (prevProps, nextProps) => {
    return (prevProps.isMine === nextProps.isMine &&
        prevProps.startsSequence === nextProps.startsSequence &&
        prevProps.endsSequence === nextProps.endsSequence &&
        prevProps.data.timestamp === nextProps.prevProps.data.timestamp &&
        prevProps.data.message === nextProps.prevProps.data.message &&
        prevProps.data.username === nextProps.prevProps.data.username);
});

export default Message;