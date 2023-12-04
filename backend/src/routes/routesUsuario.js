import express from 'express'
import { getAllUsuarios, getUsuarioID, createUsuario, editUsuario, deleteUsuario,getUsuarioNombre,getUsuarioValoracion, getUbiUsuario,getCompradores} from '../controllers/UsuarioController.js'

const routerUsuario = express.Router()

routerUsuario.get('/', getAllUsuarios)
routerUsuario.get('/:id', getUsuarioID)
routerUsuario.post('/', createUsuario)
routerUsuario.put('/:id', editUsuario)
routerUsuario.delete('/:id', deleteUsuario)
routerUsuario.post('/username',getUsuarioNombre)
routerUsuario.post('/valoracion',getUsuarioValoracion)
routerUsuario.get('/ubi/:idUsuario', getUbiUsuario)
routerUsuario.post('/compradores',getCompradores)

export default routerUsuario