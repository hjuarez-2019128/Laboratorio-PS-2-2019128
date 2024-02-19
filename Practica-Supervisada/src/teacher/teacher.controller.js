//import Course from '../course/course.model.js';
import Teacher from './teacher.model.js'; 
import {encrypt} from '../utils/validator.js'
import CourseTeacher from '../course/course.model.js';

export const registerTeacher = async (req, res) => {
    try {
        // Capturar el formulario (body)
        let data = req.body;

        // Encriptar la contraseña
        data.password = await encrypt(data.password);

        // Asignar el rol por defecto
        data.role = 'TEACHER_ROLE';

        // Guardar la información en la BD
        let teacher = new Teacher(data);
        await teacher.save(); // Guardar en la BD

        // Responder al usuario
        return res.send({ message: `Teacher registered successfully with email: ${teacher.email}` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error registering teacher', err: err });
    }
};

export const saveCurso = async (req, res) => {
    try {
        const { nameCourse, description, Material, homeworks, teacher, NameStudents} = req.body;

        // Crear una nueva instancia del curso utilizando el modelo
        const newCourse = new CourseTeacher ({
            nameCourse,
            description,
            Material,
            homeworks,
            teacher,
            NameStudents
        });

        // Guardar el curso en la base de datos
        await newCourse.save();

        res.status(201).json({ message: 'Tu Curso fue agregado exitosamente', curso: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el curso', error: error.message });
    }
};

