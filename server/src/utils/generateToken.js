import jwt from 'jsonwebtoken';

export const generateToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
