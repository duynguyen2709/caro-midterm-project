import React from 'react';
import MessageList from '../MessageList';
import './ChatBox.css';
import Compose from "../Compose";

export default function ChatBox() {
    return (
        <>
            <div className="messenger scrollable content" id="scrollable">
                <MessageList/>
            </div>
            <Compose/>
        </>
    );
}