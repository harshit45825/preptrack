
import express, {Request, Response} from 'express';
import trackRouter from './routes/TrackRoutes';
import { initializeDatabase } from './config/database';
import authRouter from './routes/AuthRoutes';
import * as dotenv from 'dotenv';
import cors from 'cors';

// const corsOptions = {
//     credentials: true,
//     origin: ['http://localhost:5173'],
// };

const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
// const port: number=8082;
const port: number = Number(process.env.PORT) || 8082;



app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "OK" });
});
app.use("/api/v1", trackRouter);
app.use("/api/v1", authRouter);

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port number ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });