import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import "../../App.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import iconoAtras from "../../assets/img/icono-atras.svg";
import referencia from "../../assets/img/referencia.png";
import iconEdit from "../../assets/img/navbar/icono-editar.svg";
import iconSalirX from "../../assets/img/borrar-x.svg";
import iconoChulo from "../../assets/img/chulo.png";
import { urlRequest } from "../../urlRequest";

function Wishlist() {
  const history = useHistory();

  const [shoppingList, setShoppingList] = useState({
    id: null,
    name_list: "",
    estimated_price: 0,
    is_active: false,
    start_date: moment(new Date()).format("YYYY-MM-DD"),
  });

  const [shoppingListProducts, setShoppingListProducts] = useState([]);
  const [id] = useState(localStorage.getItem("id") || '');
  const [isVerification, setIsVerification] = useState(false);

  useEffect(() => {
    getShoppingList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Obtener la lista de deseo
  const getShoppingList = () => {
    axios
      .get(`${urlRequest}/comparison-list/${id}`)
      .then(function (response) {
        setShoppingList({
          id: response.data.data.id,
          name_list: response.data.data.name_list,
          estimated_price: response.data.data.estimated_price,
          is_active: response.data.data.is_active,
          start_date: response.data.data.start_date,
        });
        setShoppingListProducts(response.data.data.shopping_list_products);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Habilitar input y chulito
  const handleActive = () => {
    setIsVerification(!isVerification);
  };

  // On change de input de cantidad
  const onChangeProduct = (e, index) => {
    setShoppingListProducts(
      shoppingListProducts.map((item, indexItem) => {
        if (index === indexItem) {
          const total = item.product.unit_cost * e.target.value;
          return {
            ...item,
            total_cost: total,
            [e.target.name]: e.target.value,
          };
        }
        return item;
      })
    );
  };

  const onChangeName = (e) => {
    console.log(e.target.name, e.target.value);
    setShoppingList({...shoppingList, [e.target.name]: e.target.value});
  }

  // Modificar cantidades a los productos
  const saveQuantityProduct = () => {
    axios
      .put(`${urlRequest}/comparison-list/update-product/${id}/1`, {
        name_list: shoppingList.name_list,
        estimated_price: shoppingList.estimated_price,
        shopping_list_products: shoppingListProducts
      })
      .then(function (response) {
        if (response.status === 200) {
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Se ha actualizado la lista de deseos',
            icon: 'success',
            confirmButtonText: "Seguir comprando",
            confirmButtonColor: 'rgb(157 160 223)',
          }).then(resultado => {
            history.push("/comparison-list");
          });
        } else {
          Swal.fire({
            title: "¡Error!",
            text: "Se ha generado un error",
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


  const saveWishList = () => {
    axios
      .put(`${urlRequest}/comparison-list/update-list/${id}/2`, {
        name_list: shoppingList.name_list,
        estimated_price: shoppingList.estimated_price,
        shopping_list_products: shoppingListProducts
      })
      .then(function (response) {
        if (response.status === 200) {
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Se ha actualizado la lista de deseos',
            icon: 'success',
            confirmButtonText: "Seguir comprando",
            confirmButtonColor: 'rgb(157 160 223)',
          }).then(resultado => {
            history.push("/comparison-list");
          });
        } else {
          Swal.fire({
            title: "¡Error!",
            text: "Se ha generado un error",
            icon: "error",
            confirmButtonText: "Continuar",
            confirmButtonColor: "rgb(157 160 223)",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const deleteProductByList = (id) => {
    axios.delete(`${urlRequest}/shopping-lists-products/${id}`).then(() => {
      getShoppingList();
  }).catch( e => console.log(e));
  }

  return (
    <div className="body-view">
      <Container>
        <Row>
          <Col lg={1} md={2} sm={2} style={{ marginTop: "44px" }}>
            <img
              onClick={() => history.goBack()}
              src={iconoAtras}
              alt="Icono de atras"
              className="Undo-Button"
              style={{ width: "80px" }}
            />
          </Col>
          <Col lg={11} md={10} sm={10} className="mt-4">
            <h1 className="title-Products">Lista de deseos</h1>
          </Col>
        </Row>
      </Container>
      <div className="respons">
        <Container>
          <Row className="mt-lg-4">
            <Col lg={12} md={12} sm={12}>
              <p className="paragraf-products">
                Si desea hacer una búsqueda más efectiva de sus productos, le
                permitirá hacer seleccionando a una categoría o una marca, o las
                dos en su defecto con el fin de tener una mejor búsqueda
              </p>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <p className="title-inputs mt-4 ml-2">Nombre de la lista (*)</p>
              <input
                className="inputDiscounts"
                name="name_list"
                type="text"
                value={shoppingList.name_list}
                placeholder="Ingrese su nombre"
                onChange={(e) => onChangeName(e)}
              />
            </Col>

            <Col lg={6}>
              <p className="title-inputs mt-4 ml-2">Precio estimado</p>
              <input
                className="inputDiscounts"
                name="estimated_price"
                type="number"
                value={shoppingList.estimated_price?.toLocaleString()}
                placeholder="Ingrese su nombre"
                disabled
              />
            </Col>
          </Row>
          <Row>
            {shoppingListProducts?.map((producto, index) => (
              <Col
                lg={4}
                md={6}
                sm={11}
                className="d-flex flex-column  align-items-center"
                style={{
                  display: "inline",
                  paddingTop: "40px",
                  paddingBottom: "10px",
                }}
                key={producto.id}
              >
                <Card
                  style={{ width: "18rem", borderRadius: "20px" }}
                  className="col-lg-12 col-md-12 col-sm-12"
                >
                  <Card.Header className="borderRadiusCardHeaderMenu">
                    <Row>
                      <Col lg={10}>
                        <Card.Img
                        variant="top"
                        className="mt-3 mb-3 styleImgCardHomeIn"
                        src={referencia}
                        style={{ width: "100%" }}
                      />
                      </Col>
                      <Col lg={2}>
                      <Card.Img
                        variant="top"
                        src={iconSalirX}
                        onClick={(e) => deleteProductByList(producto.id)}
                      />
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title
                      className="styleTitleCardMenu"
                      style={{ fontSize: "16px" }}
                    >
                      {producto.product.name}
                    </Card.Title>
                    <Row>
                      <Col lg={7} sm={12} md={12}>
                        <input
                          className="inputDiscounts mb-1"
                          name="quantity"
                          type="number"
                          value={producto.quantity.toLocaleString()}
                          placeholder="Ingrese su nombre"
                          disabled={!isVerification}
                          onChange={(e) => onChangeProduct(e, index)}
                        />
                      </Col>
                      <Col lg={2} sm={6} md={6}>
                        <img
                          src={iconEdit}
                          alt="edit"
                          className="mt-sm-2"
                          onClick={handleActive}
                        />
                      </Col>
                      {isVerification && (
                        <Col lg={2} sm={6} md={6}>
                          <img
                            className="mt-sm-2"
                            src={iconoChulo}
                            alt="edit"
                            style={{ width: "2.5rem" }}
                            onClick={() => saveQuantityProduct()}
                          />
                        </Col>
                      )}
                    </Row>
                    <Card.Text className="mt-lg-3">
                      {" "}
                      <p>
                        ${" "}
                        {producto.total_cost
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </p>{" "}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col lg={6} className="content-product content-body-home mt-5">
              <Button
                className="button-purple-home"
                style={{ marginBottom: "10%", width: "80%" }}
                onClick={() => history.push("/comparison-list")}
              >
                Agregar mas productos
              </Button>
            </Col>
            <Col lg={6} className="content-product content-body-home mt-5">
              <Button
                className="button-purple-home"
                style={{ marginBottom: "10%", width: "80%" }}
                onClick={saveWishList}
              >
                Guardar lista de deseos
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Wishlist;
