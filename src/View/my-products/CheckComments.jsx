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
    orange: "#000000",
    grey: "#FFFFFF"

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
            img: DiscountImg,
            fecha: "20/02/2022",
            name: "Pepito Perez",
            text: "¡Aprovecha nuestra promoción de 2x1 en shampoo! Compra un shampoo y obtén otro gratis. Solo tienes que agregar dos unidades de shampoo a tu carrito y el descuento se aplicará automáticamente en el checkout. ¡No te pierdas esta oportunidad de ahorrar en tu cuidado capilar!",

        },

        {

            title: "Pesimo",
            img: DiscountImg,
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
                        <h1 className="title-Products">Comentarios</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className='description-Products'>
                        <p className="paragraf-products">A continuación se muestra la información del producto, adicionalmente sus comentarios y sus calificaciones, al igual que una calificación promedio</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={5}>
                        <h1 className='subtitle'>Informacion del producto</h1>
                    </Col>
                    <Col lg={7}>
                        <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
                    </Col>
                </Row>



                <Row>
                    <Col>
                        <h1 className="second-Title">Nombre del producto(*)</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese el producto"
                            name="email"

                        />
                        <h1 className="second-Title">Marca del producto(*)</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese su valoracion"
                            name="email"

                        />


                    </Col>

                    <Col>

                        <h1 className="second-Title">Costo del producto(*)</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese su nombre"
                            name="email"

                        />


                        <h1 className="second-Title">Categoria del producto(*)</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese su nombre"
                            name="email"

                        />


                    </Col>

                </Row>
                <h1 className="second-Title">Descripcion del producto</h1>
                <input
                    className="inputDiscounts"
                    type="text"
                    placeholder="Ingrese una descripcion del comentario"
                    name="email"
                    style={{
                        height:
                            "80px",
                        width: "1000px",
                        textAlign: "start",
                        position: "relative",
                        marginBottom: "30px"
                    }}

                />


                <Row>
                    <Col lg={2}>
                        <h1 className='subtitle'>Comentarios</h1>
                    </Col>
                    <Col lg={10}>
                        <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <h1>4.7</h1>
                    </Col>
                    <Col style={styles.stars}>
                        {stars.map((_, index) => {
                            return (
                                <FaStar
                                    key={index}
                                    size={24}
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
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
                            // <Col lg={4} className="mt-4 d-flex">
                            <Col className="d-block block-column  align-items-left"
                                style={{
                                    display: "none",
                                    paddingBottom: "0px"
                                }}
                            >

                                <Card style={{ width: "53rem", borderRadius: "0px" }}>
                                    <Card.Header className="borderRadiusCardHeaderMenu" style={{ marginBottom: "0px" }} >
                                        <Card.Title className="styleTitleCardComments" >
                                            {event.title}
                                        </Card.Title>

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
        </div>

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