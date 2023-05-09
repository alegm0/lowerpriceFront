import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import iconoAtras from "../../assets/img/icono-atras.svg";
import "react-datepicker/dist/react-datepicker.css";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { urlRequest } from "../../urlRequest";
import axios from "axios";

const colors = {
  negro: "#000000",
  blanco: "rgb(237 231 231)",
};
function CheckComments() {
  const history = useHistory();
  const { state } = useLocation();
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      paddingTop: "200px",
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300,
    },
    button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
    },
  };
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [informationCards, setInformationCards] = useState({});
  const [informationProduct, setInformationProduct] = useState({});
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  // useEffect(() => {
  //   if (state?.id) getProduct(state.id);
  //   getCommentByProduct(state.id);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state]);
  useEffect(() => {
    if (state?.id) {
      getProduct(state.id);
      getCommentByProduct(state.id);
    }
  }, [state]);

  const getProduct = (id) => {
    axios
      .get(`${urlRequest}/product/${id}`)
      .then(function (response) {
        // setInformationProduct({
        //   name: response.data.data.name,
        //   brand_name: response.data.data.brand.name
        // });
        setInformationProduct(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCommentByProduct = (id) => {
    axios
      .get(`${urlRequest}/comments/all/${id}`)
      .then(function (response) {
        setInformationCards(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="body-view">
      <Container>
        <Row>
          <Col lg={1}>
            <img
              onClick={() => history.goBack()}
              src={iconoAtras}
              alt="Icono de atras"
              style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }}
            />
          </Col>
          <Col lg={11}>
            <p className="title-Products">Comentarios</p>
          </Col>
        </Row>
        <Row>
          <Col className="description-Products">
            <p className="paragraf-products">
              A continuación se muestra la información del producto,
              adicionalmente sus comentarios y sus calificaciones, al igual que
              una calificación promedio
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <p className="subtitle">Informacion del producto</p>
          </Col>
          <Col lg={7}>
            <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <p className="title-inputs mt-4 ml-2">Nombre del producto(*)</p>
            <input
              className="inputDiscounts"
              type="text"
              name="name"
              value={informationProduct.name}
              disabled
            />
          </Col>
          <Col lg={6}>
            <p className="title-inputs mt-4 ml-2">Marca del producto(*)</p>
            <input
              className="inputDiscounts"
              type="text"
              name="name"
              value={informationProduct.brand?.name}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <p className="title-inputs mt-4 ml-2">Costo del producto(*)</p>
            <input
              className="inputDiscounts"
              type="text"
              name="unit_cost"
              value={informationProduct.unit_cost}
              disabled
            />
          </Col>
          <Col lg={6}>
            <p className="title-inputs mt-4 ml-2">Categoria del producto(*)</p>
            <input
              className="inputDiscounts"
              type="text"
              name="name"
              value={informationProduct.category?.name}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <p className="title-inputs mt-4 ml-2">Descripcion del comentario</p>
            <textarea
              name="description"
              cols="80"
              rows="5"
              placeholder="Ingrese una descripcion"
              className="textarea-product"
              style={{
                height: "80%",
                width: "100%",
                textAlign: "start",
                position: "relative",
                marginBottom: "30px",
                borderRadius: "15px !important",
              }}
              value={informationProduct.description}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col lg={2} className="mt-5">
            <p className="subtitle">Comentarios</p>
          </Col>
          <Col lg={10} className="mt-5">
            <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
          </Col>
        </Row>
        <Row>
          <Col lg={2}>
            <p className="calificacion">{informationCards.score}</p>
          </Col>
          <Col style={styles.stars} lg={10}>
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={70}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color={
                    (informationCards.score || 5) > index
                      ? colors.negro
                      : colors.blanco
                  }
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </Col>
        </Row>
        <Row>
          {informationCards.comments?.map((event, index) => {
            return (
              <Col
                key={{ index }}
                className="d-block block-column  align-items-left mb-5"
                style={{
                  display: "none",
                  paddingBottom: "0px",
                }}
              >
                <Card style={{ borderRadius: "0px" }}>
                  <Card.Header
                    className="borderRadiusCardHeaderMenu"
                    style={{ marginBottom: "0px", display: "flex" }}
                  >
                    <Card.Title className="styleTitleCardComments mt-3">
                      {event.title}
                    </Card.Title>

                    <Card.ImgOverlay
                      style={{
                        textAlign: "end"
                      }}
                    >
                      {stars.map((_, index) => {
                          return (
                          <FaStar
                              key={index}
                              size={30}
                              onClick={() => handleClick(index + 1)}
                              onMouseOver={() => handleMouseOver(index + 1)}
                              onMouseLeave={handleMouseLeave}
                              color={(event.assessment || 5) > index ? colors.negro : colors.blanco}
                              style={{
                                  marginRight: 10,
                                  cursor: "pointer"
                              }} />
                          )
                      })}
                    </Card.ImgOverlay>
                  </Card.Header>
                  <Card.Body
                    style={{ paddingTop: "0px", paddingBottom: "15px" }}
                  >
                    <Card.Text className="styleSubTitleCardComments">
                      {event.start_date}
                    </Card.Text>
                  </Card.Body>
                  <Card.Body
                    style={{ paddingTop: "0px", paddingBottom: "1px" }}
                  >
                    <Card.Text className="styleSubTitleCardComments">
                      {event.name_user}
                    </Card.Text>
                  </Card.Body>
                  <Card.Body style={{ paddingTop: "20px" }}>
                    <Card.Text className="styleSubTitleCardComments">
                      {event.text}
                    </Card.Text>
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

export default CheckComments;
