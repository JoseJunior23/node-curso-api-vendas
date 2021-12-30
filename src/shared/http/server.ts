import 'reflect-metadata';
import 'dotenv/config';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import '@shared/typeorm/connection';
import { routes } from './routes';
import { errors } from 'celebrate';
import UploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(UploadConfig.directory));
app.use(routes);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('✅ Server started in http://localhost:3333');
});
