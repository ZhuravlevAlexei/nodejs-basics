// src/services/students.js
import { mongoose } from 'mongoose';
import { StudentsCollection } from '../db/models/student.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllStudents = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentsQuery = StudentsCollection.find();

  if (filter.gender) {
    studentsQuery.where('gender').equals(filter.gender);
  }
  if (filter.maxAge) {
    studentsQuery.where('age').lte(filter.maxAge);
  }
  if (filter.minAge) {
    studentsQuery.where('age').gte(filter.minAge);
  }
  if (filter.maxAvgMark) {
    studentsQuery.where('avgMark').lte(filter.maxAvgMark);
  }
  if (filter.minAvgMark) {
    studentsQuery.where('avgMark').gte(filter.minAvgMark);
  }

  const [studentsCount, students] = await Promise.all([
    StudentsCollection.find().merge(studentsQuery).countDocuments(),
    studentsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  // const studentsCount = await StudentsCollection.find()
  //   .merge(studentsQuery)
  //   .countDocuments();

  // const students = await studentsQuery
  //   .skip(skip)
  //   .limit(limit)
  //   .sort({ [sortBy]: sortOrder })
  //   .exec();

  const paginationData = calculatePaginationData(studentsCount, perPage, page);

  return {
    data: students,
    ...paginationData,
  };
};

export const getStudentById = async (studentId) => {
  //якщо не перевірити на валідність id - .findById валить сервер з неваліднім id
  //довго розбирався, чому все падає, якщо id, наприклад, коротше 24 символів, потім
  //СhatGPT підтвердив таку особливість. Тепер працює норм.
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    // console.log(`Invalid id: ${studentId}`);
    return null;
  }

  //варіант 2 через Error
  // if (!mongoose.Types.ObjectId.isValid(contactId)) {
  //   // console.log('Contact id is not valid for MongoDB', contactId);
  //   // return null;
  //   throw new Error(
  //     'Contact id is not valid for MongoDB. Length must be 24 symbols.',
  //   );
  // }

  // console.log(`Valid id: ${studentId}`);
  const student = await StudentsCollection.findById(studentId);
  return student;
};

export const createStudent = async (payload) => {
  //payload буде таким
  // {
  //   "name": "John Doe",
  //   "email": "jojndoe@mail.com",
  //   "age": 10,
  //   "gender": "male",
  //   "avgMark": 10.3,
  //   "onDuty": true
  // }
  // Тіло функції
  const student = await StudentsCollection.create(payload);
  return student;
};

export const deleteStudent = async (studentId) => {
  const student = await StudentsCollection.findOneAndDelete({
    _id: studentId,
  });

  return student;
};

export const updateStudent = async (studentId, payload, options = {}) => {
  //payload буде таким
  // {
  //   "name": "John Doe",
  //   "email": "jojndoe@mail.com",
  //   "age": 10,
  //   "gender": "male",
  //   "avgMark": 10.3,
  //   "onDuty": true
  // }
  // Тіло функції
  const rawResult = await StudentsCollection.findOneAndUpdate(
    { _id: studentId }, //query -1 параметр обов'язковий
    payload, //update -2 параметр обов'язковий
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }, //options -3 параметр обов'язковий при put, там передаємо
    //трохи на додаток через options вище до цього об'єкту
    //та цей за замовчуванням при patch, там нічого не передаємо,
    //бо options пустий за замовчуванням
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
