import Post from '../../models/post';

export default {
  getPosts: async () => {
    try {
      const posts = await Post.find({});
      return posts;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
