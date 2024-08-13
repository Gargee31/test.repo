import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles1.css";
import axios from "axios";
import Modal from "react-modal";

// PasswordPopup component
const PasswordPopup = ({ onClose, onSubmit }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose} className="modal">
      <div className="popup-container">
        <div className="popup-content">
          <h2>Enter your password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

// OTPPopup component
const OTPPopup = ({ onClose, onSubmit }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp);
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose} className="modal">
      <div className="popup-container">
        <div className="popup-content">
          <h2>Enter OTP</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              required
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

// TransactionCompletePopup component
const TransactionCompletePopup = ({ onClose }) => (
  <Modal isOpen={true} onRequestClose={onClose} className="modal">
    <div className="popup-container">
      <div className="popup-content">
        <h2>Transaction Completed</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  </Modal>
);

// AccountSummary component
const AccountSummary = () => {
  const navigate = useNavigate();
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [showTransactionCompletePopup, setShowTransactionCompletePopup] = useState(false);

  const handleTransferAndPay = async () => {
    const pw = prompt("Enter your password:");

    if (pw) {
      let user, distance;

      try {
        const keyResponse = await axios.get("http://10.83.152.245:8000/akshat.jha/key/pred");
        user = keyResponse.data["idx"];
        distance = keyResponse.data["dist"];
      } catch (error) {
        console.log(error);
        alert("Error processing transaction. Please try again.");
        return;
      }

      if (user === 'akshat.jha' && distance <= 50) {
        alert("Transaction successful!");
        setShowTransactionCompletePopup(true);
      } else {
        navigate('/Transaction');
        alert("Invalid credentials! Initiating MFA.");

        const otp = prompt("Enter OTP sent to gargee.dorle@wellsfargo.com:");
        if (otp === "9987") {
          alert("OTP verified. Proceeding to make transaction....");
          navigate('/Transaction');
        } else {
          alert("Invalid OTP. Redirecting to login page.");
          navigate("/Login");
        }
      }
    } else {
      alert("Password is required.");
    }
  };

  return (
    <div className="account-summary">
      <div className="yellowTape"></div>
      <div className="page">
        <div className="header-menu">
          <li><a href="#">Accounts</a></li>
          <li><a href="#">Brokerage</a></li>
          <li><a href="#" onClick={handleTransferAndPay}>Transfer & Pay</a></li>
          <li><a href="#">Plan & Learn</a></li>
          <li><a href="#">Security & Support</a></li>
          <li><a href="/userprofile">Create Behavioral Profile</a></li>
        </div>

        <div className="content">
          <div className="summary">
            <h2>Account Summary</h2>
            <div className="account-info">
              <div className="account-name">Gargee Dorle</div>
              <div className="account-balance">$9,491.08</div>
            </div>
            <div className="disclosures">
              <p>*Account Disclosures</p>
              <p>Deposit products offered by Wells Fargo Bank, N.A. Member FDIC.</p>
              <p>Equal Housing Lender</p>
              <p>FICO is a registered trademark of Fair Isaac Corporation in the United States and other countries.</p>
            </div>
          </div>

          <div className="sidebar">
            <div className="app-info">
              <h3>Now in the app!</h3>
              <p>Check your account security level</p>
              <img src="phone.png" alt="Phone Mockup" className="phone-mockup" />
              <p>Check out the redesigned Security Center in the mobile app.</p>
              <p>Look for the green shield icon under Menu.</p>
            </div>
            <div className="qr-code">
              <p>Scan with your phone to get the app and access the Security Center</p>
              <img src="qr.png" alt="QR Code" className="qr-code-image" />
            </div>
          </div>
        </div>
      </div>

      {showPasswordPopup && <PasswordPopup onClose={() => setShowPasswordPopup(false)} onSubmit={() => {}} />}
      {showOTPPopup && <OTPPopup onClose={() => setShowOTPPopup(false)} onSubmit={() => {}} />}
      {showTransactionCompletePopup && <TransactionCompletePopup onClose={() => setShowTransactionCompletePopup(false)} />}
    </div>
  );
};

export default AccountSummary;
