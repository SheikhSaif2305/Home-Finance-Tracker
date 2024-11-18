const { findBalanceIdFromUserId } = require('../helpers/balanceHelper');
const Income = require('../models/Income');
const Expense = require('../models/Expense');

exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.userId; // userId is decoded from JWT

    // Find the user's balance_id
    const balance_id = await findBalanceIdFromUserId(userId);

    if (!balance_id) {
      return res.status(404).json({ message: 'Balance not found for the user' });
    }

    // Fetch income and expense transactions
    const incomeTransactions = await Income.getIncomeByBalanceId(balance_id);
    const expenseTransactions = await Expense.getExpenseByBalanceId(balance_id);

    // Combine income and expense transactions
    const transactions = [...incomeTransactions, ...expenseTransactions];

    // Sort transactions by date in descending order (recent to past)
    transactions.sort(function (a, b){ return new Date(b.date) - new Date(a.date)});

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving transaction history' });
  }
};
