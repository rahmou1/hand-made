import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/products.model';

const productModel = new ProductModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.create(req.body);
    res.status(200).json({
      status: 'true',
      data: { ...product },
      message: 'Product created successfully',
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
    const product = await productModel.getMany();
    res.status(200).json({
      status: 'true',
      data: product,
      message: 'All products retrieved successfully',
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
    const product = await productModel.getOne(
      req.params.id as unknown as string
    );
    res.status(200).json({
      status: 'true',
      data: product,
      message: 'Product Retrieved Successfully',
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
    const product = await productModel.updateOne(req.body);
    res.status(200).json({
      status: 'true',
      data: product,
      message: 'Product updated Successfully',
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
    const product = await productModel.deleteOne(
      req.params.id as unknown as string
    );
    res.status(200).json({
      status: 'true',
      data: product,
      message: 'Product deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};
