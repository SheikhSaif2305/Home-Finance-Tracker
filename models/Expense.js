const pool = require('../config/db');

const Expense = {
  async create(balanceId, categoryId, amount, expenseDate, description) {
    const [result] = await pool.query(
      'INSERT INTO Expense (balance_id, category_id, amount, expense_date, description) VALUES (?, ?, ?, ?, ?)',
      [balanceId, categoryId, amount, expenseDate, description]
    );
    return result.insertId;
  },

  // New function to get expense transactions by balance_id
  async getExpenseByBalanceId(balanceId) {
    const [rows] = await pool.query(
      'SELECT "expense" AS type, expense_id AS transaction_id, amount, expense_date AS date, description, category_id FROM Expense WHERE balance_id = ? ORDER BY expense_date DESC',
      [balanceId]
    );
    return rows;
  }
};

module.exports = Expense;
