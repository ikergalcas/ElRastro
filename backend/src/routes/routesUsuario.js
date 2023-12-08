import express from 'express'
import { getAllUsuarios, createUsuario, editUsuario, deleteUsuario,getUsuarioNombre,getUsuarioValoracion, getUbiUsuario,getCompradores, getProductosPujados, getUsuarioPorId} from '../controllers/UsuarioController.js'

import { getPujasUsuario } from '../controllers/PujaController.js'

const routerUsuario = express.Router()

routerUsuario.get('/', getAllUsuarios)
routerUsuario.post('/', createUsuario)
routerUsuario.put('/:id', editUsuario)
routerUsuario.delete('/:id', deleteUsuario)
routerUsuario.post('/username',getUsuarioNombre)
routerUsuario.get('/:idUsuario',getUsuarioPorId)
routerUsuario.post('/valoracion',getUsuarioValoracion)
routerUsuario.get('/:idUsuario/productosPujados', getProductosPujados)
routerUsuario.get('/:idUsuario/pujas', getPujasUsuario)
routerUsuario.get('/:idUsuario/pujas', getPujasUsuario)
routerUsuario.get('/ubi/:idUsuario', getUbiUsuario)
routerUsuario.post('/compradores',getCompradores)

export default routerUsuario