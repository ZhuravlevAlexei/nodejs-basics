// src/services/students.js
import { StudentsCollection } from '../db/models/student.js';

import { mongoose } from 'mongoose';

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentById = async (studentId) => {
  //якщо не перевірити на валідність id - .findById валить сервер з неваліднім id
  //довго розбирався, чому все падає, якщо id, наприклад, коротше 24 символів, потім
  //СhatGPT підтвердив таку особливість. Тепер працює норм.
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    // console.log(`Invalid id: ${studentId}`);
    return null;
  }
  // console.log(`Valid id: ${studentId}`);
  const student = await StudentsCollection.findById(studentId);
  return student;
};
