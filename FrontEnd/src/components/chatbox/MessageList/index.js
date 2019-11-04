import React, {useEffect} from 'react';
import moment from 'moment';
import $ from 'jquery';
import Message from '../Message';

export default function MessageList(props) {
    const {messages} = props;

    useEffect(() => {
        $("#scrollable").scrollTop($("#scrollable")[0].scrollHeight);
    }, [messages]);

    const renderMessages = () => {
        let i = 0;
        const messageCount = messages.length;
        const tempMessages = [];

        while (i < messageCount) {
            const previous = messages[i - 1];
            const current = messages[i];
            const next = messages[i + 1];
            const isMine = current.username === props.user.username;
            const currentMoment = moment(current.timestamp);
            let prevBySameAuthor = false;
            let nextBySameAuthor = false;
            let startsSequence = true;
            let endsSequence = true;
            let showTimestamp = true;

            if (previous) {
                const previousMoment = moment(previous.timestamp);
                const previousDuration = moment.duration(currentMoment.diff(previousMoment));
                prevBySameAuthor = previous.username === current.username;

                if (prevBySameAuthor && previousDuration.as('hours') < 1) {
                    startsSequence = false;
                }

                if (previousDuration.as('hours') < 1) {
                    showTimestamp = false;
                }
            }

            if (next) {
                const nextMoment = moment(next.timestamp);
                const nextDuration = moment.duration(nextMoment.diff(currentMoment));
                nextBySameAuthor = next.username === current.username;

                if (nextBySameAuthor && nextDuration.as('hours') < 1) {
                    endsSequence = false;
                }
            }

            tempMessages.push(
                <Message
                    key={i}
                    isMine={isMine}
                    startsSequence={startsSequence}
                    endsSequence={endsSequence}
                    showTimestamp={showTimestamp}
                    data={current}
                />
            );

            // Proceed to the next message.
            i += 1;
        }
        return tempMessages;
    };

    return (
        <div style={{padding: '10px 10px 70px'}}>
            {renderMessages()}
        </div>
    );
}