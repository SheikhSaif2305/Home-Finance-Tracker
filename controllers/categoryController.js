const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const userId = req.user.userId; // userId is decoded from JWT

    // Fetch categories only created by the specific user
    const categories = await Category.findAll(userId);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving categories' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const userId = req.user.userId; // userId is decoded from JWT
    const { category_name } = req.body;

    const categoryId = await Category.create(category_name, userId);
    res.json({ categoryId, message: 'Category added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating category' });
  }
};
