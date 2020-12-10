import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export default model('user', UserSchema);
