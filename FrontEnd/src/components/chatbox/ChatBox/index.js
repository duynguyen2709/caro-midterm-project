import React from 'react';
import MessageList from '../MessageList';
import './Messenger.css';
import Compose from "../Compose";

export default function ChatBox() {
    return (
        <div>
            <div className="messenger scrollable content">
                <MessageList/>
            </div>
            <Compose/>
        </div>
    );
}