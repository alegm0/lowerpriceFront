/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Accordion, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import iconoAtras from "../../assets/img/icono-atras.svg";
import { MDBCol, MDBInput } from "mdbreact";
import { useEffect } from "react";
import axios from "axios";
import { urlRequest } from "../../urlRequest";
import referencia from "../../assets/img/referencia.png";

function ReportList() {
  const history = useHistory();
  const [report, setReport] = useState();
  const [id] = useState(localStorage.getItem("id") || '');

  useEffect(() => {
    getShoppingList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getShoppingList = () => {
    axios
      .get(`${urlRequest}/comparison-list/report/${id}`)
      .then(function (response) {
        setReport(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const faqData = [
    {
      question: "¿Cómo puedo registrarme en el sitio?",
      answer:
        "Puedes registrarte haciendo clic en el enlace 'Registrarse' en la parte superior derecha de la página. Luego, completa el formulario de registro con tu información personal y crea una contraseña.",
    },
    {
      question: "¿Olvidé mi contraseña, cómo puedo restablecerla?",
      answer:
        "Si olvidaste tu contraseña, puedes restablecerla haciendo clic en el enlace en la página de inicio de sesión. Se te pedirá que proporciones tu dirección de correo electrónico asociada con tu cuenta y recibirás un enlace para restablecer tu contraseña.",
    },
    {
      question: "¿Cómo puedo contactar al servicio de atención al cliente?",
      answer: "Puedes escribir un correo al soporte@lowerprice.com",
    },
    {
      question: "¿Cómo puedo agregar un producto a mi lista de deseos?",
      answer:
        "Para agregar un producto a tu lista de deseos, primero asegúrate de haber iniciado sesión en tu cuenta. Luego, navega por  el modulo de productos y haz clic en el icono de lista que se encuentra junto al producto que deseas comprar.",
    },
    {
      question: "¿Cómo funciona la comparativa de precios en el sitio?",
      answer:
        "Puedes comparar una amplia variedad de productos en nuestro sitio, incluyendo electrónicos, ropa, electrodomésticos, productos para el hogar, artículos deportivos y mucho más. Nuestro objetivo es ofrecer una amplia gama de opciones para que encuentres el producto adecuado al mejor precio.",
    },
    {
      question:
        "¿Cuánto tiempo tarda en actualizarse la información de precios en el sitio?",
      answer:
        "Nos esforzamos por mantener la información de precios lo más actualizada posible. Nuestro sistema se actualiza regularmente para reflejar los cambios de precios en las tiendas en línea. Sin embargo, ten en cuenta que los precios pueden variar y es posible que encuentres diferencias entre el momento en que ves un precio en nuestro sitio y el momento en que accedes a la tienda en línea para realizar la compra.",
    },
    {
      question:
        "¿Qué debo hacer si encuentro un precio incorrecto en la comparativa?",
      answer:
        "Si encuentras un precio incorrecto en nuestra comparativa, te recomendamos verificar la información directamente en la tienda en línea correspondiente. Los precios pueden cambiar rápidamente, y es posible que hayamos recopilado datos desactualizados. También puedes informarnos sobre el error para que podamos corregirlo lo antes posible y brindar una experiencia de comparativa más precisa a nuestros usuarios.",
    },

    // Agrega más objetos al arreglo para más preguntas frecuentes
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const toggleAccordion = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="body-view">
      <Container>
        <Row>
          <Col lg={1} className="mt-0">
            <img
              onClick={() => history.goBack()}
              src={iconoAtras}
              alt="Icono de atras"
              style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }}
            />
          </Col>
          <Col lg={11}>
            <p className="title-Products">Reporte de lista de deseos</p>
          </Col>
        </Row>
        <Row>
          <Col className="description-Products">
            <p className="paragraf-products">
              A continuación encontrarás los diferentes tab, los cuales tendrá
              la información completa de las diferentes listas creadas
            </p>
          </Col>
        </Row>
        <h1 className="subtitle">Listas creadas anteriormente:</h1>
        <Row>
          {report?.map((faq, index) => {
            if (
              searchKeyword === "" ||
              faq.question.toLowerCase().includes(searchKeyword.toLowerCase())
            ) {
              return (
                <div
                  className="related-questions "
                  style={{ width: "100%", paddingBottom: "10px" }}
                  key={index}
                >
                  <Col style={{ display: "flex" }}>
                    <button
                      className="accordion-button"
                      style={{
                        alignItems: "initial",
                        width: "100%",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        borderColor: "none",
                        fontSize:"20px",
                        height: "100%",
                      }}
                      onClick={() => toggleAccordion(index)}
                    >
                      {faq.name_list} / {faq.estimated_price.toLocaleString()}
                    </button>
                  </Col>
                  {expandedIndex === index && (
                    <div className="accordion-content mr-3 ml-3" style={{backgroundColor:"#ffffff70"}}>
                      <Row>
                      {faq.shopping_list_products?.map((shopping, index) => (
                        <Col
                          lg={4}
                          md={6}
                          sm={11}
                          className="d-flex flex-column  align-items-center mb-3"
                          style={{
                            display: "inline",
                            paddingTop: "40px",
                            paddingBottom: "10px",
                          }}
                          key={shopping.id}
                        >
                          <Card
                            style={{ width: "18rem", borderRadius: "20px" }}
                            className="col-lg-12 col-md-12 col-sm-12"
                          >
                            <Card.Header className="borderRadiusCardHeaderMenu">
                              <Card.Img
                                variant="top"
                                className="mt-3 mb-3 styleImgCardHomeIn"
                                src={referencia}
                                style={{ width: "100%" }}
                              />
                            </Card.Header>
                            <Card.Body>
                              <Card.Title
                                className="styleTitleCardMenu"
                                style={{ fontSize: "16px" }}
                              >
                                {shopping.product.name}
                              </Card.Title>
                              <Card.Text>{shopping.product.quantity}</Card.Text>
                              <Card.Text className="mt-lg-3">
                                {" "}
                                <p>
                                  ${" "}
                                  {shopping.product.unit_cost
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </p>{" "}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                      </Row>
                    </div>
                  )}
                </div>
              );
            }
            return <></>
          })}
        </Row>
      </Container>
    </div>
  );
}
export default ReportList;
