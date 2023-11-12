import express from 'express'
import { getAllPujas, createPuja, editPuja, deletePuja, getPujaProducto,getPujaUsuario,getPujaPrecio } from '../controllers/PujaController.js'
import routerProducto from './routesProducto.js'

const routerPuja = express.Router()

routerPuja.get('/', getAllPujas)
routerPuja.post('/', createPuja)
routerPuja.put('/:id', editPuja)
routerPuja.delete('/:id', deletePuja)
routerPuja.get('/producto/:idProducto', getPujaProducto)
routerPuja.get('/usuario/:idUsuario', getPujaUsuario)
routerPuja.post('/precio',getPujaPrecio)

export default routerPuja