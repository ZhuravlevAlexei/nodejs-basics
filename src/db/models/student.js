// src/db/models/student.js

import { model, Schema } from 'mongoose';

const studentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    avgMark: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    photo: { type: String }, // нова властивість
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const StudentsCollection = model('students', studentsSchema);
