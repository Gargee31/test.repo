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
            <s
