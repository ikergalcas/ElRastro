import express from 'express'
import { getAllUsuarios, createUsuario, editUsuario, deleteUsuario } from '../controllers/UsuarioController.js'

const routerUsuario = express.Router()

routerUsuario.get('/', getAllUsuarios)
routerUsuario.post('/', createUsuario)
routerUsuario.put('/:id', editUsuario)
routerUsuario.delete('/:id', deleteUsuario)

export default routerUsuario