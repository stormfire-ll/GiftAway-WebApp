import React from 'react';

const LoginPopup = ({ onClose }) => {
    return (
        <div className="login-popup-overlay">
            <div className="login-popup-content">
                <p>You have to login to claim a GiftAway.</p>
                <button onClick={() => window.location.href='/login'}>Login</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default LoginPopup;
