import express from 'express'
import { getAllProductos } from '../controllers/ProductoController.js'

const routerProducto = express.Router()

routerProducto.get('/', getAllProductos)

export default routerProducto