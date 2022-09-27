import { Router } from 'express';
import * as controllers from '../../controllers/products.controllers';

const products = Router();

products.route('/').get(controllers.getMany).post(controllers.create);
products
  .route('/:id')
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.deleteOne);
export default products;
