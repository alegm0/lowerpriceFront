import React from "react";
import { useHistory } from "react-router";
import { Card, Col, Container, Row } from "react-bootstrap";
import MyProducts from "../../assets/img/products-mine.png";
import AddProducts from "../../assets/img/add-product.png";
import MySales from "../../assets/img/my-sales.png";

import "../../App.css";

function ShoppingList() {
    const history = useHistory();
  const informationCards = [
    {
      img: MyProducts,
      title: "Mis productos",
      text: "Aqui podras consultar tus productos publicados",
      url: "/my-products",
    },
    {
      img: AddProducts,
      title: "Añadir productos",
      text: "Aqui podras añadir productos y publicarlos para la venta",
      url: "/create-product",
    },
    {
      img: MySales,
      title: "Mis ventas",
      text: "Aqui podras consultar tu historial de ventas realizadas",
      url: "#",
    },
  ];

  return (
    <div className="pt-5 ml-5" style={{ height: "91vh" }}>
      <Container className="margin-top-for-all">
        <Row>
          <Col lg={12}>
            <h1 className="titleHomeIn ">Opciones</h1>
          </Col>
          {informationCards.map((event, index) => {
            return (
              <Col lg={4} className="mt-4 d-flex">
                <Card style={{ width: "18rem", borderRadius: "20px" }}>
                  <Card.Header className="borderRadiusCardHeader">
                    <Card.Img
                      variant="top"
                      className="mt-3 mb-3 styleImgCardHomeIn"
                      src={event.img}
                      style={{
                        width:
                          index === 1 ? "6.2rem" : index === 2 ? "9.8rem" : "",
                      }}
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "40%",
          margin: "auto",
        }}
      >
        <button
          className="button-red btn-finish"
          onClick={() => history.goBack()}
        >
          ATRÁS
        </button>
      </div>
    </div>
  );
}

export default ShoppingList;
