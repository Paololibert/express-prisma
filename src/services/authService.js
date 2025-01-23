const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

const register = async (email, password) => {

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    throw new Error('Email already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, password: hashedPassword },
  });
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};

module.exports = { register, login };
