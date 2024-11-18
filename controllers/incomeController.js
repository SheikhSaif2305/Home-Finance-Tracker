const { findBalanceIdFromUserId } = require('../helpers/balanceHelper');
const { findCategoryIdFromName } = require('../helpers/categoryHelper');
const Income = require('../models/Income');

exports.addIncome = async (req, res) => {
  try {
    const userId = req.user.userId; // userId is decoded from JWT
    const { category_name, amount, income_date, description } = req.body;

    // Find balance_id from userId because balance and User have one to one relationship so each user witb a unique userId will have a unique balance_Id
    
    const balance_id = await findBalanceIdFromUserId(userId);

    // Find category_id from category_name
    const category_id = await findCategoryIdFromName(category_name);

    // Add income record with balance_id, category_id, and other details
    const incomeId = await Income.create(balance_id, category_id, amount, income_date, description);

    res.json({ incomeId, message: 'Income added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding income' });
  }
};
