import React, { useState, useEffect, useRef} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CompPago = () => {
    
    const paypal = useRef()
    const { idComprador, idProducto } = useParams()

    const [huellaCarbono, setHuellaCarbono] = useState()
    const [vendedor, setVendedor] = useState()
    const [producto, setProducto] = useState(null)
    
    useEffect(() => {
        getDatos()
    }, []) 
    
    useEffect(() => {
        if (producto) {
            window.paypal.Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create ({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Producto comprado",
                                amount: {
                                    currency_code: "EUR",
                                    value: producto.maximaPuja
                                }
                            }
                        ],
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await (actions.order.capture())
                    console.log(order)
                },
                onError : (err) => {
                    console.log(err)
                }
            }).render(paypal.current)
        }
    }, [producto]);

   
    const getDatos = async () =>{
        var raw = JSON.stringify({
            "idComprador" : idComprador,
            "idProducto" : idProducto
        })

        fetch('http://localhost:3001/productos/huellaCarbonoNuevo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.json())
        .then(data => {
            setProducto(data.producto)
            setVendedor(data.vendedor)
           // setHuellaCarbono(data.huellaCarbono)
            console.log(data.producto)
            console.log(data.vendedor)
           // console.log(data.huellaCarbono)
        })
    }

    return(
        <div>
            <h1>PAGAME HIJUEPUTA</h1> <br/>
            <h3>Huella carbono (esta comentado) {/*huellaCarbono && huellaCarbono*/}</h3> <br/>
            <h3>Vendedor {vendedor && vendedor.username}</h3> <br></br>
            <h3>Producto {producto && producto.titulo}</h3>
            <div ref={paypal}></div>
        </div>
    )
}

export default CompPago