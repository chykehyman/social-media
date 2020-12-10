import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  createdAt: Date,
});

export default model('user', UserSchema);
