// src/controllers/students.js
import createHttpError from 'http-errors';

import { getAllStudents, getStudentById } from '../services/students.js';

export const getStudentsController = async (req, res) => {
  const students = await getAllStudents();

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};
export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  // Додаємо базову обробку помилки
  if (!student) {
    // next(new Error('Student not found as Error'));
    next(createHttpError(404, 'Student not found as HttpError'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
