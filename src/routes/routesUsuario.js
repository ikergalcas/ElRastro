import express from 'express'
import { getAllUsuarios, createUsuario, editUsuario, deleteUsuario,getUsuarioNombre,getUsuarioValoracion,getCompradores} from '../controllers/UsuarioController.js'

const routerUsuario = express.Router()

routerUsuario.get('/', getAllUsuarios)
routerUsuario.post('/', createUsuario)
routerUsuario.put('/:id', editUsuario)
routerUsuario.delete('/:id', deleteUsuario)
routerUsuario.post('/username',getUsuarioNombre)
routerUsuario.post('/valoracion',getUsuarioValoracion)
routerUsuario.post('/compradores',getCompradores)

export default routerUsuario