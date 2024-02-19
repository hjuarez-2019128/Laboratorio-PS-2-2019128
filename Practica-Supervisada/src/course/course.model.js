import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    nameCourse: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    Material: {
        type: String,
        required: true
    }, 

    homeworks: {
        type: String,
        required: true
    },

    teacher: {
        type: String,
        required: true
    },
    NameStudents: {
        type: String,
        required: true
    },

    
});

export default mongoose.model('Course', courseSchema);

 
