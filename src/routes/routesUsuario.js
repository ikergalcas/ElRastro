import express from 'express'
import { getAllUsuarios, createUsuario, editUsuario, deleteUsuario,getUsuarioNombre,getUsuarioValoracion, getUbiUsuario, calcularHuellaDeCarbono} from '../controllers/UsuarioController.js'

const routerUsuario = express.Router()

routerUsuario.get('/', getAllUsuarios)
routerUsuario.post('/', createUsuario)
routerUsuario.put('/:id', editUsuario)
routerUsuario.delete('/:id', deleteUsuario)
routerUsuario.post('/username',getUsuarioNombre)
routerUsuario.post('/valoracion',getUsuarioValoracion)
routerUsuario.get('/ubi/:idUsuario', getUbiUsuario)
//routerUsuario.get('/ubi', getUbiUsuario)
routerUsuario.get('/huella', calcularHuellaDeCarbono)
export default routerUsuario