import React, { useState, useEffect, useRef} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CompPago = () => {
    const { idComprador, idProducto } = useParams()

    const [huellaCarbono, setHuellaCarbono] = useState()
    const [vendedor, setVendedor] = useState()
    const [producto, setProducto] = useState()
    const [checkout, setCheckOut] = useState(false)
    
    const paypal = useRef()

    useEffect(() => {
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
            setHuellaCarbono(data.huellaCarbono)
            console.log(data.producto)
            console.log(data.vendedor)
            console.log(data.huellaCarbono)
        })

        // PayPal(producto.)
    }, [])    

    const PayPal = async (precio) => {
        console.log(checkout)
        if (!checkout) {
            window.paypal.Buttons({
                createOrder: (data, actions, err) => {
                    setCheckOut(true)
                    return actions.order.create ({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Producto comprado",
                                amount: {
                                    currency_code: "EUR",
                                    value: precio
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
    }

    return(
        <div>
            <h1>PAGAME HIJUEPUTA</h1> <br/>
            <h3>Huella carbono {huellaCarbono && huellaCarbono}</h3> <br/>
            <h3>Vendedor {vendedor && vendedor.username}</h3> <br></br>
            <h3>Producto {producto && producto.titulo}</h3>
            <div ref={paypal}></div>
        </div>
    )
}

export default CompPago