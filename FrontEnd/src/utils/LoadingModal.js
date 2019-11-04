import React from 'react';
import ReactDOM from 'react-dom';

const LoadingModal = () => ReactDOM.createPortal(
    <>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="page-mask"/>
            <div className="modal-dialog all-centered">
                <div className="loader"/>
            </div>
        </div>
    </>, document.body
);

export default LoadingModal;