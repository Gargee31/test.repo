import React from 'react';
import './styles.css';

const AccountSummary = () => {
    return (
        <div className="page">
            <div className="header-menu">
                <span>Accounts</span>
                <span>Brokerage</span>
                <span>Transfer & Pay</span>
                <span>Plan & Learn</span>
                <span>Security & Support</span>
            </div>
            <div className="account-summary">
                <div className="header">
                    <div className="warning">
                        Please update your business permanent address by using the Physical address field within your online banking session. If you have already taken action, you can disregard this message.
                    </div>
                </div>
                <div className="content">
                    <div className="summary">
                        <h2>Account Summary</h2>
                        <div className="account-info">
                            <div className="account-name">Naveen</div>
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
                            <img src="phone_mockup.png" alt="Phone Mockup" className="phone-mockup" />
                            <p>Check out the redesigned Security Center in the mobile app.</p>
                            <p>Look for the green shield icon under Menu.</p>
                        </div>
                        <div className="qr-code">
                            <p>Scan with your phone to get the app and access the Security Center</p>
                            <img src="qr_code.png" alt="QR Code" className="qr-code-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSummary;
