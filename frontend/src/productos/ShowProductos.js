
import { useEffect, useState } from "react"
import axios from 'axios'
const URIproductos = 'http://localhost:3001/productos'

const ShowProductos = () => {
    const [productos, setProductos] = useState([])
    useEffect( () => {
        getProductos()
    },[])

    const getProductos = async () => {
        const res = await axios.get(URIproductos)
        let productos = res.data
        console.log(productos)
        setProductos(productos)
    }

return(
    <html lang="es">
        <div>
            {productos.map ((producto) => (
                <p>
                    {console.log(producto)}
                    {producto}
                </p>
            ))}
            {console.log(productos)}
            <p>
                ESTA PAGINA ES SHOWPRODUCTOS
            </p>
        </div>
    </html>
    )
}

export default ShowProductos