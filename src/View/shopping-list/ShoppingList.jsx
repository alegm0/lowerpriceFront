import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import list from "../../assets/img/icono-lista.png";
import report from "../../assets/img/icono-reporte.png";

import "../../App.css";

function ShoppingList() {
  const informationCards = [
    {
      img: list,
      title: "Lista de deseos",
      text: "Aqui podras añadir productos para crear tu lista de deseos",
      url: "/wish-list",
    },
    {
      img: report,
      title: "Reportes",
      text: "Aqui podras consultar tu historial de lista de deseos",
      url: "/report-list",
    },
  ];

  return (
    <div className="body-view">
    <Container>
      <Row >
        <Col lg={11} md={11} sm={11}>
          <h1 className="title-marks-my-products" style={{ position: "initial",paddingLeft:"0px" }}>Menú</h1>
        </Col>
      </Row>
      <Row lg={11} md={1} sm={1}>
        <Col>
          <p className="paragraph2">A continuación se mostrará las diferentes elecciones, que usted podra tomar, con el fin de que conozca todas las opciones con respecto a la lista de deseos</p>
        </Col>
      </Row>
      <Row>
        {informationCards.map((event) => {
          return (
            <Col className="d-flex flex-column  align-items-center" style={{ display: "inline", paddingBottom: "80px" }}>
              <Card style={{ width: "18rem", borderRadius: "20px" }}>
                <Card.Header className="borderRadiusCardHeaderMenu">
                  <Card.Img
                    variant="top"
                    className="mt-3 mb-3 styleImgCardHomeIn"
                    src={event.img}
                  />
                </Card.Header>
                <Card.Body>
                  <Card.Title className="styleTitleCardMenu" >
                    {event.title}
                  </Card.Title>
                  <Card.Text className="styleSubTitleCardMenu">
                    {event.text}
                  </Card.Text>
                </Card.Body>
                <Card.Body style={{ paddingTop: "0px" }}>
                  <Card.Link
                    href={event.url}
                    style={{ textAlign: "center", textDecoration: "underline", color: "#137EBA", fontSize: "16px" }}
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

export default ShoppingList;
