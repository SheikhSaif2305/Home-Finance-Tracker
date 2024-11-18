const pool = require('../config/db');

// Balance object carries 
const Balance = { 
  findByUserId: async function(userId) {
    const [row] = await pool.query('SELECT * FROM Balance WHERE user_id = ?', [userId]);
    //console.log(row);

    return row[0]; 
    // Returns the first row (or undefined if no row found)

  },

  // Update Balance not used yet

  updateBalance: function(balanceId, newBalance) {
    return pool.query('UPDATE Balance SET current_balance = ? WHERE balance_id = ?', [newBalance, balanceId]);
  }
};


module.exports = Balance;
