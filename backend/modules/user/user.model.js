import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   lowercase: true,
  // },

  password: {
    type: String,
    required: true,
  },

  profilePic: {
    type: String, 
    default: '', 
  },

  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

export default mongoose.model('User', userSchema);