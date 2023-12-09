import express from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'

const upload = multer({ dest: 'uploads/' });  // Indica el directorio donde multer debe almacenar los archivos temporales
cloudinary.config({
    cloud_name: 'dten77l85',
    api_key: '829615256525372',
    api_secret: 'Km6kFadj1HOmPf6mYYyyd6KIMeQ'
});

import { getProductoPorId, getAllProductos, createProducto, editProducto, deleteProducto,getProductosdeUsuario,getProductosDescripcion,
    getProductosPujados,getHuellaCarbono,getProductosPrecioMax, getProductosDescripcionPrecio, getProductosSinVenderDeUsuario,
    getProductosVendidosDeUsuario } from '../controllers/ProductoController.js'

const routerProducto = express.Router()

routerProducto.get('/', getAllProductos)
routerProducto.post('/', createProducto)
routerProducto.put('/:id', editProducto)
routerProducto.delete('/:id', deleteProducto)
routerProducto.get('/:idProducto', getProductoPorId)
routerProducto.get('/usuario/:idUsuario',getProductosdeUsuario)
routerProducto.get('/usuario/:idUsuario/vendidos',getProductosVendidosDeUsuario)
routerProducto.get('/usuario/:idUsuario/sinVender',getProductosSinVenderDeUsuario)
routerProducto.post('/descripcion',getProductosDescripcion)
routerProducto.post('/preciomax',getProductosPrecioMax)
routerProducto.post('/descripcionPrecio',getProductosDescripcionPrecio)
routerProducto.get('/pujados/:idUsuario',getProductosPujados)
routerProducto.post('/huellaCarbono',getHuellaCarbono)
routerProducto.post('/subirFoto', upload.single('foto'), async (req, res) => {
    try {
      const foto = req.file;
  
      // Verifica si multer ha creado el archivo temporal correctamente
      if (!foto) {
        return res.status(400).json({ error: 'No se proporcionó el archivo de imagen.' });
      }
  
      // Subir la foto a Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(foto.path, {
        // Puedes agregar opciones adicionales aquí
      });
  
      // Puedes hacer algo con la respuesta de Cloudinary, como almacenar la URL en tu base de datos
      console.log('Foto subida a Cloudinary:', cloudinaryResponse.url);
  
      res.status(200).json({ message: 'Imagen subida correctamente', imageUrl: cloudinaryResponse.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al subir la foto a Cloudinary' });
    }
  });
  

export default routerProducto