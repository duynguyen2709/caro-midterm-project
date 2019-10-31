import React from 'react';
import './Compose.css';

export default function Compose() {
    return (
        <div className="compose">
            <input
                type="text"
                className="compose-input"
                placeholder="Nhập tin nhắn"
            />
            <i className="toolbar-button fa fa-paper-plane"/>
        </div>
    );
}