// src/routers/students.js
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';

import { Router } from 'express';

import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// '/students',
router.get('/', ctrlWrapper(getStudentsController));

// '/students/:studentId',
router.get('/:studentId', ctrlWrapper(getStudentByIdController));

// '/',
router.post(
  '',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

// '/students/:studentId',
router.delete('/:studentId', ctrlWrapper(deleteStudentController));

// '/students/:studentId',
router.put(
  '/:studentId',
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

// '/students/:studentId',
router.patch(
  '/:studentId',
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
