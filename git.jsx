import React, { useState } from 'react';
import Modal from 'react-modal'; // Assuming you're using react-modal library

const CustomModal = ({ isOpen, onClose, message, onConfirm }) => {
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    onConfirm(inputValue);
    setInputValue(''); // Clear input after confirming
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div>{message}</div>
      {onConfirm && (
        <div>
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      )}
    </Modal>
  );
};

export default CustomModal;
