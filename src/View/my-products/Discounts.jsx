import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { urlRequest } from "../../urlRequest";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import iconoAtras from '../../assets/img/icono-atras.svg';
import setImg from "../../assets/img/setProduct.svg";
import seeImg from "../../assets/img/seeProduct.svg";
import deleteImg from "../../assets/img/deleteProduct.svg";
import referencia from "../../assets/img/referencia.png";

function Discounts() {
    
    const history = useHistory();

    const informationCards = [
        {
            title: "19%",
            url1: "/my-products",
            url2: "/my-products",
            fecha: "20/02/2022 - 20/02/2023",
            descripcion: "¡Aprovecha nuestra promoción de 2x1 en shampoo! Compra un shampoo y obtén otro gratis. Solo tienes que agregar dos unidades de shampoo a tu carrito y el descuento se aplicará automáticamente en el checkout. ¡No te pierdas esta oportunidad de ahorrar en tu cuidado capilar!"
        },
        {
            title: "19%",
            url1: "/my-products",
            url2: "/my-products",
            fecha: "20/02/2022 - 20/02/2023",
            descripcion: "¡Aprovecha nuestra promoción de 2x1 en shampoo! Compra un shampoo y obtén otro gratis. Solo tienes que agregar dos unidades de shampoo a tu carrito y el descuento se aplicará automáticamente en el checkout. ¡No te pierdas esta oportunidad de ahorrar en tu cuidado capilar!"
        },
        {
            title: "19%",
            url1: "/my-products",
            url2: "/my-products",
            fecha: "20/02/2022 - 20/02/2023",
            descripcion: "¡Aprovecha nuestra promoción de 2x1 en shampoo! Compra un shampoo y obtén otro gratis. Solo tienes que agregar dos unidades de shampoo a tu carrito y el descuento se aplicará automáticamente en el checkout. ¡No te pierdas esta oportunidad de ahorrar en tu cuidado capilar!"
        },
        {
            title: "19%",
            url1: "/my-products",
            url2: "/my-products",
            fecha: "20/02/2022 - 20/02/2023",
            descripcion: "¡Aprovecha nuestra promoción de 2x1 en shampoo! Compra un shampoo y obtén otro gratis. Solo tienes que agregar dos unidades de shampoo a tu carrito y el descuento se aplicará automáticamente en el checkout. ¡No te pierdas esta oportunidad de ahorrar en tu cuidado capilar!"
        },
        {
            title: "19%",
            url1: "/my-products",
            url2: "/my-products",
            fecha: "20/02/2022 - 20/02/2023",
            descripcion: "¡Aprovecha nuestra promoción de 2x1 en shampoo! Compra un shampoo y obtén otro gratis. Solo tienes que agregar dos unidades de shampoo a tu carrito y el descuento se aplicará automáticamente en el checkout. ¡No te pierdas esta oportunidad de ahorrar en tu cuidado capilar!"
        },
        {
            title: "19%",
            url1: "/my-products",
            url2: "/my-products",
            fecha: "20/02/2022 - 20/02/2023",
            descripcion: "¡Aprovecha nuestra promoción de 2x1 en shampoo! Compra un shampoo y obtén otro gratis. Solo tienes que agregar dos unidades de shampoo a tu carrito y el descuento se aplicará automáticamente en el checkout. ¡No te pierdas esta oportunidad de ahorrar en tu cuidado capilar!"
        },
    ];




    return (
        <div className="body-view">
            <Container>
                <Row>
                    <Col lg={1}>
                        <img onClick={() => history.goBack()} src={iconoAtras} alt="Icono de atras" style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }} />
                    </Col>
                    <Col lg={2}>
                        <h1 className="title-Products">Descuentos</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className='description-Products'>
                        <p className="paragraf-products">A continuación se mostrará los diferentes descuentos, con su respectiva fecha de vigencia y su descripción o condición para poder participar de ella</p>
                        <Button className='buttoncrear-discounts' href='/setDiscounts'>Crear descuento</Button>
                    </Col>
                </Row>


                <Row>

                    {informationCards.map((event, index) => {
                        return (
                            // <Col lg={4} className="mt-4 d-flex">
                            <Col lg={4} className="d-flex flex-column  align-items-center"
                                style={{
                                    display: "flex",
                                    paddingTop: "40px",
                                    paddingBottom: "10px"
                                }}
                            >
                                <Card style={{ width: "18rem", borderRadius: "20px" }}>
                                    <Card.Header className="borderRadiusCardHeaderMenu mb-0" 
                                    style={{

                                        display: "flex"

                                    }}>
                                        <Card.Title
                                            variant="top"
                                            className="mt-4 mb-1 ml-20"
                                            style={{
                                                marginRight:"120px",
                                                marginLeft:"35px",
                                                
                                                fontWeight: "700",
                                                fontSize: "30px",
                                                lineHeight: "36px",
                                                display: "flex"

                                            }}
                                        > {event.title} </Card.Title>
                                        <Card.Link
                                            className="ml-10 mt-3 mb-2"
                                            href={event.url1}
                                            style={{ textAlign: "initial" }}
                                        >
                                            <img src={setImg} />
                                        </Card.Link>
                                        <Card.Link
                                        className="ml-10 mt-3 mb-2"
                                            href={event.url2}
                                            style={{ textAlign: "initial" }}
                                        >
                                            <img src={deleteImg} />
                                        </Card.Link>


                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title className="styleTitleCardMenu mb-0"
                                            style={{ textAlign: "center", fontSize: "16px", color: "#000000" ,
                                            fontFamily: 'Inter'
                                            }}>

                                            {event.fecha}
                                        </Card.Title>
                                    </Card.Body>
                                    <Card.Body style={{ paddingTop: "0px" }}>
                                        <Card.Text

                                            style={{ textAlign: "center", fontSize: "10px" }}
                                        > {event.descripcion}</Card.Text>


                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}


                </Row>



            </Container>


        </div >

    );
}
export default Discounts;