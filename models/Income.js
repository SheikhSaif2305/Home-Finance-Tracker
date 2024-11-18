const pool = require('../config/db');

const Income = {
  async create(balanceId, categoryId, amount, incomeDate, description) {
    const [result] = await pool.query(
      'INSERT INTO Income (balance_id, category_id, amount, income_date, description) VALUES (?, ?, ?, ?, ?)',
      [balanceId, categoryId, amount, incomeDate, description]
    );
    return result.insertId;
  },


  // New function to get income transactions by balance_id
  async getIncomeByBalanceId(balanceId) {
    const result = await pool.query(
      'SELECT "income" AS type, income_id AS transaction_id, amount, income_date AS date, description, category_id FROM Income WHERE balance_id = ? ORDER BY income_date DESC',
      [balanceId]
    );

    console.log(result)
    return result[0];
  }
};

module.exports = Income;
