//Para poner en marcha el backend ejecuto el comando npm run dev. Puedo cambiar el comando dev por otro
//desde package.json en la parte de scripts
import express from 'express'
import morgan from 'morgan'     //Morgan nos permite ver en el terminal las peticiones hechas al backend 
import routerUsuario from './routes/routesUsuario.js'
import routerProducto from './routes/routesProducto.js'
import routerPuja from './routes/routesPuja.js'

const app = express()

app.use(morgan('dev'))  //Si hacemos un get esto nos lo mostrara por el terminal
app.use(express.json()) //Esto es para convertir los req.body en formato json

app.use('/usuarios',routerUsuario)
app.use('/productos', routerProducto)
app.use('/puja', routerPuja)

export default app;