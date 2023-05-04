import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { urlRequest } from "../../urlRequest";
import iconoAtras from '../../assets/img/icono-atras.svg';
import setImg from "../../assets/img/setProduct.svg";
import deleteImg from "../../assets/img/deleteProduct.svg";

function Discounts() {

    const history = useHistory();

    const [discounts, setDiscounts] = useState([]);

    useEffect(() => {
        getListDiscounts();
    }, []);

    const getListDiscounts = () => {
        axios.get(`${urlRequest}/discount-promotions`, [])
        .then(function (response) {
            setDiscounts(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    } 

    return (
        <div className="body-view">
            <Container>
                <Row>
                    <Col lg={1} className="pt-3">
                        <img onClick={() => history.goBack()} src={iconoAtras} alt="Icono de atras" style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }} />
                    </Col>
                    <Col lg={11}>
                        <h1 className="title-Products">Descuentos</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg={9} className='description-Products'>
                        <p className="paragraf-products">A continuación se mostrará los diferentes descuentos, con su respectiva fecha de vigencia y su descripción o condición para poder participar de ella</p>
                    </Col>
                    <Col lg={3}>
                        <Button className="button-purple-home mb-3" href='/setDiscounts' style={{paddingTop:"6%", fontSize:"24px"}}>Crear descuento</Button>
                    </Col>
                </Row>


                <Row>
                    {discounts.map((discount) => {
                        return (
                            <Col lg={4} className="d-flex flex-column  align-items-center"
                                style={{
                                    display: "flex",
                                    paddingTop: "40px",
                                    paddingBottom: "10px"
                                }}>
                                <Card style={{ width: "18rem", borderRadius: "20px" }}>
                                    <Card.Header className="borderRadiusCardHeaderMenu mb-0"
                                        style={{display: "flex"}}>
                                        <Card.Title
                                            variant="top"
                                            className="mt-4 mb-1 ml-20"
                                            style={{
                                                marginRight: "120px",
                                                marginLeft: "35px",
                                                fontWeight: "700",
                                                fontSize: "30px",
                                                lineHeight: "36px",
                                                display: "flex",
                                                width:"8%"
                                            }}
                                        > {discount.value}% </Card.Title>
                                        <Card.Link
                                            className="ml-10 mt-3 mb-2"
                                            href={"/my-products"}
                                            style={{ textAlign: "initial" }}>
                                            <img src={setImg} alt='Imagen edit'/>
                                        </Card.Link>
                                        <Card.Link
                                            className="ml-10 mt-3 mb-2"
                                            href={"/my-products"}
                                            style={{ textAlign: "initial" }}>
                                            <img src={deleteImg} alt='Imagen delete' />
                                        </Card.Link>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title className="styleTitleCardMenu mb-0"
                                            style={{
                                                textAlign: "center", fontSize: "16px", color: "#000000",
                                                fontFamily: 'Inter'
                                            }}> {discount.start_date} -{discount.finish_date}
                                        </Card.Title>
                                    </Card.Body>
                                    <Card.Body style={{ paddingTop: "0px" }}>
                                        <Card.Text

                                            style={{ textAlign: "center", fontSize: "10px" }}
                                        > {discount.conditions}</Card.Text>
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