import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import MyProducts from "../../assets/img/products-mine.png";
import AddProducts from "../../assets/img/add-product.png";
import MySales from "../../assets/img/my-sales.png";
import check from "../../assets/img/check.svg";
import uncheck from "../../assets/img/uncheck.svg";
import "../../App.css";
import axios from 'axios';
import { urlRequest } from '../../urlRequest';
import deleteImg from "../../assets/img/deleteProduct.svg";
import referencia from "../../assets/img/referencia.png";

function ShoppingList() {
  const history = useHistory();
  const informationCards= [
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

  // const marcarProductoComprado = (id) => {
  //   const productosActualizados = informationCards1.map((e) => {
  //     if (informationCards1.id === id) {
  //       return { ...informationCards1, comprado: !informationCards1.comprado };
  //     }
  //     return informationCards1;

  //   });
  //   setInformationCards1(productosActualizados);
  // };

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
        <Row>
          <Col lg={12} md={12} sm={12}>
            <h1 className="title-Products pb-5 pl-0" >Lista de deseos</h1>
          </Col>
        </Row>
        <Row >
          <Col lg={9} md={8} sm={12} className='description-Products'>
            <p className="paragraf-products">A continuación se muestra la información del producto deseado. Aquí podrás marcar como "check" los productos que ya hayas comprado, lo cual te permitirá generar un reporte de gastos preciso y detallado.</p>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Button className="button-purple-home mb-3 mt-3" href='/setDiscounts' style={{ paddingTop: "auto", fontSize: "24px", height: "auto", width: "auto" }}>Generar reporte de gastos</Button>
          </Col>
        </Row>
        <Row style={{ backgroundColor: '#FFFFFF', marginBottom: "3%", borderRadius: "20px", height: "80px" }}>
          <Col style={{ display: "flex" }}>
          <input type="checkbox" id="even" checked={true} style={{ marginRight:"2px",marginLeft:"11px", backgroundColor: '#9DA0DF', width: "15%" }} />
            <h1 style={{ paddingTop: "12px" }}>:{informationCards1.length}</h1>
          </Col>
          <Col style={{ display: "flex" }}>
          <input type="checkbox" id="even" checked={false} style={{ marginRight:"2px", backgroundColor: '#9DA0DF', width: "15%" }} />
            <h1 style={{ paddingTop: "12px" }}>:{informationCards1.length}</h1>
          </Col>

          <Col>
            <h1 style={{ paddingTop: "12px" }}>Favoritos: {informationCards1.length}</h1>
          </Col>

        </Row>
        <Row>
          {informationCards1.map((event, index) => {
            return (
              <Col lg={12} className="mt-1 d-flex" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                <Card style={{ width: "100%", borderRadius: "20px", paddingLeft: "0px", paddingRight: "0px" }}>
                  <Card.Body style={{ display: "flex" }}>
                    <input type="checkbox" id="even"  onChange={marcarProductoComprado} style={{ marginRight:"25px", backgroundColor: '#9DA0DF', width: "5%" }} />
                    <Card.Img
                      variant="top"
                      className="mt-3 mb-3 styleImgCardHomeIn"
                      src={event.img}
                      style={{
                        width:
                          "25%",
                          marginRight: "4%",
                      }}
                    />

                    <Col style={{ display: "block", marginTop: "3%" }}>
                      <Card.Title className="styleTitleCard">
                        {event.name}
                      </Card.Title>
                      <Card.Title className="styleTitleCard">
                        {event.cantidad}
                      </Card.Title>
                      <Card.Title className="styleTitleCard">
                        $ {event.precio}
                      </Card.Title>
                    </Col>
                    <Button className="button-purple-home mb-0 mt-5" href="/products" >Ver producto</Button>
                    <Col style={{ display: "block", marginTop: "3%" }}>
                      <Card.Text className="styleTitleCard" style={{ textAlign: "center"}}>
                        Añadido el:   
                        {event.fecha}
                      </Card.Text>
                      <Card.Link
                        className="ml-10 mt-3 mb-2"

                        style={{ textAlign: "initial" }}>
                        <img src={deleteImg} alt='Imagen delete' />
                      </Card.Link>
                    </Col>
                  </Card.Body>

                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>






    // <div className="pt-5 ml-5" style={{ height: "91vh" }}>
    //   <Container className="margin-top-for-all">
    //     <Row>
    //       <Col lg={12}>
    //         <h1 className="titleHomeIn ">Opciones</h1>
    //       </Col>
    //       {informationCards.map((event, index) => {
    //         return (
    //           <Col lg={4} className="mt-4 d-flex">
    //             <Card style={{ width: "18rem", borderRadius: "20px" }}>
    //               <Card.Header className="borderRadiusCardHeader">
    //                 <Card.Img
    //                   variant="top"
    //                   className="mt-3 mb-3 styleImgCardHomeIn"
    //                   src={event.img}
    //                   style={{
    //                     width:
    //                       index === 1 ? "6.2rem" : index === 2 ? "9.8rem" : "",
    //                   }}
    //                 />
    //               </Card.Header>
    //               <Card.Body>
    //                 <Card.Title className="styleTitleCard">
    //                   {event.title}
    //                 </Card.Title>
    //                 <Card.Text className="styleSubTitleCard">
    //                   {event.text}
    //                 </Card.Text>
    //               </Card.Body>
    //               <Card.Body>
    //                 <Card.Link
    //                   href={event.url}
    //                   style={{ textAlign: "initial" }}
    //                 >
    //                   Comienza aqui
    //                 </Card.Link>
    //               </Card.Body>
    //             </Card>
    //           </Col>
    //         );
    //       })}
    //     </Row>
    //   </Container>
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       width: "40%",
    //       margin: "auto",
    //     }}
    //   >
    //     <button
    //       className="button-red btn-finish"
    //       onClick={() => history.goBack()}
    //     >
    //       ATRÁS
    //     </button>
    //   </div>
    // </div>
  );
}

export default ShoppingList;
