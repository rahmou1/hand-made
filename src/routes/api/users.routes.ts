import { Router } from 'express';
import * as controllers from '../../controllers/users.contorllers';
const users = Router();

//! Users Api
users.route('/').get(controllers.getMany).post(controllers.create);
users
  .route('/:id')
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.deleteOne);

//! Authentication
users.route('/authenticate').post(controllers.authenticate);
export default users;
