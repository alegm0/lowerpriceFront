import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ImgHome from '../assets/img/navbar/Img-home.svg';
import '../App.css';
import './Home.css';
import soporte from '../assets/img/soporte.png';

function HomeIn() {
  return (
    <div className="body-view">
      <Container>
        <Row>

          <Row>
            <Col lg={10} className="content-home"> 
            <h1 className="title-home m-0">BIENVENID@,</h1>
            <h1 className="title-home pt-0 m-0">La solucion para que ahorres!</h1>
            </Col>
            <Col lg={2}>
            <Button
              className="image-button"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                alignItems: "end",
                marginTop: "65px"
              }}
              href="/technical_support"
            >
              <img img src={soporte} alt="Botón"/>
            </Button>
            </Col>
          </Row>
          <Col lg={9} className="content-home">

            <p className="sub-title-home mt-5">
              Lower price compara precios de diferntes cadenas
            </p>
          </Col>
          <Col lg={12} className="content-home content-body-home">
            <Button className="button-purple-home" href='/product'>
              Explorar ahora!
            </Button>

           

            <img src={ImgHome} alt='Imagen Home' className="logo-body-home" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeIn;
