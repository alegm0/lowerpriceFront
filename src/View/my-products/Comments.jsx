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
import 'react-datepicker/dist/react-datepicker.css'

function Comments() {

    const history = useHistory();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (

        <div className="body-view">
            <Container>
                <Row>
                    <Col lg={1}>
                        <img onClick={() => history.goBack()} src={iconoAtras} alt="Icono de atras" style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }} />
                    </Col>
                    <Col lg={2}>
                        <h1 className="title-Products">Comentarios</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className='description-Products'>
                        <p className="paragraf-products">Para poder crear/editar un comentario debe llenar todos los espacios que contengan (*) (*)</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="second-Title">Producto(*)</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese el producto"
                            name="email"

                        />
                        <h1 className="second-Title">Valoracion(*)</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese su valoracion"
                            name="email"

                        />
                        <h1 className="second-Title">Titulo(*)</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese el titulo"
                            name="email"

                        />


                    </Col>

                    <Col>

                        <h1 className="second-Title">Nombre de usuario(*)</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese su nombre"
                            name="email"

                        />




                        <h1 className="second-Title">Fecha inicial(*)</h1>
                        <DatePicker
                            selected={selectedDate}
                            className="inputDiscounts"
                            onChange={date => setSelectedDate(date)}

                        />

                        <h1 className="second-Title">Numero de contacto</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Numero de contacto"
                            name="email"

                        />

                    </Col>

                </Row>
                <h1 className="second-Title">Descripcion del comentario</h1>
                <input
                    className="inputDiscounts"
                    type="text"
                    placeholder="Ingrese una descripcion del comentario"
                    name="email"
                    style={{
                        height:
                            "200px",
                        width: "1000px",
                        textAlign: "start",
                        position: "relative"
                    }}

                />

                <Row>
                    <Button className='buttonSave' href='/create-products'>Guardar</Button>
                </Row>





            </Container>
        </div>

    );
}
export default Comments;