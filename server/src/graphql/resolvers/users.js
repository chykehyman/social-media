import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';

import User from '../../models/user';
import { generateToken } from '../../utils/generateToken';
import { modifyCreatedAt } from '../../utils/responseData';
import {
  validateLoginInput,
  validateSignupInput,
} from '../../utils/validators';

export default {
  Mutation: {
    signup: async (
      _,
      { signupInput: { username, email, password, confirmPassword } }
    ) => {
      const { isValid, errors } = validateSignupInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!isValid) throw new UserInputError('Errors', { errors });
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is already taken', {
          errors: {
            username: 'Username is already taken',
          },
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password,
      });
      const userData = await newUser.save();

      return {
        ...modifyCreatedAt(userData),
        token: generateToken(userData),
      };
    },
    login: async (_, { username, password }) => {
      const { isValid, errors } = validateLoginInput(username, password);
      if (!isValid) throw new UserInputError('Errors', { errors });

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      return {
        ...modifyCreatedAt(user),
        token: generateToken(user),
      };
    },
  },
};
