require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const transactionRoutes = require('./routes/transactionRoutes'); // New route for transactions


const app = express();
app.use(morgan('dev'));
app.use(express.json());


// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes); // New route for transactions


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
