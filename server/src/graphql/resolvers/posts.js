import { AuthenticationError, UserInputError } from 'apollo-server';

import Post from '../../models/post';
import checkAuth from '../../utils/check-auth';
import { modifyCreatedAt } from '../../utils/responseData';

const NEW_POST_SUBSCRIPTION = 'NEW_POST';

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
      if (body.trim() === '') {
        throw new UserInputError('Post body must not be empty');
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
      });
      const post = await newPost.save();

      context.pubsub.publish(NEW_POST_SUBSCRIPTION, {
        newPost: post,
      });

      return modifyCreatedAt(post);
    },
    deletePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (!post) throw new Error('Post not found');
        if (post.username !== username)
          throw new AuthenticationError('Action not allowed');
        await post.delete();
        return 'Post has been deleted';
      } catch (error) {
        throw new Error(error.message);
      }
    },
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();

        return modifyCreatedAt(post);
      }
      throw new UserInputError('Post not found');
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) =>
        pubsub.asyncIterator(NEW_POST_SUBSCRIPTION),
    },
  },
};
