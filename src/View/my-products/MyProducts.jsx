import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import Example from '../../assets/img/example.png';
import iconEdit from '../../assets/img/navbar/icono-editar.svg';
import iconDelete from '../../assets/img/navbar/icono-eliminar.svg';
import Carousel from '../../Components/carousel/Carousel';
import { urlRequest } from '../../urlRequest';
import './MyProducts.css';
import { Link } from 'react-router-dom';



import DiscountImg from '../../assets/img/navbar/discount.svg';
import CommentsImg from '../../assets/img/navbar/comentarios.svg';
import ProductosImg from '../../assets/img/navbar/productos.svg';

function MyProducts() {
  const history = useHistory();
  const [listProducts, setListProducts] = useState([]);
  const [listMark, setListMark] = useState([]);

  const informationCards = [
    {
      img: DiscountImg,
      title: "Descuentos",
      text: "Si deseas conocer los diferentes descuentos que tiene algunos productos",
      url: "/discounts",
    },
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
  ];



  useEffect(() => {
    getListProducts();
    getListMark();
  }, []);

  const getListProducts = () => {
    axios.get(`${urlRequest}/product/list`, [])
      .then(function (response) {
        setListProducts(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getListMark = () => {
    axios.get(`${urlRequest}/brand`, [])
      .then(function (response) {
        setListMark(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const deleteProduct = (id) => {
    axios.delete(`${urlRequest}/product/delete/${id}`, [])
      .then(function (response) {
        if (response.status === 201) {
          getListProducts();
          Swal.fire({
            title: '¡Eliminacion exitosa!',
            text: 'Se ha eliminado un producto.',
            icon: 'success',
            confirmButtonText: 'Continuar',
            confirmButtonColor: 'rgb(157 160 223)',
          })
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'Se ha generado un error al eliminar un producto.',
            icon: 'error',
            confirmButtonText: 'Continuar',
            confirmButtonColor: 'rgb(157 160 223)',
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="body-view">
      {/* <div className="banner-my-product">
        <h1 className="title-marks-my-products">Menu</h1>
        <Carousel list={listMark} />
      </div> */}
      <h1 className="title-marks-my-products">Menu</h1>
      <p className="paragraph">A continuación se mostrará las diferentes elecciones, que usted podra tomar, con el fin de que conozca todas las opciones con respecto a los productos</p>

      <Container>
        <Row>

          {informationCards.map((event, index) => {
            return (
              // <Col lg={4} className="mt-4 d-flex">
              <Col className="d-flex flex-column  align-items-center"
                            style={{
                display: "inline",
                paddingBottom: "80px"
                              }}
              >

                <Card style={{ width: "18rem", borderRadius: "20px" }}>
                  <Card.Header className="borderRadiusCardHeaderMenu">
                    <Card.Img
                      variant="top"
                      className="mt-3 mb-3 styleImgCardHomeIn"
                      src={event.img}
                      style={{
                        width:
                          index === 0 ? "6.2rem" : index === 1 ? "7.2rem" : index === 2 ? "5.2rem" : "",
                      }}
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
                      style={{ textAlign: "initial", textDecoration: "underline", color: "#137EBA", fontSize: "16px" }}
                    >
                      Ingresa aqui
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}




          {listProducts.length > 0 &&
            listProducts.map((product, index) => (
              <Col lg={4} md={4} sm={2} key={index}>
                <Card className="card-my-product">
                  <div className="card-header-my-product">
                    <Card.Img src={Example}></Card.Img>
                    <span>{product.quantity}</span>
                  </div>
                  <Card.Body className="card-footer-my-product">
                    <div className="card-info-my-product">
                      <span>{product.name}</span>
                      <span>{product.unit_cost}</span>
                    </div>
                    <div>
                      <div>
                        <img src={iconEdit} className="button-edit-product" onClick={() => history.push("/create-product", { id: product.id })} />
                      </div>
                      <div>
                        <Card.Img src={iconDelete} className="button-delete-product" onClick={() => deleteProduct(product.id)}></Card.Img>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}


        </Row>
      </Container>
    </div>
  );
}

export default MyProducts;
