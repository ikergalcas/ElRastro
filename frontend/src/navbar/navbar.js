import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import fotoUser from "../imagenes/usuario.jpg"

function NavbarPage(props) {
    return (
    <Navbar expand="lg" className="navbar">
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
        <Nav className="me-auto">
          <Nav.Link href={`/productos`} className='navbar-link' style={{marginLeft: '10vmin'}}> Home
          </Nav.Link>
        </Nav>
        <Nav>
            <NavDropdown drop='start' className='me-3' title={<img src={fotoUser} style={{ width: '6vh', borderRadius: '50%' }} alt="" />} id="basic-nav-dropdown">
            <NavDropdown.Item href={`/editUser/653befbcd16378ca5b1c98ab`}>Editar perfil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }

  export default NavbarPage;