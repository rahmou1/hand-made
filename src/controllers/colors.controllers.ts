import { NextFunction, Request, Response } from 'express';
import ColorModel from '../models/color.model';

const colorModel = new ColorModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const color = await colorModel.create(req.body);
    res.status(200).json({
      status: 'true',
      data: { ...color },
      message: 'Color Created Successfully',
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
    const color = await colorModel.getMany();
    res.status(200).json({
      status: 'true',
      data: color,
      message: 'All colors retrieved successfully',
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
    const color = await colorModel.deleteOne(
      req.params.id as unknown as string
    );
    res.status(200).json({
      status: 'true',
      data: color,
      message: 'Color deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
