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

function MyProducts() {
  const history = useHistory();
  const [listProducts, setListProducts] = useState([]);
  const [listMark, setListMark] = useState([]);

  useEffect(() => {
    getListProducts();
    getListMark();
  },[]);

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
    axios.get(`${urlRequest}/mark`, [])
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
      <div className="banner-my-product">
        <h1 className="title-marks-my-products">Marcas</h1>
        <Carousel list={listMark} />
      </div>
      <Container>
        <Row>
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
                        <img src={iconEdit} className="button-edit-product" onClick={() => history.push("/create-product", {id: product.id})}/>
                      </div>
                      <div>
                        <Card.Img src={iconDelete} className="button-delete-product" onClick={() => deleteProduct(product.id)}></Card.Img>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
            </Col>
          ))}
          
          <Col lg={12} md={4} sm={4}>
            <Link to="/create-products" className='button-red'>Crear producto</Link>
          </Col> 
        </Row>
      </Container>
    </div>
  );
}

export default MyProducts;
