const pool = require('../config/db');

// Function to find category_id from category_name
exports.findCategoryIdFromName = async (categoryName) => {
  const [rows] = await pool.query('SELECT category_id FROM Category WHERE category_name = ?', [categoryName]);

  // Check if category exists for the given category_name
  if (rows.length === 0) {
    throw new Error('Category not found');
  }

  return rows[0].category_id;
};
