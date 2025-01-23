const { register, login } = require('../services/authService');

// Register
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await register(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Connexion
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await login(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
