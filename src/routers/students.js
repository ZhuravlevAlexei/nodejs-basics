// src/routers/students.js
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';

import { upload } from '../middlewares/multer.js';

import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getStudentsController));
// '/students',
// router.get('/', ctrlWrapper(getStudentsController));

router.get(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  ctrlWrapper(getStudentByIdController),
);
// '/students/:studentId',
// router.get('/:studentId', ctrlWrapper(getStudentByIdController));

router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  upload.single('photo'), //new
  ctrlWrapper(createStudentController),
);
// '/',
// router.post(
//   '',
//   validateBody(createStudentSchema),
//   ctrlWrapper(createStudentController),
// );

router.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  upload.single('photo'), //new
  ctrlWrapper(upsertStudentController),
);
// '/students/:studentId',
// router.put(
//   '/:studentId',
//   validateBody(createStudentSchema),
//   ctrlWrapper(upsertStudentController),
// );

router.patch(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateStudentSchema),
  upload.single('photo'), //new
  ctrlWrapper(patchStudentController),
);
// '/students/:studentId',
// router.patch(
//   '/:studentId',
//   validateBody(updateStudentSchema),
//   ctrlWrapper(patchStudentController),
// );

router.delete(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(deleteStudentController),
);
// '/students/:studentId',
// router.delete('/:studentId', ctrlWrapper(deleteStudentController));

export default router;
