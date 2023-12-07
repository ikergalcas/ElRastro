import Producto from "../models/ProductoModel.js";
import Usuario from "../models/UsuarioModel.js";
import Puja from "../models/PujaModel.js";


export const getAllProductos = async (req, res) => {
    try {
        const data = await Producto.find()

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de productos en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};


export const getProductoPorId = async (req, res) => {
    try {
        const {idProducto}  = req.params;
        const product = (await Producto.findById(idProducto));

        res.json(product);

    } catch (error) {
        console.log('Error en la consulta de productos en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener el producto' })
    }
};


export const createProducto = async (req, res) => {
    try {
        const { descripcion, fechaCierre, foto, historialPujas, precioInicial, titulo, ubicacion, vendedor } = req.body
        let maximaPuja= precioInicial;
        const newProducto = new Producto({
            descripcion,
            fechaCierre,
            foto,
            historialPujas,
            maximaPuja,
            precioInicial,
            titulo,
            ubicacion,
            vendedor
        })

        await newProducto.save()

        const idNuevoProducto = newProducto._id;

        res.send(idNuevoProducto)

    } catch (error) {
        console.log('Error en la consulta de productos a la base de datos:', error);
        res.status(500).json({ message: 'Error al crear un producto' });
    }
}

export const editProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; //la info modificada
        
        //buscamos user y modificamos
        const updatedProducto = await Producto.findByIdAndUpdate(id, updateData, {new: true});

        if(!updatedProducto){
            return res.status(404).json({message : 'Producto no encontrado' });
        }
        res.json(updatedProducto);

    } catch (error) {
        console.log('Error en la consulta de productos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un producto' });
    }
}


export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;

        //buscamos user y borramos
        const searchedProducto = await Producto.findByIdAndDelete(id);

        if(!searchedProducto){
            return res.status(404).json({message : 'Producto no encontrado' });
        }
        res.send("borrado")

    } catch (error) {
        console.log('Error en la consulta de productos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un producto' });
    }
}

// operación que devuelva los productos ofertados por un usuario ordenados por la fecha
export const getProductosdeUsuario = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const listaProductos = (await Producto.find({vendedor : idUsuario}).sort({fechaCierre: -1}));

        res.json(listaProductos);

    } catch (error) {
        console.log('Error en la consulta de productos en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};

//obtener productos por descripcion
export const getProductosDescripcion = async (req, res) => {
    try {
        const {descripcion}  = req.body;
        const listaProductos = (await Producto.find({
            $or:[
                {descripcion: {$regex: descripcion, $options:"i"}}, 
                {titulo:{$regex: descripcion, $options:"i"}}
            ]}));

        res.json(listaProductos);

    } catch (error) {
        console.log('Error en la consulta de productos en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};

export const getProductosPrecioMax= async (req, res) => {
    try {
        const {precio}  = req.body;
        const listaProductos = (await Producto.find({         
                maximaPuja: {$lte: precio}
            }));

        res.json(listaProductos);

    } catch (error) {
        console.log('Error en la consulta de productos en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};

export const getProductosDescripcionPrecio = async (req, res) => {
    try {
        const {descripcion, precio}  = req.body;
        const listaProductos = (await Producto.find({
            $and: [
                {$or:[
                    {descripcion: {$regex: descripcion, $options:"i"}}, 
                    {titulo:{$regex: descripcion, $options:"i"}}
                ]},
                { maximaPuja: {$lte: precio} }
            ]
            }));

        res.json(listaProductos);

    } catch (error) {
        console.log('Error en la consulta de productos en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};

// Devuelve una lista de los productos en los que un usuario específico ha pujado
export const getProductosPujados = async (req, res) => {
    try {
        const {idUsuario} = req.params;
        const listaPujas = (await Puja.find({usuario:idUsuario}));
        const listaIdProductos = listaPujas.map((puja) => puja.producto);

        const listaProductos = [];
        
        for (const producto of listaIdProductos) {
            const productoObjeto = await Producto.findById(producto);
            listaProductos.push(productoObjeto);
        }

        res.json(listaProductos);

    } catch (error) {
        console.log('Error en la consulta de productos en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};

//calcular desde ubicacion origen y ubicaion destino por hacer, combina openstreetmap y huella carbono
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
    }
    
    function deg2rad(deg) {
    return deg * (Math.PI/180)
} 

export const getHuellaCarbono = async (req, res) => {
    try {
        const {ubicacionOrigen} = req.body;
        const {ubicacionDestino} =req.body;
        const {peso} = req.body;
        const {transporte} = req.body;
        var latO;
        var lonO;
        var latD;
        var lonD;
        var distancia;

        //const locationName = "Calle babor, 13, Malaga";
        const apiUrl1 = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(ubicacionOrigen)}`;
        const apiUrl2 = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(ubicacionDestino)}`;

        fetch(apiUrl1) //peticion ubicacion Origen
        .then(response => response.json())
        .then(dataU1 => {
            if (dataU1 && dataU1.length > 0) {
            const firstResult = dataU1[0];
            latO = parseFloat(firstResult.lat);
            lonO = parseFloat(firstResult.lon);
            } else {
            console.log("Ubicación1 no encontrada");
            }
            ///////////
            fetch(apiUrl2)//peticion ubicacion Destino
            .then(response => response.json())
            .then(dataU2 => {
                if (dataU2 && dataU2.length > 0) {
                const firstResult2 = dataU2[0];
                latD= parseFloat(firstResult2.lat);
                lonD = parseFloat(firstResult2.lon);
                } else {
                console.log("Ubicación2 no encontrada");
                }
                
                distancia=getDistanceFromLatLonInKm (latO,lonO,latD,lonD);
                
                //Datos para la peticion huella carbono
                const dataHC = {
                    "type": "shipping",
                    "weight_value": peso,
                    "weight_unit": "g",
                    "distance_value": distancia,
                    "distance_unit": "km",
                    "transport_method": `${transporte}`
                };
                  
                const options = {
                  method: 'POST',
                  body: JSON.stringify(dataHC),
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer wxfLsXHV9f8w4hmXKSxA'
                  }
                };
                const apiUrl = `https://www.carboninterface.com/api/v1/estimates`;
        
                fetch(apiUrl,options) //peticion huella carbono
                .then(response => response.json())
                .then(data => {
                    res.json(data.data.attributes.carbon_g)
                })  
                .catch(error => {
                    console.error("Error en la solicitud de huella de carbono: " + error);
                });
            })
            .catch(error => {
                console.error("Error en la solicitud de geocodificación1: " + error);
            });
        })
        .catch(error => {
            console.error("Error en la solicitud de geocodificación2: " + error);
        });

    } catch (error) {
        
    }
};
