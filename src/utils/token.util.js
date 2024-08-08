import jwt from 'jsonwebtoken';

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export default {
  generateAccessToken,
  generateRefreshToken,
};
