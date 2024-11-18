const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get transaction history for the authenticated user
router.get('/history', authMiddleware, transactionController.getTransactionHistory);

module.exports = router;
