import React from 'react';
import {Button, Col, Container, Row } from 'react-bootstrap';
import ImgHome from '../assets/img/navbar/Img-home.svg';
import '../App.css';
import './Home.css';

function HomeIn() {
  return (
    <div className="body-view">
      <Container>
        <Row>
          <Col lg={9} className="content-home">
            <h1 className="title-home m-0">BIENVENID@,</h1>
            <h1 className="title-home pt-0 m-0">La solucion para que ahorres!</h1>
            <p className="sub-title-home mt-5">
              Lower price compara precios de diferntes cadenas
            </p>
          </Col>
          <Col lg={12} className="content-home content-body-home">
              <Button className="button-purple-home" href="/comparison-list">
                  Explorar ahora!
              </Button>
              <img src={ImgHome} alt='Imagen Home' className="logo-body-home"/>
          </Col>
     
        </Row>
      </Container>
    </div>
  );
}

export default HomeIn;
