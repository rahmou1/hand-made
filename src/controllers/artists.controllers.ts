import { NextFunction, Request, Response } from 'express';
import ArtistModel from '../models/artist.model';

const artistModel = new ArtistModel();

// Create Artist

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artists = await artistModel.create(req.body);
    res.status(200).json({
      status: 'true',
      data: { ...artists },
      message: 'Artist created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get all artists

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artists = await artistModel.getMany();
    res.status(200).json({
      status: 'true',
      data: artists,
      message: 'Fetching Artists successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get specific artist

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artist = await artistModel.getOne(req.params.id as unknown as string);
    res.status(200).json({
      status: 'true',
      data: artist,
      message: 'Fetching artist successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Update Artist
export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artist = await artistModel.updateOne(req.body);
    res.status(200).json({
      status: 'true',
      data: artist,
      message: 'Artist Updated Successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Delete Artist
export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artist = await artistModel.deleteOne(
      req.params.id as unknown as string
    );
    res.status(200).json({
      status: 'true',
      data: artist,
      message: 'Artist deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
