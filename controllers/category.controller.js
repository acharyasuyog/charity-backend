import models from '../models/index.model.js';
import { StatusCodes } from 'http-status-codes';

export const createCategory = async (req, res) => {
  try {
    const category = new models.Category(req.body);
    await category.save();
    res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await models.Category.find();
    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await models.Category.findById(req.params.id);
    res.status(StatusCodes.OK).json(category);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await models.Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(StatusCodes.OK).json(category);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await models.Category.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json('Category deleted successfully');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
