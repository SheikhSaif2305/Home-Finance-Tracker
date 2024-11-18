const pool = require('../config/db');

// Balance object carries two functons with key findByUderId and updateBalance

const Balance = { 
  findByUserId: function(userId) {
    return pool.query('SELECT * FROM Balance WHERE user_id = ?', [userId])
      .then(([rows]) => rows[0]);  // Returns the first row (or undefined if no row found)
  },

  updateBalance: function(balanceId, newBalance) {
    return pool.query('UPDATE Balance SET current_balance = ? WHERE balance_id = ?', [newBalance, balanceId]);
  }
};


module.exports = Balance;
