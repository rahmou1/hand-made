import { Router } from 'express';
import * as contollers from '../../controllers/colors.controllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const colors = Router();

colors
  .route('/')
  .get(authenticationMiddleware, contollers.getMany)
  .post(authenticationMiddleware, contollers.create);
colors.route('/:id').delete(authenticationMiddleware, contollers.deleteOne);
export default colors;
