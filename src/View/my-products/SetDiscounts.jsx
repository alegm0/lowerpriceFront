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

function SetDiscounts() {
    // const [selectedDate, setSelectedDate] = useState(null);

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDateFinal, setSelectedDateFinal] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const history = useHistory();
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
                        <p className="paragraf-products">Para poder crear/editar un descuento debe llenar todos los espacios que contengan (*)</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h1 className="second-Title">Valor(*)</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese su correo electronico"
                            name="email"

                        />
                        <h1 className="second-Title">Fecha final(*)</h1>

                        <DatePicker
                            selected={selectedDateFinal}
                            className="inputDiscounts"
                            onChange={date => setSelectedDateFinal(date)}

                        />

                    </Col>

                    <Col>
                        <h1 className="second-Title">Fecha inicial(*)</h1>
                        <DatePicker
                            selected={selectedDate}
                            className="inputDiscounts"
                            onChange={date => setSelectedDate(date)}

                        />
                        <h1 className="second-Title">Condiciones</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese las condiciones"
                            name="email"
                            style={{
                                height:
                                "200px",
                                textAlign:"start",
                                position: "relative"
                                              }}

                        />

                    </Col>
                </Row>
                <Row>
                <Button className='buttonSave' href='/discounts'>Guardar</Button>

          
                </Row>




            </Container>
        </div>

    );
}
export default SetDiscounts;