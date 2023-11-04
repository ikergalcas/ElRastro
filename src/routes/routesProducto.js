import express from 'express'
import { getAllProductos, createProducto, editProducto, deleteProducto,getProductosdeUsuario,getProductosDescripcion,getProductosPujados
 } from '../controllers/ProductoController.js'

const routerProducto = express.Router()

routerProducto.get('/', getAllProductos)
routerProducto.post('/', createProducto)
routerProducto.put('/:id', editProducto)
routerProducto.delete('/:id', deleteProducto)
routerProducto.get('/:idUsuario',getProductosdeUsuario)
routerProducto.post('/descripcion',getProductosDescripcion)
routerProducto.post('/pujados',getProductosPujados)

export default routerProducto