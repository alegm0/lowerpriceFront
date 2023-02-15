import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../App.css";
import ImgLista from "../assets/img/home-ico-lista.svg";
import ImgShop from "../assets/img/img-shop.svg";
import ImgSales from "../assets/img/img-sales.svg";

function HomeIn() {
  const informationCards = [
    {
      img: ImgLista,
      title: "Wishlist",
      text: "Te redirigiremos la visual donde esta tu wishlist ",
      url: "/wishlist",
    },
    {
      img: ImgShop,
      title: "Tienda",
      text: "Te redirigiremos la visual donde podras explorar los diferentes productos para ti",
      url: "#",
    },
    {
      img: ImgSales,
      title: "Ventas",
      text: "Te redirigiremos la visual donde podras agregar productos para la venta y consultarlos",
      url: "/shopping-list",
    },
  ];

  return (
    <div className="pt-5 ml-5" style={{ height: "91vh" }}>
      <Container className="margin-top-for-all">
        <Row>
          <Col lg={12}>
            <h1 className="titleHomeIn ">¡Bienvenido!</h1>
            <p className="subtitleHomeIn ">
              MBShop, tiene diferentes opciones, las cuales son:{" "}
            </p>
          </Col>
          {informationCards.map((event, index) => {
            return (
              <Col lg={4} className="mt-4 d-flex" key={index}>
                <Card style={{ width: "18rem", borderRadius: "20px" }}>
                  <Card.Header className="borderRadiusCardHeader">
                    <Card.Img
                      variant="top"
                      className={`mt-3 mb-3 ${index === 1 ? 'styleImgSecondCardHomeIn' : 'styleImgCardHomeIn'}`}
                      src={event.img}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="styleTitleCard">
                      {event.title}
                    </Card.Title>
                    <Card.Text className="styleSubTitleCard">
                      {event.text}
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Card.Link
                      href={event.url}
                      style={{ textAlign: "initial" }}
                    >
                      Comienza aqui
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

export default HomeIn;
