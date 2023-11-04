import express from 'express'
import { getAllUsuarios, createUsuario, editUsuario, deleteUsuario,getUsuarioNombre,getUsuarioValoracion, getUbiUsuario,getCompradores} from '../controllers/UsuarioController.js'

const routerUsuario = express.Router()

routerUsuario.get('/', getAllUsuarios)
routerUsuario.post('/', createUsuario)
routerUsuario.put('/:id', editUsuario)
routerUsuario.delete('/:id', deleteUsuario)
routerUsuario.post('/username',getUsuarioNombre)
routerUsuario.post('/valoracion',getUsuarioValoracion)

export default routerUsuario