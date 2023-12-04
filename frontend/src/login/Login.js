
import {useState, useEffect} from 'react'
import { Link} from 'react-router-dom'

const CompLogin = () => {

    return (
        <div className="container">
            <p>LOGIN</p>
            <Link to={"/productos"} className='btn primario'>Ir a productos</Link>
        </div>
    )
}

export default CompLogin 