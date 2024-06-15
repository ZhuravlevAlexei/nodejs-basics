// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// import studentsRouter from './routers/students.js';
import router from './routers/index.js';

import { env } from './utils/env.js';
// Імпортуємо middleware
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import { UPLOAD_DIR } from './constants/index.js';

import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use('/uploads', express.static(UPLOAD_DIR)); // устанавка маршрута для обробки файлів
  app.use('/api-docs', swaggerDocs());

  // app.use(express.json());
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      // limit: '100kb',
    }),
  );

  app.use(cors());

  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello from `World of Students`!',
    });
  });

  // app.use(studentsRouter);
  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
