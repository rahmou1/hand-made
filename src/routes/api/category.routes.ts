import { Router } from 'express';
import * as controllers from '../../controllers/categories.controllers';
const categories = Router();

categories.route('/').get(controllers.getMany).post(controllers.create);
categories
  .route('/:id')
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.deleteOne);
export default categories;
