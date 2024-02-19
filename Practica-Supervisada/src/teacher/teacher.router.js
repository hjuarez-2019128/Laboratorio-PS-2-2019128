import express from 'express'

import {registerTeacher, saveCurso } from './teacher.controller.js'

const api = express.Router();

api.post('/register',registerTeacher)
api.post('/save', saveCurso)

export default api