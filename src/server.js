// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getAllStudents, getStudentById } from './services/students.js';

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

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();

    res.status(200).json({
      data: students,
    });
  });

  app.get('/students/:studentId', async (req, res) => {
    const { studentId } = req.params;
    console.log('studentId: ', studentId);
    const student = await getStudentById(studentId);
    console.log('student: ', student);

    res.status(200).json({
      data: student,
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
