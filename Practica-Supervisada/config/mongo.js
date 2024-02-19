'use strict';

import mongoose from 'mongoose';

export const connect = async () => {
  try {
    // Proceso de conexión
    mongoose.connection.on('error', () => {
      console.log('MongoDB | No se pudo conectar a MongoDB');
      mongoose.disconnect();
    });
    mongoose.connection.on('connecting', () => {
      console.log('MongoDB | Intentando conectar');
    });
    mongoose.connection.on('connected', () => {
      console.log('MongoDB | Conectado a MongoDB');
    });
    mongoose.connection.once('open', () => {
      console.log('MongoDB | Conectado a la base de datos');
    });
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB | Reconectado a MongoDB');
    });
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB | Desconectado');
    });
    await mongoose.connect(process.env.URI_MONGO, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 50,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (err) {
    console.error('La conexión a la base de datos falló', err);
  }
};
