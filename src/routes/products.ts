import { Router } from 'express';
import productRoutes from './api/products.routes';

const products = Router();
products.use('/products', productRoutes);

export default products;
