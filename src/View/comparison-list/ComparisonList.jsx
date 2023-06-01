import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import iconoAtras from "../../assets/img/icono-atras.svg";
import referencia from "../../assets/img/referencia.png";
import { useHistory } from "react-router";
import axios from "axios";
import { urlApiRequest, urlRequest } from "../../urlRequest";
import Swal from "sweetalert2";

function ComparisonList() {
  const history = useHistory();
  const [category, setCategory] = useState([]);
  const [lisProductsApi, setLisProductsApi] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [id] = useState(localStorage.getItem("id"));
  const [role] = useState(localStorage.getItem("role"));
  const type = role === "2" ? "COMPANY" : "USER";

  useEffect(() => {
    getCategory();
    getListProductsCompanies();
  }, []);

  const getListProductsCompanies = () => {
    axios
      .get(`${urlRequest}/product/list-product/${id}/${type}`)
      .then(function (response) {
        setListProducts(response.data.data);
      })
      .catch(function (error) {});
  };

  const getCategory = () => {
    axios
      .get(`${urlRequest}/category/list`)
      .then(function (response) {
        setCategory(response.data);
      })
      .catch(function (error) {});
  };

  const getListProducts = (event) => {
    setIsLoading(true);
    Swal.fire({
      title: "Aguarde",
      html: "Carregando...",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    axios
      .get(`${urlApiRequest}/sites/MCO/search?category=${event.target.value}`)
      .then(function (response) {
        setLisProductsApi(response.data);
      })
      .catch(function (error) {});
    setIsLoading(false);
    Swal.close();
  };

  const onChange = (e) => {
    setSearchProduct({ ...searchProduct, [e.target.name]: e.target.value });
  };
  const getSpecificSearch = () => {
    const replacedText = searchProduct.name.replace(/\s/g, "%20");
    const upperCaseText = replacedText.toUpperCase();
    setIsLoading(true);
    Swal.fire({
      title: "Aguarde",
      html: "Carregando...",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    axios
      .get(`${urlApiRequest}/sites/MCO/search?q=${upperCaseText}`)
      .then(function (response) {
        setLisProductsApi(response.data.results);
      })
      .catch(function (error) {});
    setSearchProduct({ name: "" });
    setIsLoading(false);
    Swal.close();
  };

  const saveProductApiAndCreateList = (product) => {
    console.log(product);
    axios
      .post(`${urlRequest}/product/comparison-list`, {
        name: product.title,
        unit_cost: product.price,
        creator_id: id,
        type: 'API',
        category_identifier: lisProductsApi.filters[0].values[0].id,
        id_api: product.id
      })
      .then(function (response) {
        if (response.status === 201) {
          Swal.fire({
            title: "¡Registro exitoso!",
            text: "Se ha agregado un producto a tu lista",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "rgb(157 160 223)",
          }).then((resultado) => {
            history.push("/wish-list");
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

  const saveProductAndCreateList = (product) => {
    axios
      .post(`${urlRequest}/product/comparison-list/creator`, {id: product.id.toString(), user_id: id})
      .then(function (response) {
        if (response.status === 201) {
          Swal.fire({
            title: "¡Registro exitoso!",
            text: "Se ha agregado un producto a tu lista",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "rgb(157 160 223)",
          }).then((resultado) => {
            history.push("/wish-list");
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
            <h1 className="title-Products">Lista de comparaciones</h1>
          </Col>
        </Row>
      </Container>
      <div className="ml-lg-5">
        <Container>
          <Row className="mt-4">
            <Col lg={12} md={9} sm={11}>
              <p className="paragraf-products">
                Si desea hacer una búsqueda más efectiva de sus productos, le
                permitirá hacer seleccionando a una categoría o una busqueda
                especifica de los productos que desea comparar
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <h1 className="second-Title">Seleccione una categoria:</h1>
              <select
                className="inputDiscounts"
                name="identifier"
                onChange={(e) => getListProducts(e)}
                value={category.identifier}
              >
                <option value="option1">Seleccione la categoria</option>
                {category?.map(({ identifier, name }) => (
                  <option value={identifier}>{name}</option>
                ))}
              </select>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <h1 className="second-Title">Busqueda:</h1>
              <input
                className="inputDiscounts"
                name="name"
                type="text"
                value={searchProduct.name}
                placeholder="Ingrese su busqueda"
                onChange={(e) => onChange(e)}
              />
            </Col>
            <Col lg={2} md={6} sm={12} className="mt-5">
              <Button
                style={{ width: "100%" }}
                className="button-purple-home"
                onClick={getSpecificSearch}
              >
                Buscar
              </Button>
            </Col>
          </Row>
          <Row>
            {listProducts?.length === 0 ? (
              <Col lg={12} className="mt-5">
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    color: "#9DA0DF",
                  }}
                >
                  No se encontraron productos
                </p>
              </Col>
            ) : (
              <Col lg={12} className="mt-5">
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    color: "#9DA0DF",
                  }}
                >
                  Productos en nuestras tiendas asociadas
                </p>
              </Col>
            )}
            {listProducts?.map((producto, event) => (
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
                    <Card.Img
                      variant="top"
                      className="mt-3 mb-3 styleImgCardHomeIn"
                      src={referencia}
                      style={{ width: "100%" }}
                    />
                    <Button
                      className="button-purple-home"
                      style={{ fontSize: "17px", height: "auto" }}
                      onClick={() => saveProductAndCreateList(producto)}
                    >
                      Agregar a lista de deseos
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title
                      className="styleTitleCardMenu"
                      style={{ fontSize: "16px" }}
                    >
                      {producto.name}
                    </Card.Title>
                    <Card.Text>
                      {" "}
                      <p>
                        ${" "}
                        {producto.unit_cost
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </p>{" "}
                    </Card.Text>
                    <Card.Text>{producto.address}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {lisProductsApi.length === 0 ? (
              <Col lg={12} className="mt-5">
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    color: "#9DA0DF",
                  }}
                >
                  No se encontraron productos
                </p>
              </Col>
            ) : (
              <Col lg={12} className="mt-5">
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    color: "#9DA0DF",
                  }}
                >
                  Productos en otras tiendas
                </p>
              </Col>
            )}
            {lisProductsApi.results?.map((producto, event) => (
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
                    <Card.Img
                      variant="top"
                      className="mt-3 mb-3 styleImgCardHomeIn"
                      src={producto.thumbnail}
                      style={{ width: "100%" }}
                    />
                    <Button
                      className="button-purple-home"
                      style={{ fontSize: "17px", height: "auto" }}
                      onClick={() => saveProductApiAndCreateList(producto)}
                    >
                      Agregar a lista de deseos
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title
                      className="styleTitleCardMenu"
                      style={{ fontSize: "16px" }}
                    >
                      {producto.title}
                    </Card.Title>
                    <Card.Text>
                      {" "}
                      <p>
                        ${" "}
                        {producto.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </p>{" "}
                    </Card.Text>
                    <Card.Text>
                      {producto.address.state_name} {producto.address.city_name}{" "}
                    </Card.Text>
                    <Card.Link
                      href={producto.permalink}
                      style={{
                        textAlign: "center",
                        textDecoration: "underline",
                        color: "#9DA0DF",
                        fontSize: "16px",
                      }}
                    >
                      Conoce mas
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ComparisonList;
