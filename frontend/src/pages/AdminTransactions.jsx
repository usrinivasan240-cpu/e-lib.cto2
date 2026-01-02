import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, Clock } from 'lucide-react';
import API_URL from '../api';

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const res = await axios.get(`${API_URL}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(res.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Transaction Logs</h2>
      <div className="space-y-4">
        {transactions.map(tx => (
          <div key={tx._id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/20 p-3 rounded-full text-green-400">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="font-bold">Payment for "{tx.book?.title || 'Unknown'}"</p>
                <p className="text-sm opacity-60">User: {tx.user?.name} ({tx.user?.email})</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xl font-bold text-primary">${tx.amount}</p>
              <p className="text-xs opacity-40 flex items-center gap-1"><Clock size={12} /> {new Date(tx.transactionDate).toLocaleString()}</p>
            </div>
          </div>
        ))}
        {transactions.length === 0 && <p className="text-center opacity-40 py-10">No transactions yet.</p>}
      </div>
    </div>
  );
};

export default AdminTransactions;
