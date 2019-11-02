import React from 'react';
import './ChatBox.css';
import MessageListContainer from '../../../containers/utils/MessageListContainer';
import Compose from "../Compose";

export default function ChatBox({sendMessage}) {
    return (
        <>
            <div className="messenger scrollable content" id="scrollable">
                <MessageListContainer />
            </div>
            <Compose sendMessage={sendMessage}/>
        </>
    );
}