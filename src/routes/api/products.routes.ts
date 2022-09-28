import { Router } from 'express';
import * as controllers from '../../controllers/products.controllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const products = Router();

products
  .route('/')
  .get(authenticationMiddleware, controllers.getMany)
  .post(authenticationMiddleware, controllers.create);
products
  .route('/:id')
  .get(authenticationMiddleware, controllers.getOne)
  .patch(authenticationMiddleware, controllers.updateOne)
  .delete(authenticationMiddleware, controllers.deleteOne);
export default products;
