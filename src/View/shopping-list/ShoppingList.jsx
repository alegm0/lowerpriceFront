import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import MyProducts from "../../assets/img/products-mine.png";
import AddProducts from "../../assets/img/add-product.png";
import MySales from "../../assets/img/my-sales.png";
import check from "../../assets/img/check.svg";
import uncheck from "../../assets/img/uncheck.svg";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import list from "../../assets/img/icono-lista.png";
import report from "../../assets/img/icono-reporte.png";

import "../../App.css";
import axios from 'axios';
import { urlRequest } from '../../urlRequest';
import deleteImg from "../../assets/img/deleteProduct.svg";
import referencia from "../../assets/img/referencia.png";

function ShoppingList() {
  const history = useHistory();
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


  const informationCards1 = [
    {
      id:1,
      img: referencia,
      name: "Producto",
      cantidad: "2",
      precio: "70000",
      fecha: "24/01/23"


    },
    {
      id:2,
      img: referencia,
      name: "nombre del producto",
      cantidad: "2",
      precio: "70000",
      fecha: "24/01/23"


    },

  ];

  const [check, setCheck] = useState({});

  const marcarProductoComprado = (id) => {
    setCheck((prevCheck) => ({
      ...prevCheck,
      [id]: !prevCheck[id]
    }));
  };
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  useEffect(() => {
    // Aquí realizarías la llamada a la API para obtener los productos favoritos
    axios
      .get(`${urlRequest}/product/list`)
      .then(function (response) {
        const productsWithFavorites = response.data.data.filter(
          (product) => product.isFavorite === true
        );
        setFavoriteProducts(productsWithFavorites);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
