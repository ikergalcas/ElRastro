import express from 'express'
import { getAllProductos, createProducto, editProducto, deleteProducto,getProductosdeUsuario,getProductosDescripcion
 } from '../controllers/ProductoController.js'

const routerProducto = express.Router()

routerProducto.get('/', getAllProductos)
routerProducto.post('/', createProducto)
routerProducto.put('/:id', editProducto)
routerProducto.delete('/:id', deleteProducto)
routerProducto.get('/:idUsuario',getProductosdeUsuario)
routerProducto.post('/descripcion',getProductosDescripcion)

export default routerProducto