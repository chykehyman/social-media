import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

export default (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid or Expired token. Please login');
      }
    }
    throw new AuthenticationError(
      'Authentication token must be "Bearer [token]" '
    );
  }
  throw new AuthenticationError('Authorization header must be provided');
};
