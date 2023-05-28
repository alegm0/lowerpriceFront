import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { urlRequest } from "../../urlRequest";
import iconoAtras from "../../assets/img/icono-atras.svg";
import setImg from "../../assets/img/setProduct.svg";
import deleteImg from "../../assets/img/deleteProduct.svg";
import Swal from "sweetalert2";
function Discounts() {
  const history = useHistory();

  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    getListDiscounts();
  }, []);

  const getListDiscounts = () => {
    const id = localStorage.getItem('id');
    axios
      .get(`${urlRequest}/discount-promotions/${id}`, [])
      .then(function (response) {
        setDiscounts(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteDiscount = (id) => {
    axios
      .delete(`${urlRequest}/discount-promotions/delete/${id}`, [])
      .then(function (response) {
        if (response.status === 201) {
          getListDiscounts();
          Swal.fire({
            title: "¡Eliminacion exitosa!",
            text: "Se ha eliminado un producto.",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "rgb(157 160 223)",
          });
        } else {
          Swal.fire({
            title: "¡Error!",
            text: "Se ha generado un error al eliminar un producto.",
            icon: "error",
            confirmButtonText: "Continuar",
            confirmButtonColor: "rgb(157 160 223)",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="body-view">
      <Container>
        <Row>
          <Col lg={1} md={1} sm={1} className="pt-3">
            <img
              onClick={() => history.goBack()}
              src={iconoAtras}
              alt="Icono de atras"
              style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }}
            />
          </Col>
          <Col lg={10} md={8} sm={5}>
            <h1 className="title-Products">Descuentos</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={9} md={8} sm={12} className="description-Products">
            <p className="paragraf-products">
              A continuación se mostrará los diferentes descuentos, con su
              respectiva fecha de vigencia y su descripción o condición para
              poder participar de ella
            </p>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Button
              className="button-purple-home mb-3"
              href="/setDiscounts"
              style={{
                paddingTop: "auto",
                fontSize: "24px",
                height: "auto",
                width: "auto",
              }}
            >
              Crear descuento
            </Button>
          </Col>
        </Row>

        <Row lg={3} md={2} sm={1}>
          {discounts.map((discount) => {
            return (
              <Col
                lg={4}
                md={6}
                sm={11}
                className="d-flex flex-column  align-items-center"
                style={{
                  display: "flex",
                  paddingTop: "40px",
                  paddingBottom: "10px",
                }}
              >
                <Card
                  style={{ width: "18rem", borderRadius: "20px" }}
                  className="col-lg-12 col-md-12 col-sm-12"
                >
                  <Card.Header
                    className="borderRadiusCardHeaderMenu mb-0 "
                    style={{ display: "flex" }}
                  >
                    <Card.Title
                      variant="top"
                      className="mt-4 mb-1 ml-20"
                      style={{
                        marginRight: "35%",
                        marginLeft: "35px",
                        fontWeight: "700",
                        fontSize: "30px",
                        lineHeight: "36px",
                        display: "flex",
                        width: "8%",
                      }}
                    >
                      {" "}
                      {discount.value}%{" "}
                    </Card.Title>
                    <Card.Link
                      className="ml-10 mt-3 mb-2"
                      style={{ textAlign: "initial" }}
                    >
                      <img
                        src={setImg}
                        alt="Imagen edit"
                        onClick={() =>
                          history.push("/setDiscounts", { id: discount.id })
                        }
                      />
                    </Card.Link>
                    <Card.Link
                      className="ml-10 mt-3 mb-2"
                      style={{ textAlign: "initial" }}
                    >
                      <img
                        src={deleteImg}
                        alt="Imagen delete"
                        onClick={() => deleteDiscount(discount.id)}
                      />
                    </Card.Link>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title
                      className="styleTitleCardMenu mb-0"
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        color: "#000000",
                        fontFamily: "Inter",
                      }}
                    >
                      {" "}
                      {discount.start_date} -{discount.finish_date}
                    </Card.Title>
                  </Card.Body>
                  <Card.Body style={{ paddingTop: "0px" }}>
                    <Card.Text
                      style={{ textAlign: "center", fontSize: "10px" }}
                    >
                      {" "}
                      {discount.conditions}
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
export default Discounts;
