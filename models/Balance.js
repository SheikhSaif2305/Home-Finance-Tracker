const pool = require('../config/db');

const Balance = {
  async findByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM Balance WHERE user_id = ?', [userId]);
    return rows[0];
  },
  
  async updateBalance(balanceId, newBalance) {
    await pool.query('UPDATE Balance SET current_balance = ? WHERE balance_id = ?', [newBalance, balanceId]);
  }
};

module.exports = Balance;
