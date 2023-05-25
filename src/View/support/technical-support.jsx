import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Col, Container, Row } from "react-bootstrap";
import iconoAtras from '../../assets/img/icono-atras.svg';
//import abajo from '../../assets/img/down.png';
import { MDBInput, MDBCol } from "mdbreact";

function Technical_support() {
    const history = useHistory();
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
            answer:
                "Puedes escribir un correo al soporte@lowerprice.com",
        },
        {
            question: "¿Cómo puedo agregar un producto a mi lista de deseos?",
            answer:
                "Para agregar un producto a tu lista de deseos, primero asegúrate de haber iniciado sesión en tu cuenta. Luego, navega por  el modulo de productos y haz clic en el icono de lista que se encuentra junto al producto que deseas comprar.",
        },
        {
            question: "¿Cómo funciona la comparativa de precios en el sitio?",
            answer: "Puedes comparar una amplia variedad de productos en nuestro sitio, incluyendo electrónicos, ropa, electrodomésticos, productos para el hogar, artículos deportivos y mucho más. Nuestro objetivo es ofrecer una amplia gama de opciones para que encuentres el producto adecuado al mejor precio.",
        },
        {
            question: "¿Cuánto tiempo tarda en actualizarse la información de precios en el sitio?",
            answer: "Nos esforzamos por mantener la información de precios lo más actualizada posible. Nuestro sistema se actualiza regularmente para reflejar los cambios de precios en las tiendas en línea. Sin embargo, ten en cuenta que los precios pueden variar y es posible que encuentres diferencias entre el momento en que ves un precio en nuestro sitio y el momento en que accedes a la tienda en línea para realizar la compra.",
        },
        {
            question: "¿Qué debo hacer si encuentro un precio incorrecto en la comparativa?",
            answer: "Si encuentras un precio incorrecto en nuestra comparativa, te recomendamos verificar la información directamente en la tienda en línea correspondiente. Los precios pueden cambiar rápidamente, y es posible que hayamos recopilado datos desactualizados. También puedes informarnos sobre el error para que podamos corregirlo lo antes posible y brindar una experiencia de comparativa más precisa a nuestros usuarios.",
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
                        <img onClick={() => history.goBack()} src={iconoAtras} alt="Icono de atras" style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }} />
                    </Col>
                    <Col lg={11}>
                        <p className="title-Products">Soporte tecnico</p>
                    </Col>
                </Row>
                <Row>
                    <Col className='description-Products'>
                        <p className="paragraf-products">Nuestro módulo de preguntas frecuentes está diseñado para brindarte respuestas rápidas y claras a las dudas más comunes que puedas tener. Hemos recopilado una lista exhaustiva de preguntas y respuestas sobre nuestros productos, servicios y políticas para proporcionarte la información que necesitas de manera práctica y accesible.</p>
                    </Col>
                </Row>
                <Row>
                    <h1 className='subtitle'> ¿Con qué podemos ayudarte?</h1>

                    <MDBCol md="12">
                        <MDBInput hint="Ingresa una referencia" type="text" containerClass="mt-0" value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}  style={{

                                borderColor: "black",
                                borderRadius: "10px",
                                height: "70px"

                            }} />
                    </MDBCol>

                </Row>
                <h1 className='subtitle'> Preguntas frecuentes</h1>

                <Row>
                    {faqData.map((faq, index) => {
                        if (
                            searchKeyword === "" ||
                            faq.question.toLowerCase().includes(searchKeyword.toLowerCase())
                        ) {
                            return (
                                <div className="related-questions " style={{ width: "100%", paddingBottom: "10px" }} key={index}>
                                    <Col style={{ display: "flex" }}>
                                        <button
                                            className="accordion-button"
                                            style={{
                                                alignItems: "initial",
                                                width: "100%",
                                                backgroundColor: "white",
                                                borderRadius: "10px",
                                                borderColor: "none",


                                                height: "70px",
                                            }}
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            {faq.question}
                                            {/* <img src={abajo} style={{}} /> */}
                                        </button>
                                        {/* <img src={abajo} style={{ display: "flex", height: "40px", marginTop: "20px" }} /> */}
                                    </Col>
                                    {expandedIndex === index && (
                                        <div className="accordion-content">
                                            <ul style={{ color: "white" }} >
                                                <li>{faq.answer}</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        }
                    })}
                </Row>



            </Container>
        </div>




    );

}
export default Technical_support;