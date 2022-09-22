import { Router } from 'express';
import userRoutes from './api/users.routes';
const users = Router();

users.use('/users', userRoutes);
export default users;
