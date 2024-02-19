
import { Router } from "express";
import {saveCurso} from './course.controller.js'


const api = Router()

api.post('/save', saveCurso)


export default api