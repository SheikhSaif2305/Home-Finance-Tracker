const express = require('express');
const incomeController = require('../controllers/incomeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, incomeController.addIncome);

module.exports = router;
