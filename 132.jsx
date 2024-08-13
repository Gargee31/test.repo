import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./styles1.css";
import axios from "axios";
import Modal from 'react-modal';
import { AuthContext } from "../AuthContext";
import PasswordPopup from './PasswordPopup';
import OTPPopup from './OTPPopup';
import TransactionCompletePopup from './TransactionCompletePopup';

const AccountSummary = () => {
  const navigate = useNavigate();
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [showTransactionCompletePopup, setShowTransactionCompletePopup] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");

  const handlePasswordSubmit = async (password) => {
    let user, distance;

    try {
      const keyResponse = await axios.get("http://10.83.152.245:8000/akshat.jha/key/pred");
      user = keyResponse.data["idx"];
      distance = keyResponse.data["dist"];
    } catch (error) {
      console.log(error);
      alert("Error processing transaction. Please try again.");
      setShowPasswordPopup(false);
      return;
    }

    setShowPasswordPopup(false);

    if (user === 'akshat.jha' && distance <= 50) {
      setShowTransactionCompletePopup(true);
    } else {
      setShowOTPPopup(true);
    }
  };

  const handleOTPSubmit = (otp) => {
    setShowOTPPopup(false);

    if (otp === "9987") {
      setShowTransactionCompletePopup(true);
    } else {
      alert("Invalid OTP. Redirecting to login page.");
      navigate("/Login");
    }
  };

  const handleTransferAndPay = () => {
    setShowPasswordPopup(true);
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

      {showPasswordPopup && (
        <PasswordPopup
          onClose={() => setShowPasswordPopup(false)}
          onSubmit={handlePasswordSubmit}
        />
      )}
      {showOTPPopup && (
        <OTPPopup
          onClose={() => setShowOTPPopup(false)}
          onSubmit={handleOTPSubmit}
        />
      )}
      {showTransactionCompletePopup && (
        <TransactionCompletePopup
          onClose={() => setShowTransactionCompletePopup(false)}
        />
      )}
    </div>
  );
};

export default AccountSummary;


/* General Page Styling */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}

.account-summary {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.yellowTape {
    height: 10px;
    background-color: yellow;
}

.page {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Header Menu Styling */
.header-menu {
    display: flex;
    justify-content: space-around;
    background-color: #0047AB;
    padding: 10px 0;
    margin-bottom: 20px;
    border-radius: 5px;
    color: white;
}

.header-menu li {
    list-style: none;
    padding: 10px;
}

.header-menu a {
    color: white;
    text-decoration: none;
}

.header-menu a:hover {
    text-decoration: underline;
}

/* Content Area Styling */
.content {
    display: flex;
    justify-content: space-between;
}

.summary {
    flex: 2;
    padding-right: 20px;
}

.sidebar {
    flex: 1;
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 5px;
}

.account-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.account-name {
    font-size: 24px;
    font-weight: bold;
}

.account-balance {
    font-size: 24px;
    color: green;
}

.disclosures {
    font-size: 12px;
    color: #555;
}

/* Sidebar Styling */
.app-info, .qr-code {
    margin-bottom: 20px;
}

.phone-mockup {
    max-width: 100%;
    margin: 10px 0;
}

.qr-code-image {
    max-width: 100px;
}

/* Modal Styling */
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-container {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.popup-content h2 {
    margin-bottom: 20px;
    font-size: 22px;
}

.popup-content input[type="password"], 
.popup-content input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.popup-content button {
    background-color: #0047AB;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.popup-content button:hover {
    background-color: #00308F;
}

/* Modal Close Button */
.popup-content button:last-of-type {
    background-color: #f44336;
    margin-top: 10px;
}

.popup-content button:last-of-type:hover {
    background-color: #e31b0c;
}
