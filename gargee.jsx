import React from 'react';
import './styles.css';

const transactionDetails = {
  id: '123456',
  date: '2024-07-18',
  amount: '$100',
  status: 'Completed',
  fromAccount: 'Account #4364542',
  toAccount: 'Account #4563534',
};

const recentTransactions = [
  { id: '1', date: '2024-07-02', amount: '$455', status: 'Completed' },
  { id: '2', date: '2024-07-04', amount: '$55', status: 'Pending' },
  { id: '3', date: '2024-07-15', amount: '$256', status: 'Completed' },
  { id: '4', date: '2024-07-16', amount: '$761', status: 'Failed' },
];

function TransactionDetailsPage() {
  return (
    <div className="transaction-details-page">
      <div className="transfer-section">
        <h2>Transfer Money</h2>
        <form className="transfer-form">
          <div className="form-group">
            <label htmlFor="fromAccount">From</label>
            <select id="fromAccount">
              <option>Select Account</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="toAccount">To</label>
            <select id="toAccount">
              <option>Select Account</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="frequency">Frequency</label>
            <select id="frequency">
              <option>Select one</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn">Cancel</button>
            <button type="submit" className="continue-btn">Continue</button>
          </div>
        </form>
      </div>
      <div className="recent-transactions">
        <h2>Transfer & Payment Activity (1)</h2>
        <div className="transaction-item">
          <p className="transaction-date">04/13/22</p>
          <p className="transaction-amount">$1.00</p>
          <p className="transaction-from">From Naveen ...0304</p>
          <p className="transaction-to">To ...5980 ...5980</p>
          <p className="transaction-status">Scheduled</p>
          <a href="#" className="view-edit">View / Edit</a>
        </div>
        <div className="transaction-links">
          <a href="#">Go to Transfer & Payment Activity</a>
          <a href="#">Manage alerts to stay on track with your payments</a>
          <a href="#">View your statements for more transaction details</a>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetailsPage;
