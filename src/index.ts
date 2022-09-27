import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import users from './routes/users';
import artists from './routes/artists';
import categories from './routes/category';
import products from './routes/products';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import bodyParser from 'body-parser';
const PORT = config.port || 3000;
// Create instance server

const app: Application = express();
//middleware to parse incoming request
app.use(express.json());
//To put the database values in body
app.use(bodyParser.urlencoded({ extended: false }));

//HTTP request logger middleware
app.use(morgan('common'));
//HTTP security middleware
app.use(helmet());
// Apply the rate limiting middleware to all requests
app.use(
  RateLimit({
    // windowMs: 15 * 60 * 1000, // 15 minutes
    windowMs: 60 * 1000,
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many request, you need to wait 1 minute and try again',
  })
);

// User routes
app.use('/', users);
// User routes
app.use('/', artists);
// Categories routes
app.use('/', categories);
// Products routes
app.use('/', products);
// add route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome sir iam on and ready to serve you 💪',
  });
});

app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'I Think you lost your mind and do not know where are u going',
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is now running on port : ${PORT}`);
});

export default app;
