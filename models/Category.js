const pool = require('../config/db');

const Category = {
  // Updated findAll method to filter by `created_by` (userId)
  async findAll(userId) {
    const [rows] = await pool.query(
      'SELECT * FROM Category WHERE created_by = ?',
      [userId]
    );
    return rows;
  },

  async create(categoryName, createdBy) {
    const [result] = await pool.query(
      'INSERT INTO Category (category_name, created_by) VALUES (?, ?)',
      [categoryName, createdBy]
    );
    return result.insertId;
  }
};

module.exports = Category;
