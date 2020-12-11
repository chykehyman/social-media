import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
  {
    body: String,
    username: String,
    comments: [
      {
        body: String,
        username: String,
        createdAt: String,
      },
    ],
    likes: [
      {
        username: String,
        createdAt: String,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

export default model('post', PostSchema);
