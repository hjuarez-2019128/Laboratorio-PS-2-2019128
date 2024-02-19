//Ejecutar servicios
import { initServer } from './config/app.js'
import { connect } from "./config/mongo.js"

initServer()
connect()