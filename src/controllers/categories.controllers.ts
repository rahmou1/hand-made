import { NextFunction, Request, Response } from 'express';
import CategoryModel from '../models/category.models';

const categoryModel = new CategoryModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryModel.create(req.body);
    res.status(200).json({
      status: 'true',
      data: { ...category },
      message: 'Category Created Successful',
    });
  } catch (error) {
    next(error);
  }
};

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryModel.getMany();
    res.status(200).json({
      status: 'true',
      data: category,
      message: 'All Categories Retrieved Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryModel.getOne(
      req.params.id as unknown as string
    );
    res.status(200).json({
      status: 'true',
      data: category,
      message: 'Category Retrieved Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // we need here to use express validator to make sure the data inserted correctly or not
    const category = await categoryModel.updateOne(req.body);
    res.status(200).json({
      status: 'true',
      data: category,
      message: 'Category updated Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryModel.deleteOne(
      req.params.id as unknown as string
    );
    res.status(200).json({
      status: 'true',
      data: category,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
