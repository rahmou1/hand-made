import { Router } from 'express';
import categoryRoutes from './api/category.routes';

const categories = Router();

categories.use('/category', categoryRoutes);

export default categories;
