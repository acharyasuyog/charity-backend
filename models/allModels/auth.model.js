import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'organization'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
    },
    address: {
      type: String,
    },
    age: {
      type: Number,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

authSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

authSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Auth = mongoose.model('Auth', authSchema);

export default Auth;
