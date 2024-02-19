// ESModules 
'use strict';

// Importaciones
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { config } from 'dotenv';
import studentRouter from '../src/student/student.router.js';
import teacherRouter from '../src/teacher/teacher.router.js';
import courseRouter from '../src/course/course.router.js';
// Configuraciones
const app = express();
config();
const port = process.env.PORT || 3056


// Configuración del servidor
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); // Aceptar o denegar solicitudes de diferentes orígenes (local, remoto) / políticas de acceso
app.use(helmet()); // Aplica capa de seguridad básica al servidor
app.use(morgan('dev')); // Logs de solicitudes al servidor HTTP

// Declaración de rutas
app.use(studentRouter)
app.use(courseRouter)
app.use('/Teacher',teacherRouter)


//Levantar el servidor
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}