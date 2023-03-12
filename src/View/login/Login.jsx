import React, { useState } from "react";
import { useHistory } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import loginImg from "../../assets/img/Imagen2.svg";
import logo from "../../assets/img/Imagen3.svg";
import axios from "axios";
import { urlRequest } from "../../urlRequest";
import Swal from "sweetalert2";

function Login() {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [validate, setValidate] = useState(false);

  const handleChangeInfo = (e) => {
    const { name, value } = e?.target;
    setValidate(false);
    setUserInfo({ ...userInfo, [name]: value });
  };

  
  const login = () => {
    //if(!validate()) {
      axios.post(`${urlRequest}/login`, userInfo)
        .then(function (response) {
          if (response.status === 200) {
              history.push('/home');
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'Se ha generado un error al iniciar sesion.',
              icon: 'error',
              confirmButtonText: "Continuar", 
              confirmButtonColor: 'rgb(255, 146, 158)',
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    //}
  };

  return (
    <Container className="full-width">
      <Row>
        <Col className="background-red col-height">
          <h1 className="main__title">¡Suscribete ya!</h1>
          <p className="main__description">
           La mejor app para comparar precios
          </p>
          <img src={loginImg} alt="Imagen ingreso" className="image-size" />
        </Col>
        <Col className="col-height">
          <img className="main__image" src={logo} alt="MBShop Logo" />
          <p className="main__text">Ingrese los siguientes datos</p>

          <div className="flex-inputs">
            <label className="label-input">Ingrese su correo electronico</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese su correo electronico"
              name="email"
              onChange={(e) => handleChangeInfo(e)}
              value={userInfo?.email || ""}
            />
          </div>
          <div className="flex-inputs last-input-margin">
            <label className="label-input">Contraseña:</label>
            <input
              className="input"
              type="password"
              placeholder="Ingrese su contraseña"
              name="password"
              onChange={(e) => handleChangeInfo(e)}
              value={userInfo?.password || ""}
            />
          </div>

          {validate && (
            <div>
              <p>*Usuario o contraseña incorrecta</p>
            </div>
          )}

          <div>
            <a
              href="/recover-password"
              className="login__recover-password-link"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Button
            variant="INICIAR SESIÓN"
            className="button-red"
            onClick={() => login()}
          >
            INICIAR SESIÓN
          </Button>

          <p className="login__without-account">
            Si no tienes una cuenta <a href="/register">registrate aquí</a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
