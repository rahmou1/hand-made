import { Router } from 'express';
import * as controllers from '../../controllers/users.contorllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';
const users = Router();

//! Users Api
users
  .route('/')
  .get(authenticationMiddleware, controllers.getMany)
  .post(controllers.create);
users
  .route('/:id')
  .get(authenticationMiddleware, controllers.getOne)
  .patch(authenticationMiddleware, controllers.updateOne)
  .delete(authenticationMiddleware, controllers.deleteOne);

//! Authentication
users.route('/authenticate').post(controllers.authenticate);
export default users;
