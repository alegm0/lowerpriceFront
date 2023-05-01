import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import iconEdit from '../../assets/img/navbar/icono-editar.svg';
import iconDelete from '../../assets/img/navbar/icono-eliminar.svg';

import "./Profile.css";


function ProfileCompany() {
    return (
        <div className="body-view">
            <Container>
                <h2 className="title">Perfil</h2>
                <p className="subtitle">Para poder editar el perfil debe llenar todos los espacios que contengan él (*), adicionalmente si desea agregar los métodos de pagos, sus respectivas direcciones</p>
            <Row>
                <Col lg={3}>
                    <h4 className="subdivision">Información personal</h4>
                </Col>
                <Col lg={9}>
                    <hr style={{borderColor: "white", marginTop: "32px"}}></hr>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Nombre (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese su nombre"
                    />
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Telefono</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese su telefono"
                    />
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Email</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese su email"
                    />
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Pagina wev</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese su pagina web"
                    />
                </div>
                </Col>
                
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Tamaño de la compañia (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese el tamaño de la compañia"
                    />
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Estado</p>
                    <select className="input inputs-class">
                        <option>Seleccione...</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Direccion de la compañia (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese la direccion de la compañia"
                    />
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Pais</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese la direccion de la compañia"
                    />
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Departamento (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese el departamento"
                    />
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Ciudad (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese la ciudad"
                    />
                </div>
                </Col>
            </Row>
            <Row>
            <Col lg={12} className="content-product content-body-home mt-5">
                <Button className="button-purple-home" >
                    Guardar
                </Button>
            </Col>
            </Row>
            <Row className="mt-4">
                <Col lg={5}>
                    <h4 className="subdivision">Informacion de metodos de pago recibido</h4>
                </Col>
                <Col lg={7}>
                    <hr style={{borderColor: "white", marginTop: "32px"}}></hr>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Estado</p>
                    <select className="input inputs-class">
                        <option>Seleccione...</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <Button className="button-purple-home" >
                    Guardar
                </Button>
                </Col>
            </Row>
            </Container>
        </div>
    );
}
export default ProfileCompany;