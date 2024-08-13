import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const PasswordModal = ({ open, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    onConfirm(password);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">Enter Password</Typography>
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button onClick={handleConfirm} variant="contained" sx={{ mt: 2 }}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

const OtpModal = ({ open, onClose, onConfirm }) => {
  const [otp, setOtp] = useState('');

  const handleConfirm = () => {
    onConfirm(otp);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">Enter OTP</Typography>
        <TextField
          label="OTP"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button onClick={handleConfirm} variant="contained" sx={{ mt: 2 }}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

const AlertModal = ({ open, onClose, message }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={style}>
      <Typography>{message}</Typography>
      <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  </Modal>
);

export { PasswordModal, OtpModal, AlertModal };


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PasswordModal, OtpModal, AlertModal } from './Modals'; // Import the modals

const TransactionComponent = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(true);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordConfirm = async (password) => {
    if (!password) {
      setAlertMessage('Password is required.');
      setIsAlertModalOpen(true);
      return;
    }

    try {
      const keyResponse = await axios.get("http://10.83.152.245:8000/akshat.jha/key/pred");
      const user = keyResponse.data["idx"];
      const distance = keyResponse.data["dist"];

      if (user === 'akshat.jha' && distance <= 50) {
        setAlertMessage('Transaction successful!');
        setIsAlertModalOpen(true);
        navigate('/Transaction');
      } else {
        setIsOtpModalOpen(true);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage('Error processing transaction. Please try again.');
      setIsAlertModalOpen(true);
    }
  };

  const handleOtpConfirm = (otp) => {
    if (otp === '9987') {
      setAlertMessage('OTP verified. Proceeding to make transaction....');
      setIsAlertModalOpen(true);
      navigate('/Transaction');
    } else {
      setAlertMessage('Invalid OTP. Redirecting to login page.');
      setIsAlertModalOpen(true);
      navigate('/Login');
    }
  };

  return (
    <>
      <PasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handlePasswordConfirm}
      />
      <OtpModal
        open={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onConfirm={handleOtpConfirm}
      />
      <AlertModal
        open={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        message={alertMessage}
      />
    </>
  );
};

export default TransactionComponent;
