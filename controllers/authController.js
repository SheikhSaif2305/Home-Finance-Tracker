const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/jwtHelper');
const { hashing } = require('../helpers/passHashing');
const { isValidEmail } = require('../helpers/emailValidator');

exports.register = async (req, res) => {
  const { email, name, password, role } = req.body;

  // Check if the email is in a valid format
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Check if the email is already registered
  const user = await User.findByEmail(email);
  if (user) {
    return res.status(200).json({ message: 'The Email is already registered' });
  }

  // Hash the password and create a new user
  const hashedPassword = await hashing(password);
  const userName = await User.create(email, name, role || 'User', hashedPassword);

  res.json({ message: `Welcome ${userName}` });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  const token = generateToken(user);
  res.json({ token });
};

exports.resetPassword = async (req, res) => {
  const { email, password, newPassword } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    const hashedNewPassword = await hashing(newPassword);
    await User.updatePassword(user.user_id, hashedNewPassword);

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};
