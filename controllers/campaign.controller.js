import models from '../models/index.model.js';
import { StatusCodes } from 'http-status-codes';

export const createCampaign = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized, Please use token :)' });
  }

  if (req.user.role !== 'organization') {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized, please use org id' });
  }
  const {
    title,
    description,
    totalFund,
    currentFund,
    fundDate,
    fundTime,
    totalFundPercentage,
    fundImage,
    participants,
    category,
  } = req.body;

  const categoryId = await models.Category.findById(category);
  if (!categoryId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Category not found' });
  }
  const newFundPost = new models.Campaign({
    title,
    description,
    totalFund,
    currentFund,
    fundDate,
    fundTime,
    totalFundPercentage,
    fundImage,
    postedBy: userId,
    participants,
    category,
  });
  try {
    await newFundPost.save();
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: newFundPost });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const allFundPosts = await models.Campaign.find();
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: allFundPosts });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getCampaignbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const fundPost = await models.Campaign.findById(id)
      .populate('postedBy', 'name email')
      .populate('participants', 'name');
    if (!fundPost) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Post not found' });
    }
    return res.status(StatusCodes.OK).json({ success: true, data: fundPost });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
