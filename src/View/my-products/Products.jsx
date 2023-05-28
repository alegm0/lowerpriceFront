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
    const [categoryFilter, setCategoryFilter] = useState("");
    const [brandFilter, setBrandFilter] = useState("");
    const [informationCards, setInformationCards] = useState([]);
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const id = localStorage.getItem('id');

    const handleCategoryFilter = (event) => {
        const selectedId = event.target.value;
        setCategoryFilter(selectedId);
    };
    const handleBrandFilter = (event) => {
        const selectedId = event.target.value;
        setBrandFilter(selectedId);
    };
    useEffect(() => {
        getCategory();
        getBrand();
    }, []);
    const getCategory = () => {
        axios.get(`${urlRequest}/category/list`)
            .then(function (response) {
                console.log(response);
                setCategory(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const getBrand = () => {
        axios.get(`${urlRequest}/brand/list`)
            .then(function (response) {
                console.log(response.data);
                setBrand(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    useEffect(() => {
        getListProducts();
    }, []);

    const getListProducts = () => {
        axios.get(`${urlRequest}/product/list/${id}`, [])
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
    const filteredProducts = informationCards.filter((product) => {
        console.log(categoryFilter, brandFilter)
        console.log(product.category_id,product.brand_id)
        if (categoryFilter && brandFilter) {
            return product.category_id === categoryFilter && product.brand_id === brandFilter;
        } else if (categoryFilter) {
            return product.category_id === categoryFilter;
        } else if (brandFilter) {
            return product.brand_id === brandFilter;
        } else {
            return true;
        }
    });


    return (
        <div className="body-view">
            <Container>
                <Row >
                    <Col lg={1} md={2} sm={2} style={{ marginTop: "44px" }}>
                        <img onClick={() => history.goBack()} src={iconoAtras} alt="Icono de atras" className='Undo-Button' style={{ width: "80px" }} />
                    </Col>
                    <Col lg={11} md={10} sm={10} className="mt-4">
                        <h1 className="title-Products">Productos</h1>
                    </Col>
                </Row>
            </Container>
            <div className='ml-5'>
                <Container>
                    <Row className="mt-4">
                        <Col lg={9} md={9} sm={11}>
                            <p className="paragraf-products">Si desea hacer una búsqueda más efectiva de sus productos, le permitirá hacer seleccionando a una categoría o una marca, o las dos en su defecto con el fin de tener una mejor búsqueda</p>
                        </Col>
                        <Col lg={3} md={3} sm={11}>
                            <Button href='/create-products' style={{ fontSize: "25px", background: "#9DA0DF", borderColor: "#9DA0DF" }}>Crear producto</Button>

                        </Col>
                    </Row>
                    {/* <Row>
                        <Col lg={6} md={6} sm={12}>
                            <h1 className="second-Title">Seleccione una categoria</h1>
                            <select className="inputDiscounts" name="id" onChange={handleCategoryFilter}  value={category.id}>
                                <option value="option1">Seleccione la categoria</option>
                                {category.map(({ id, name }) => (
                                    <option value={id}>{name}</option>
                                ))}
                                <option value="0">Otros</option>
                            </select>
                            <p>El id del select seleccionado es: {categoryFilter}</p>
                        </Col>
                        <Col lg={6} md={6} sm={12} >
                            <h1 className="second-Title">Seleccione una marca</h1>
                            <select className="inputDiscounts" name="id" onChange={handleBrandFilter}  value={brand.id}>
                                <option value="option1">Seleccione la marca</option>
                                {brand.map(({ id, name }, index) => (
                                    <option value={id}>{name}</option>
                                ))}
                                <option value="">Otros</option>

                            </select>
                            <p>El id marca es: {brandFilter}</p>

                        </Col>
                    </Row> */}
                    <Row lg={3} md={2} sm={1}>
                        {filteredProducts.length === 0 ? (
                            <p>No se encontraron productos</p>
                        ) : (
                            filteredProducts.map((producto, event) => (

                                <Col lg={4} md={6} sm={11} className="d-flex flex-column  align-items-center"
                                    style={{
                                        display: "inline",
                                        paddingTop: "40px",
                                        paddingBottom: "10px"
                                    }}
                                    key={producto.id}
                                >
                                    <Card style={{ width: "18rem", borderRadius: "20px" }} className="col-lg-12 col-md-12 col-sm-12">
                                        <Card.Header className="borderRadiusCardHeaderMenu">
                                            <Card.Img
                                                variant="top"
                                                className="mt-3 mb-3 styleImgCardHomeIn"
                                                src={referencia}
                                                style={{
                                                    width: "100%"
                                                }}
                                            />
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title className="styleTitleCardMenu" >
                                                {producto.name}
                                            </Card.Title>
                                        </Card.Body>
                                        <Card.Body style={{ display: "flex", paddingTop: "0px", paddingoLeft: "0px", paddingRight: "0px" }}>
                                            <Card.Link href={event.url1} style={{ width: "25%" }}>
                                                <img src={setImg} alt="Edit" onClick={() => history.push("/create-products", { id: producto.id })} />
                                            </Card.Link>
                                            <Card.Link onClick={() => deleteProduct(producto.id)} style={{ width: "25%" }}
                                            >
                                                <img src={deleteImg} alt="delete" />
                                            </Card.Link>
                                            <Card.Link
                                                onClick={() => history.push("/checkComments", { id: producto.id })} style={{ width: "25%" }}
                                            >
                                                <img src={seeImg} alt="show" />
                                            </Card.Link>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                </Container>
            </div>
        </div >
    );
}
export default Products;