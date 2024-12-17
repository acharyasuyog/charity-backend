import models from '../models/index.model.js';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import uploadOnCloudinary from '../config/cloudinary.config.js';
// import upload from '../middlewares/multer.middleware.js';

export const register = async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    role,
    age,
    gender,
    address,
    profileImage,
  } = req.body;

  if (role === 'organization') {
    delete req.body.gender;
    delete req.body.age;
  }

  try {
    const user = await models.Auth.create({
      name,
      email,
      password,
      phoneNumber,
      role,
      age,
      gender,
      address,
      profileImage,
    });

    const responseUser = user.toObject();
    delete responseUser.password;

    res
      .status(StatusCodes.CREATED)
      // .json({ success: true, data: { user, password: undefined } });
      .json({ success: true, data: responseUser });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: 'Please provide email and password' });
  }

  try {
    const user = await models.Auth.findOne({ email });
    // console.log(user);

    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password, user.password);

    if (!isMatch) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const payload = {
      _id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return res.status(StatusCodes.OK).json({ success: true, token });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await models.Auth.findById(req.user._id);

    res.status(StatusCodes.OK).json({ success: true, data: user });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const uploadProfileImage = async (req, res) => {
  const user = await models.Auth.findById(req.user._id);
  console.log(user);
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, message: 'User not found' });
  }

  if (req.file) {
    uploadOnCloudinary(req.file);
    user.profileImage = req.file.path;
  }

  return res.status(StatusCodes.OK).json({ success: true, data: user });
  // await user.save();
};
