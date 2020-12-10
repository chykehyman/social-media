import postsResolvers from './posts';
import usersResolvers from './users';

export default {
  Query: {
    ...postsResolvers,
    ...usersResolvers,
  },
};
