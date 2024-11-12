import React, { useState, useEffect } from 'react';
import './ToastMessage.css'; 

const ToastMessage = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  // Automatically hide the message after the specified duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); 
    }, duration);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [duration, onClose]);

  if (!visible) return null; // Do not render if not visible

  return (
    <div className={`toast-message ${type}`}>
      <span className='toast-message-span'>{message}</span>
      {/* <button className="close-btn" onClick={() => setVisible(false)}>
        X
      </button> */}
    </div>
  );
};

export default ToastMessage;
