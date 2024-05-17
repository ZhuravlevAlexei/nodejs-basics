// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

// Читаємо змінну оточення PORT правильно функцією з файлу
import { env } from './utils/env.js';
const PORT = Number(env('PORT', '3000'));
// спочатку просто
// const PORT = 3000;
//а можна так
// import dotenv from 'dotenv';
// dotenv.config();
// Читаємо змінну оточення PORT
// const PORT = Number(process.env.PORT);

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
