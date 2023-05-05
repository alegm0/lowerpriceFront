import React, { useEffect, useState } from 'react';
import setImg from "../../assets/img/setProduct.svg";
import seeImg from "../../assets/img/seeProduct.svg";
import deleteImg from "../../assets/img/deleteProduct.svg";
import referencia from "../../assets/img/referencia.png";
import { useHistory } from 'react-router';
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import iconoAtras from '../../assets/img/icono-atras.svg';
import axios from 'axios';
import { urlRequest } from '../../urlRequest';
import Swal from 'sweetalert2';

function Products() {
    const history = useHistory();

    const [informationCards, setInformationCards] = useState([]);

    useEffect(() => {
        getListProducts();
      }, []);
    
    const getListProducts = () => {
        axios.get(`${urlRequest}/product/list`, [])
          .then(function (response) {
            setInformationCards(response.data.data);
        })
          .catch(function (error) {
            console.log(error);
        });
    }
    const deleteProduct = (id) => {
        axios.delete(`${urlRequest}/product/${id}`, [])
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
            <Container>
            <Row>
                <Col lg={1} md={2} sm={2}>
                    <img onClick={() => history.goBack()} src={iconoAtras} alt="Icono de atras"  className='Undo-Button' style={{width:"80px"}}/>
                </Col>
                <Col lg={11} md={10} sm={10} className="mt-4">
                    <h1 className="title-Products">Productos</h1>
                </Col>
            </Row>
            </Container>
            <div className='ml-5'>
            <Container>
                <Row className="mt-4">
                    <Col lg={8} md={12} sm={12}>
                        <p className="paragraf-products">Si desea hacer una búsqueda más efectiva de sus productos, le permitirá hacer seleccionando a una categoría o una marca, o las dos en su defecto con el fin de tener una mejor búsqueda</p>
                    </Col>
                    <Col lg={4} md={12} sm={12}>
                    <Button className='buttoncrear-products' href='/create-products'>Crear producto</Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <h1 className="second-Title">Seleccione una categoria</h1>
                        <select className="inputSelectProducts">
                            <option value="option1">Seleccione la categoria</option>
                            <option value="1">Aseo</option>
                            <option value="2">Lacteos</option>
                            <option value="3">Bebidas</option>
                            <option value="4">Alcohol</option>
                            <option value="5">Mascotas</option>
                            <option value="6">Frutas</option>
                            {/* onChange={handleInputChange} */}
                        </select>
                    </Col>
                    <Col lg={6}>
                        <h1 className="second-Title">Seleccione una marca</h1>
                        <select className="inputSelectProducts">
                            <option value="option1">Seleccione la marca</option>
                            <option value="1">Jumbo</option>
                            <option value="2">D1</option>
                            <option value="3">Makro</option>
                            <option value="4">Farmatodo</option>
                            <option value="5">Exito</option>
                            <option value="6">Dollarcity</option>
                            {/* onChange={handleInputChange} */}
                        </select>

                    </Col>
                </Row>
                <Row>
                    {informationCards.map((event, index) => {
                        return (
                            <Col lg={4} className="d-flex flex-column  align-items-center"
                                style={{
                                    display: "inline",
                                    paddingTop: "40px",
                                    paddingBottom: "10px"
                                }}
                            >
                                <Card style={{ width: "18rem", borderRadius: "20px" }}>
                                    <Card.Header className="borderRadiusCardHeaderMenu">
                                        <Card.Img
                                            variant="top"
                                            className="mt-3 mb-3 styleImgCardHomeIn"
                                            src={referencia}
                                            style={{
                                                width:"256px"
                                            }}
                                        />
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title className="styleTitleCardMenu" >
                                            {event.name}
                                        </Card.Title>
                                    </Card.Body>
                                    <Card.Body style={{ paddingTop: "0px" }}>
                                        <Card.Link  href={event.url1} style={{ textAlign: "initial" }}>
                                           <img src={setImg} alt="Edit" onClick={() => history.push("/create-products", { id: event.id })}/>
                                        </Card.Link> 
                                        <Card.Link onClick={() => deleteProduct(event.id)}
                                            style={{ textAlign: "initial" }}
                                        >
                                          <img src={deleteImg} alt="delete" />
                                        </Card.Link> 
                                        <Card.Link
                                            onClick={() => history.push("/checkComments", { id: event.id })}
                                            style={{ textAlign: "initial" }}
                                        >
                                          <img src={seeImg}  alt="show"/>
                                        </Card.Link> 
            
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
            </div>

        </div>



    );
}
export default Products;