import React from 'react';
import { useHistory } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';
import loginImg from "../../assets/img/loginImg.svg";
import logo from "../../assets/img/logo.svg";

function Register() {
  const history = useHistory();

  return (
    <Container className="full-width">
      <Row>
        <Col className="background-red col-height">
          <h1 className="main__title">¡Regístrate ya!</h1>
          <p className="main__description">Te brindamos el servicios para mejorar tu organizacion  en cada
            una de tus compras, es importante para nosotros hacer tu vida
            mucho mas sencillas.</p>
          <img src={loginImg} alt="Imagen ingreso" className="image-size" />
        </Col>
        <Col className="col-height">
          <img className="main__image" src={logo} alt="MBShop Logo" />

          <div className="flex-inputs">
            <label className="label-input">Nombre:</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese su nombre"
            />
          </div>
          <div className="flex-inputs last-input-margin">
            <label className="label-input">Código:</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese su código"
            />
          </div>
          <div className="flex-inputs last-input-margin">
            <label className="label-input">Contraseña:</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div className="flex-inputs last-input-margin">
            <label className="label-input">Confirmar contraseña:</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese su confirmar contraseña"
            />
          </div>

          <Button variant="REGISTRARSE" className="button-red last-input-margin" onClick={() => history.push('/home')}>REGISTRARSE</Button>

          <p className="login__without-account">Si tienes una cuenta <a href='/'>inicia sesión aquí</a>.</p>
        </Col>
      </Row>
    </Container>
  );

}

export default Register;