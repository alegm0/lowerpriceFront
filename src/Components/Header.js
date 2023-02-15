import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from "../assets/img/logo.svg";
import ImgUser from "../assets/img/user-circle.svg";
//import Context from '../context/context';

function Header() {
    /*     const { login, user } = useContext(Context);
    
         useEffect(() => {
            login();
        }, []);
    
        useEffect(() => {
            console.log(user)
        }, [user]);  */

    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" variant="light">
                <Container>
                    <Navbar.Brand href="/home"><img src={logo} alt="Header" style={{ width: "40%" }} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="mr-5">
                            <NavDropdown title="Nuestros Servicios" id="collasible-nav-dropdown" style={{ fontFamily: "OpenSansCondensed-light", fontSize: "18px" }}>
                                <NavDropdown.Item href="/wishlist">Wishlist</NavDropdown.Item>
                                <NavDropdown.Item href="#">Tienda</NavDropdown.Item>
                                <NavDropdown.Item href="/shopping-list">Ventas</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <img src={ImgUser} alt="Imagen de usuario" />
                            <Nav.Link href="#" style={{ fontFamily: "OpenSansCondensed-light", fontSize: "18px" }}>¡Bienvenido!</Nav.Link>
                            <Nav.Link href="/" style={{ fontFamily: "OpenSansCondensed-light", fontSize: "18px" }}>Cerrar sesión</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ "border-top": "1px solid #D4D4D4" }} />
        </div>
    );
}

export default Header;