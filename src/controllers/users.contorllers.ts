import config from '../config';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';

const userModel = new UserModel();

//* Create new user controller

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    res.status(200).json({
      status: 'true',
      data: { ...user },
      message: 'User Created successfully ',
    });
  } catch (error) {
    next(error);
  }
};

//* Get Many Users
export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getMany(req);
    res.json({
      status: 'true',
      data: users,
      message: 'Users retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

//* Get One User
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userInfo = req.body.user;
    // console.log(req.body.user);

    const user = await userModel.getOne(
      req.params.id as unknown as string,
      userInfo
    );
    res.json({
      status: 'true',
      data: user,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

//* Update One User
export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateOne(req.body);
    res.json({
      status: 'true',
      data: user,
      message: 'User Updated Successfully',
    });
  } catch (error) {
    next(error);
  }
};

//* Delete One User
export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as string);
    res.json({
      status: 'true',
      data: user,
      message: 'User Deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    if (!user) {
      return res.status(401).json({
        status: 'false',
        message: 'the E-mail or Password do not match please try again later',
      });
    }
    return res.json({
      status: 'true',
      data: { ...user, token },
      message: 'User authenticated successfully',
    });
  } catch (error) {
    return next(error);
  }
};
