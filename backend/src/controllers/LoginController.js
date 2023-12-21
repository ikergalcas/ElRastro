import { jwtDecode } from 'jwt-decode';
import Usuario from '../models/UsuarioModel.js';

export const verificarTokenGoogle = async (req, res) => {
    try {
        const {token} = req.params
        var userObjetct = jwtDecode(token)
        var epochExpire = userObjetct.exp

        let data ={
            "correo": userObjetct.email,
            "expiracionToken": new Date((epochExpire+3600)*1000),
            "tokenId": userObjetct.jti,
            "foto": userObjetct.picture
        };

        console.log("Correo: " + data.correo)
        let user = await Usuario.findOne({ username : data.correo })

        console.log("Usuario registrado: " + user)
        console.log("Id del usuario: " + user._id)

        //CODIGO MARTA 
        //res.json(data)
        res.json({token : data, idUser : user._id})
    } catch (error) {
        console.log('Error en la verificacion ', error)
        res.status(500).json({ message: 'Error al verificar el token' })
    }
};

export const verificarConexion = async (req, res) => {
    try {
        const {tokenId, token}  = req.params;
        var userObjetct = jwtDecode(token)
        var epochExpire = new Date ((userObjetct.exp+3600)*1000)

        var fechaActual= new Date ()
        fechaActual.setHours(fechaActual.getHours() + 1);
        
        console.log(fechaActual)

        if(tokenId == userObjetct.jti){
            if( epochExpire < fechaActual){
                res.send("expired");
            }else{
                res.send("ok");
            }
        }else{
            res.send("invalid token")
        }


    } catch (error) {
        console.log('Error en la consulta de usuarios en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener el usuarios' })
    }
};