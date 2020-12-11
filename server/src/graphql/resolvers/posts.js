import { AuthenticationError } from 'apollo-server';

import Post from '../../models/post';
import checkAuth from '../../utils/check-auth';
import { modifyCreatedAt } from '../../utils/responseData';

export default {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts.map((post) => modifyCreatedAt(post));
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error('Post not found');
        }
        return modifyCreatedAt(post);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
      });
      const post = await newPost.save();

      return modifyCreatedAt(post);
    },
    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (!post) throw new Error('Post not found');
        if (post.username !== user.username)
          throw new AuthenticationError('Action not allowed');
        await post.delete();
        return 'Post has been deleted';
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
