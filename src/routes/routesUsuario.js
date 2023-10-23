import express from 'express'
import { getAllUsuarios } from '../controllers/UsuarioController.js'

const routerUsuario = express.Router()

routerUsuario.get('/', getAllUsuarios)

export default routerUsuario