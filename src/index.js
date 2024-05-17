// src/index.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

const PORT = 3000;
const app = express();

//logging
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

// Middleware для обробки запитів з додатковими заголовками
// наприклад:
//Access-Control-Allow-Origin: *
//Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
//Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE
//робимо відповідні заголовки за допомогою CORS
app.use(cors());

// Middleware для логування часу запиту
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
// наприклад, у запитах POST або PATCH
app.use(express.json());

// Маршрут для обробки GET-запитів на '/'
app.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!',
  });
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

// Middleware для обробких помилок (приймає 4 аргументи)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
