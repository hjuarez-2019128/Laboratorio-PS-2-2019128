// routers/studentRouter.js

import express from 'express'
import {loginStudent , assignCourse, deleteProfile, editProfile, registerStudent} from './student.controller.js'
const api = express.Router();

api.post('/Studentregister',registerStudent);
api.post('/Login',loginStudent );


api.put('/:studentId/edit', editProfile);
api.delete('/:studentId/delete', deleteProfile);
api.put('/:studentId/assigncourse', assignCourse);


export default api
