import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    minLength: [8, 'La contraseña debe tener al menos 8 caracteres'],
    required: true
  },

  role: {
    type: String,
    uppercase: true,
    enum: ['TEACHER_ROLE'],
    default: 'TEACHER_ROLE',
    required: true
  }
});

export default mongoose.model('Teacher', teacherSchema);
