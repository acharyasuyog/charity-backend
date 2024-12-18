import models from '../models/index.model';
import { StatusCodes } from 'http-status-codes';

export const createFundPost = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized, please use org id' });
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
    postedBy,
    participants,
  } = req.body;
  const newFundPost = new models.FundPost({
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

export const getAllFundPosts = async (req, res) => {
  try {
    const allFundPosts = await models.FundPost.find();
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: allFundPosts });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getFundPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const fundPost = await models.FundPost.findById(id);
    if (!fundPost) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `FundPost with id: ${id} not found` });
    }
    return res.status(StatusCodes.OK).json({ success: true, data: fundPost });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
