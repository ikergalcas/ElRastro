import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import fotoUser from "../imagenes/usuario.jpg"

function NavbarPage(props) {
    return (
    <Navbar expand="lg" style={{background: '#bb5751'}}>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
        <Nav className="me-auto">
          <Nav.Link href={`/productos`} className='navbar-link'> Home
          </Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown drop='start' className='me-3' title={<img src={fotoUser} style={{ width: '6vh', borderRadius: '20%' }} />} id="basic-nav-dropdown">
            <NavDropdown.Item href={`/editUser`}>Editar perfil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }

  export default NavbarPage;