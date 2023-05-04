import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { urlRequest } from "../../urlRequest";
import iconoAtras from '../../assets/img/icono-atras.svg';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function SetDiscounts() {

    const FORMAT = "dd-MM-yyyy"

    const validateInputs = {
        start_date: false,
        finish_date: false,
        value: false
    }
    const history = useHistory();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDateFinal, setSelectedDateFinal] = useState(new Date());
    const [errorsInputs, setErrorsInputs] = useState({ ...validateInputs });
    const [discounts, setDiscounts] = useState({
        start_date: moment(selectedDate).format('YYYY-MM-DD'),
        finish_date: moment(selectedDateFinal).format('YYYY-MM-DD'),
        value: '',
        conditions: ''
    });

    const handleSelectedDateChange = (e, name) => {
        if (name === 'start_date') {
            setSelectedDate(e);
        }else {
            setSelectedDateFinal(e);
        }
        setDiscounts({ ...discounts, [name]: moment(e).format('YYYY-MM-DD') });
    };

    const onChange = (e) => {
        setDiscounts({ ...discounts, [e.target.name]: e.target.value });
    }

    const validate = () => {

        const errors = { ...validateInputs };

        Object.keys(errors).forEach((e) => {
            errors[e] = !discounts[e] ? '*Campo es obligatorio' : '';
        });


        setErrorsInputs(errors);
        return Object.values(errors).some(x => x);
    }


    //aaaaaaaaa
    const onSubmit = () => {
        if (!validate()) {
            axios.post(`${urlRequest}/discount-promotions`, discounts)
                .then(function (response) {
                    if (response.status === 201) {
                        history.push('/discounts');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
          
        }
    };


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
                    <div className="form-group">
                        <h1 className="second-Title">Valor(*)</h1>
                        <input
                            className="inputDiscounts"

                            type="number"
                            placeholder="Ingrese el valor"
                            name="value"
                            value={discounts.value}
                            onChange={(e) => onChange(e)}

                        />
                        {errorsInputs.value && <span className="text-validate">{errorsInputs.value}</span>}
                        </div>
                        <div className="form-group">
                        <h1 className="second-Title">Fecha final(*)</h1>

                        <DatePicker
                            name="finish_date"
                            selected={selectedDateFinal}
                            className="inputDiscounts"
                            dateFormat={FORMAT}
                            value={discounts.finish_date}
                            onChange={(e) => handleSelectedDateChange(e, 'finish_date')}
                        />
                        {errorsInputs.finish_date && <span className="text-validate">{errorsInputs.finish_date}</span>}
                        </div>
                    </Col>

                    <Col>
                        <h1 className="second-Title">Fecha inicial(*)</h1>
                        <DatePicker
                            selected={selectedDate}
                            className="inputDiscounts"
                            onChange={(e) => handleSelectedDateChange(e, 'start_date')}
                            name="start_date"
                            dateFormat={FORMAT}
                            value={discounts.start_date}
                        />
                        {errorsInputs.start_date && <span className="text-validate">{errorsInputs.start_date}</span>}
                        <h1 className="second-Title">Condiciones</h1>
                        <input
                            className="inputDiscounts"
                            type="text"
                            placeholder="Ingrese las condiciones"
                            name="conditions"


                            style={{
                                height:
                                    "200px",
                                textAlign: "start",
                                position: "relative"
                            }}
                            value={discounts.conditions}
                            onChange={(e) => onChange(e)}

                        />
                        {errorsInputs.conditions && <span className="text-validate">{errorsInputs.conditions}</span>}

                    </Col>
                </Row>
                <Row>
                    <Button
                        type="submit"
                        className='buttonSave'
                        onClick={onSubmit}
                    >Guardar</Button>


                </Row>




            </Container>
        </div>

    );
}
export default SetDiscounts;