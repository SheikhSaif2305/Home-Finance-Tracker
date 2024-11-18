const pool = require('../config/db');

const User = {
  async create(email, name, role, password) {
    const [result] = await pool.query(
      'INSERT INTO User (email, name, role, password) VALUES (?, ?, ?, ?)',
      [email, name, role, password]
    );
    return name;
  },

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
    return rows[0];
  },

  async updatePassword(userId, newPassword) {
    await pool.query('UPDATE User SET password = ? WHERE user_id = ?', [newPassword, userId]);
  }
};

module.exports = User;
