// models/Student.js
import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
    },

  surname: {
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
    required: true,
    default: 'STUDENT_ROLE',
  
  }
 
});

export default mongoose.model('Student', studentSchema);
