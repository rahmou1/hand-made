import { Router } from 'express';
import * as controllers from '../../controllers/artists.controllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const artists = Router();
artists
  .route('/')
  .get(authenticationMiddleware, controllers.getMany)
  .post(authenticationMiddleware, controllers.create);
artists
  .route('/:id')
  .get(authenticationMiddleware, controllers.getOne)
  .patch(authenticationMiddleware, controllers.updateOne)
  .delete(authenticationMiddleware, controllers.deleteOne);

export default artists;
