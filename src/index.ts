import express, { Application, Request, Response } from 'express';
const PORT = 3000;
// Create instance server

const app: Application = express();

// add route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome sir iam on and ready to serve you 💪',
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is now running on port : ${PORT}`);
});

export default app;
