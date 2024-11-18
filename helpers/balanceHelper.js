const pool = require('../config/db');

//helps with providing the balance_Id for a user_Id
exports.findBalanceIdFromUserId = async (userId) => {
  const [rows] = await pool.query('SELECT balance_id FROM Balance WHERE user_id = ?', [userId]);

  // Check if balance exists for the given userId
  if (rows.length === 0) {
    throw new Error('Balance not found for this user');
  }

  return rows[0].balance_id;
};
