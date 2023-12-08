
import {useState, useEffect} from 'react'
import { Link} from 'react-router-dom'

const CompLogin = () => {

    return (
        <div className="container">
                <img src='http://res.cloudinary.com/dten77l85/image/upload/v1702032986/ebo5yzb1nfkgr57wqct5.jpg' 
                     style={{display : 'block', height: '60vmin' , width: '100%'}}></img>
            <Link to={"/productos"} className='btn btn-secondary' style={{marginTop: '5%'}}>Iniciar sesion</Link>
        </div>
    )
}

export default CompLogin 