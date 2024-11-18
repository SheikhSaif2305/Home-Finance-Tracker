const express = require('express');
const balanceController = require('../controllers/balanceController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, balanceController.getBalance);

module.exports = router;
