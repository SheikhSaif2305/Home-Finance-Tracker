const Balance = require('../models/Balance');

exports.getBalance = async (req, res) => {
  try {
    const userId = req.user.userId;
    const balance = await Balance.findByUserId(userId);
    res.json(balance);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving balance' });
  }
};
