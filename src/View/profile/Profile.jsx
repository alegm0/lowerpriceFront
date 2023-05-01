import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import iconEdit from '../../assets/img/navbar/icono-editar.svg';
import iconDelete from '../../assets/img/navbar/icono-eliminar.svg';

import "./Profile.css";

function Profile() {
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
                    <p className="title-inputs mt-4 ml-2">Apellido (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese su apellido"
                    />
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Tipo de documento (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese su tipo de documento"
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
                    <p className="title-inputs mt-4 ml-2">Numero de documento (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese su numero de documento"
                    />
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Genero</p>
                    <select className="input inputs-class">
                        <option>Seleccione...</option>
                        <option>Masculino</option>
                        <option>Femenino</option>
                    </select>
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
                <Col lg={4}>
                    <h4 className="subdivision">Informacion de direcciones</h4>
                </Col>
                <Col lg={8}>
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
                    placeholder="Ingrese nombre direccion"
                    />
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Codigo postal</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese el codigo postal"
                    />
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Pais (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese pais"
                    />
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Departamento (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese un departamento"
                    />
                </div>
                </Col>
            </Row>
            <Row>
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
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Descripcion</p>
                    <textarea
                      name="description"
                      cols="80"
                      rows="3"
                      placeholder="Ingrese una descripcion"
                      className="textarea-product inputs-class"
                      style={{ width: "100%"}}
                    ></textarea>
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
            <Row>
                <Col lg={3} md={6} sm={12}>
                <Card style={{ width: '18rem', borderRadius:"40px", height:"300px"}}>
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col lg={6} className="mt-2">
                                    <p className="textCard">Casa</p>
                                </Col>
                                <Col lg={6} className="mt-2">
                                    <img src={iconEdit} alt="edit" style={{width: "20%"}} className="mr-3"/>
                                    <img src={iconDelete} alt="edit" style={{width: "20%"}}/>
                                </Col>
                            </Row>
                        </Card.Title>
                        <Card.Text>
                            <div style={{margin: "0 23px", textAlign:"initial"}}>
                                <p>Carrera 123 #123 -25</p>
                                <p>111111</p>
                                <p>Cundinamarca</p>
                                <p>Ciudad</p>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col lg={4}>
                    <h4 className="subdivision">Registro de quejas</h4>
                </Col>
                <Col lg={8}>
                    <hr style={{borderColor: "white", marginTop: "32px"}}></hr>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Titulo (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese su titulo"
                    />
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Compañia</p>
                    <select className="input inputs-class">
                        <option>Seleccione...</option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                        <option>Opción 3</option>
                        <option>Opción 4</option>
                    </select>
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Ingrese el nombre del producto</p>
                    <textarea
                      name="description"
                      cols="80"
                      rows="5"
                      placeholder="Ingrese una descripcion"
                      className="textarea-product"
                      style={{ width: "100%"}}
                    ></textarea>
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
            <Row>
                <Col lg={3} md={6} sm={12}>
                <Card style={{ width: '18rem', borderRadius:"40px", height:"300px"}}>
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col lg={6} className="mt-2">
                                    <p className="textCard">Casa</p>
                                </Col>
                                <Col lg={6} className="mt-2">
                                    <img src={iconEdit} alt="edit" style={{width: "20%"}} className="mr-3"/>
                                    <img src={iconDelete} alt="edit" style={{width: "20%"}}/>
                                </Col>
                            </Row>
                        </Card.Title>
                        <Card.Text>
                            <div style={{margin: "0 23px", textAlign:"initial"}}>
                                <p>Carrera 123 #123 -25</p>
                                <p>111111</p>
                                <p>Cundinamarca</p>
                                <p>Ciudad</p>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
        </div>
    );
};
export default Profile;