const { findBalanceIdFromUserId } = require('../helpers/balanceHelper');
const { findCategoryIdFromName } = require('../helpers/categoryHelper');
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const userId = req.user.userId; // userId is decoded from JWT
    const { category_name, amount, expense_date, description } = req.body;

    // Find balance_id from userId
    const balance_id = await findBalanceIdFromUserId(userId);

    // Find category_id from category_name
    const category_id = await findCategoryIdFromName(category_name);

    // Add expense record with balance_id, category_id, and other details
    const expenseId = await Expense.create(balance_id, category_id, amount, expense_date, description);

    res.json({ expenseId, message: 'Expense added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding expense' });
  }
};
