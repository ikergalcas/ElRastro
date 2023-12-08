//Desde index.js arrancamos el backend

import appProducto from './apps/appProducto.js'  //Como el fichero app.js es creado por nosotros debemos indicar la direccion
import appUsuario from './apps/appUsuario.js'
import appComentario from './apps/appComentario.js'
import {connectDB} from './db.js'   //Uso las llaves pq no he hecho export default

connectDB()
appProducto.listen(3001)
console.log('Server Productos on port', 3001)
appUsuario.listen(3003)
console.log('Server Usuario on port', 3003)
appComentario.listen(3004)
console.log('Server Comentario on port', 3004)


