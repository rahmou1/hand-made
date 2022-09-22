import { Router } from 'express';
import artistRoutes from './api/artists.routes';

const artists = Router();

artists.use('/artists', artistRoutes);

export default artists;
