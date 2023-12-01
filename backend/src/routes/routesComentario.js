import express from 'express'

import { getAllComentarios, createComentario, editComentario, deleteComentario } from '../controllers/comentarioController.js'

const routerComentario = express.Router()

routerComentario.get('/', getAllComentarios)
routerComentario.post('/', createComentario)
routerComentario.put('/:id', editComentario)
routerComentario.delete('/:id', deleteComentario)
  

export default routerComentario