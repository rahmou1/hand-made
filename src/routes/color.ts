import { Router } from 'express';
import colorRoutes from './api/colors.routes';
const colors = Router();
colors.use('/colors', colorRoutes);

export default colors;
