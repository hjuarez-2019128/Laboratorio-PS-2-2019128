// controllers/studentController.js
import Student from './student.model.js';
import Course from '../course/course.model.js';

import { encrypt, checkPassword } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

// Registrar un nuevo estudiante

export const registerStudent = async (req, res) => {
  try {
      // Capturar el formulario (body)
      let data = req.body;
      // Encriptar la contraseña
      data.password = await encrypt(data.password);
      // Asignar el rol de estudiante
      data.role = 'STUDENT_ROLE';
      // Guardar la información en la BD
      let student = new Student(data);
      await student.save(); // Guardar en la BD
      // Responder al usuario
      return res.send({ message: `Registered successfully, can log in with username ${student.username}` });
  } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error registering student', error: err });
  }
};

export const loginStudent = async (req, res) => {
  try {
      // Capturar los datos del cuerpo de la solicitud
      let { username, password } = req.body;
      // Validar que el estudiante exista
      let student = await Student.findOne({ username }); // Buscar un solo registro
      // Verificar que la contraseña coincida
      if (student && await checkPassword(password, student.password)) {
          let loggedStudent = {
              uid: student._id,
              username: student.username,
              role: student.role,
            
          };
          // Generar el Token JWT
          let token = await generateJwt(loggedStudent);
          // Responder al estudiante
          return res.send({
              message: `Welcome ${loggedStudent.username}`,
              loggedStudent,
              token
          });
      }
      return res.status(404).send({ message: 'Invalid credentials' });
  } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error to login' });
  }
};


// Editar el perfil de un estudiante
export const editProfile = async (req, res) => {
  try {
    const { username, password } = req.body;
    const studentId = req.params.studentId;
    const student = await Student.findByIdAndUpdate(studentId, { username, password }, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }
    res.json({ message: 'Perfil de estudiante actualizado correctamente.', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar el perfil de un estudiante
export const deleteProfile = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }
    res.json({ message: 'Perfil de estudiante eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const assignCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.params.studentId;

    // Buscar el estudiante por su ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }

    // Verificar si el estudiante ya está asignado al máximo de cursos permitidos
    if (student.assignedCourses.length >= 3) {
      return res.status(400).json({ message: 'El estudiante ya está asignado al máximo de cursos permitidos.' });
    }

    // Verificar si el estudiante ya está asignado a este curso
    if (student.assignedCourses.includes(courseId)) {
      return res.status(400).json({ message: 'El estudiante ya está asignado a este curso.' });
    }

    // Buscar el curso por su ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado.' });
    }

    // Agregar el ID del curso al array de cursos asignados del estudiante
    student.assignedCourses.push(courseId);
    await student.save();

    // Agregar el ID del estudiante al array de estudiantes del curso
    course.students.push(studentId);
    await course.save();

    res.json({ message: 'Curso asignado correctamente al estudiante.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
