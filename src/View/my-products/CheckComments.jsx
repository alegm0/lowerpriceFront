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
import DatePicker from 'react-datepicker'
import DiscountImg from '../../assets/img/navbar/discount.svg';
import 'react-datepicker/dist/react-datepicker.css'
import { FaStar } from "react-icons/fa"

const colors = {
   negro: "#000000",
   blanco: "#FFFFFF"

};
function CheckComments() {
    const history = useHistory();
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    const informationCards = [
        {

            title: "Excelente",
            rate: "5",
            fecha: "20/02/2022",
            name: "Pepito Perez",
            text: "¡Aprovecha nuestra promoción de 2x1 en shampoo! Compra un shampoo y obtén otro gratis. Solo tienes que agregar dos unidades de shampoo a tu carrito y el descuento se aplicará automáticamente en el checkout. ¡No te pierdas esta oportunidad de ahorrar en tu cuidado capilar!",

        },

        {

            title: "Pesimo",
            rate: "1",
            fecha: "20/02/2022",
            name: "Pepito Perez",
            text: "¡Aprovecha nuestra promoción de 2x1 en shampoo! Compra un shampoo y obtén otro gratis. Solo tienes que agregar dos unidades de shampoo a tu carrito y el descuento se aplicará automáticamente en el checkout. ¡No te pierdas esta oportunidad de ahorrar en tu cuidado capilar!",

        },
    ];



    return (

        <div className="body-view">
            <Container>
                <Row>
                    <Col lg={1}>
                        <img onClick={() => history.goBack()} src={iconoAtras} alt="Icono de atras" style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }} />
                    </Col>
                    <Col lg={11}>
                        <p className="title-Products">Comentarios</p>
                    </Col>
                </Row>
                <Row>
                    <Col className='description-Products'>
                        <p className="paragraf-products">A continuación se muestra la información del producto, adicionalmente sus comentarios y sus calificaciones, al igual que una calificación promedio</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={5}>
                        <p className='subtitle'>Informacion del producto</p>
                    </Col>
                    <Col lg={7}>
                        <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <p className="title-inputs mt-4 ml-2">Nombre del producto(*)</p>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese el producto"
                            name="email"
                        />
                    </Col>
                    <Col lg={6}>
                        <p className="title-inputs mt-4 ml-2">Marca del producto(*)</p>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese su valoracion"
                            name="email"

                        />

                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <p className="title-inputs mt-4 ml-2">Costo del producto(*)</p>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese su nombre"
                            name="email"
                        />
                    </Col>
                    <Col lg={6}>
                        <p className="title-inputs mt-4 ml-2">Categoria del producto(*)</p>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese su nombre"
                            name="email"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                    <p className="title-inputs mt-4 ml-2">Descripcion del comentario</p>
                    <textarea
                        name="text"
                        cols="80"
                        rows="5"
                        placeholder="Ingrese una descripcion"
                        className="textarea-product"
                        style={{
                            height: "80%",
                            width: "100%",
                            textAlign: "start",
                            position: "relative",
                            marginBottom: "30px",
                            borderRadius: "15px !important"
                        }}
                    />
                    </Col>
                </Row>
                <Row>
                    <Col lg={2}>
                        <p className='subtitle'>Comentarios</p>
                    </Col>
                    <Col lg={10}>
                        <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
                    </Col>
                </Row>
                <Row>
                    <Col lg={2}>
                        <p className="calificacion">3.7</p>
                    </Col>
                    <Col style={styles.stars} lg={10}>
                        {stars.map((_, index) => {
                            return (
                                <FaStar
                                    key={index}
                                    size={70}
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    color={(4 || 5) > index ? colors.negro : colors.blanco}
                                    style={{
                                        marginRight: 10,
                                        cursor: "pointer"
                                    }} />
                            )
                        })}
                    </Col>

                </Row>
                <Row>
                    {informationCards.map((event, index) => {
                        return (
                            <Col className="d-block block-column  align-items-left"
                                style={{
                                    display: "none",
                                    paddingBottom: "0px"
                                }}
                            >

                                <Card style={{ width: "56rem", borderRadius: "0px" }}>
                                    <Card.Header className="borderRadiusCardHeaderMenu" style={{ marginBottom: "0px", display: "flex" }} >
                                      
                                            
                                            <Card.Title className="styleTitleCardComments" >
                                              
                                                {event.title}
                                                
                                            </Card.Title>
                                            

                                            <Card.ImgOverlay style={{ paddingTop:"0px", paddingLeft:"850px", alignItems: "end" }}>

                                                    {stars.map((_, index) => {
                                                        return (
                                                            <FaStar
                                                                key={index}
                                                                size={30}
                                                                onClick={() => handleClick(index + 1)}
                                                                onMouseOver={() => handleMouseOver(index + 1)}
                                                                onMouseLeave={handleMouseLeave}
                                                                color={(event.rate || 5) > index ? colors.negro : colors.blanco}
                                                                // color={(hoverValue || currentValue) > index ? colors.negro : colors.blanco}
                                                                style={{
                                                                    marginRight: 10,
                                                                    cursor: "pointer"
                                                                }} />
                                                        )
                                                    })}
                                            

                                            </Card.ImgOverlay>
                                       

                                    </Card.Header>
                                    <Card.Body style={{ paddingTop: "0px", paddingBottom: "15px" }}>

                                        <Card.Text className="styleSubTitleCardComments">
                                            {event.fecha}
                                        </Card.Text>

                                    </Card.Body>
                                    <Card.Body style={{ paddingTop: "0px", paddingBottom: "1px" }}>

                                        <Card.Text className="styleSubTitleCardComments">
                                            {event.name}
                                        </Card.Text>

                                    </Card.Body>
                                    <Card.Body style={{ paddingTop: "20px" }}>

                                        <Card.Text className="styleSubTitleCardComments">
                                            {event.text}
                                        </Card.Text>

                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}

                </Row>


            </Container>
        </div >

    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        paddingTop: "200px"

    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 100,
        width: 300
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10,
    }

};
export default CheckComments;