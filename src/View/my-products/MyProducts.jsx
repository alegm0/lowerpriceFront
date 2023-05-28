import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./MyProducts.css";

import DiscountImg from "../../assets/img/navbar/discount.svg";
import CommentsImg from "../../assets/img/navbar/comentarios.svg";
import ProductosImg from "../../assets/img/navbar/productos.svg";

function MyProducts() {
  const [informationCard, setInformationCard] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("role") === "2") {
      setInformationCard([
        {
          img: DiscountImg,
          title: "Descuentos",
          text: "Si deseas conocer los diferentes descuentos que tiene algunos productos",
          url: "/discounts",
        },
        {
          img: ProductosImg,
          title: "Productos",
          text: "Si deseas conocer los productos o agregar uno nuevo",
          url: "/products",
        },
      ]);
    } else {
      setInformationCard([
        {
          img: CommentsImg,
          title: "Comentarios",
          text: "Si deseas conocer o agregar un comentario ",
          url: "/comments",
        },
        {
          img: ProductosImg,
          title: "Productos",
          text: "Si deseas conocer los productos o agregar uno nuevo",
          url: "/products",
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="body-view">
      <Container>
        <Row>
          <Col lg={11} md={11} sm={11}>
            <h1
              className="title-marks-my-products"
              style={{ position: "initial", paddingLeft: "0px" }}
            >
              Menú
            </h1>
          </Col>
        </Row>
        <Row lg={11} md={1} sm={1}>
          <Col>
            <p className="paragraph2">
              A continuación se mostrará las diferentes elecciones, que usted
              podra tomar, con el fin de que conozca todas las opciones con
              respecto a los productos
            </p>
          </Col>
        </Row>
        <Row>
          {informationCard.map((event, index) => {
            return (
              <Col
                className="d-flex flex-column  align-items-center"
                style={{ display: "inline", paddingBottom: "80px" }}
              >
                <Card style={{ width: "18rem", borderRadius: "20px" }}>
                  <Card.Header className="borderRadiusCardHeaderMenu">
                    <Card.Img
                      variant="top"
                      className="mt-3 mb-3 styleImgCardHomeIn"
                      src={event.img}
                      style={{
                        width:
                          index === 0
                            ? "6.2rem"
                            : index === 1
                            ? "7.2rem"
                            : index === 2
                            ? "5.2rem"
                            : "",
                      }}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="styleTitleCardMenu">
                      {event.title}
                    </Card.Title>
                    <Card.Text className="styleSubTitleCardMenu">
                      {event.text}
                    </Card.Text>
                  </Card.Body>
                  <Card.Body style={{ paddingTop: "0px" }}>
                    <Card.Link
                      href={event.url}
                      style={{
                        textAlign: "center",
                        textDecoration: "underline",
                        color: "#137EBA",
                        fontSize: "16px",
                      }}
                    >
                      Ingresa aqui
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default MyProducts;
