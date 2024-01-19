import React from 'react';

const ErrorPopup = ({ message, onClose }) => {
    return (
        <div className="error-popup-overlay">
            <div className="error-popup-content">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ErrorPopup;
