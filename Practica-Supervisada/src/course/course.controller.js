import Course from './course.model.js';


 export const saveCurso = async (req, res) => {
    try {
        const { nameCourse, description, Material, homeworks, teacher, NameStudents} = req.body;

        // Crear una nueva instancia del curso utilizando el modelo
        const newCourse = new Course({
            nameCourse,
            description,
            Material,
            homeworks,
            teacher,
            NameStudents
        });

        // Guardar el curso en la base de datos
        await newCourse.save();

        res.status(201).json({ message: 'Curso agregado exitosamente', curso: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el curso', error: error.message });
    }
};

