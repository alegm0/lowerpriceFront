// import React, { useState } from "react";
import React, { useState, useEffect } from "react";

import axios from 'axios';
import { urlRequest } from '../../urlRequest';
import { useHistory } from "react-router";
import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
//import loginImg from "../../assets/img/loginImg.svg";
import loginImgI from "../../assets/img/loginIcon.png";
//import logo from "../../assets/img/logo.svg";
import user from "../../assets/img/email.png";
import passwordu from "../../assets/img/forgot.png";
import Swal from 'sweetalert2';



function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");





  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError("*Correo no valido");

    } else {
      setError("");
    }
    setEmail(newEmail);
  };


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (password.length < 7) {
      setError2("*Contraseña no valida");

    } else {
      setError2("");

    }
    setPassword(newPassword);;

  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    if (email && password && error === "" && error2 === "") {
      axios.post(`${urlRequest}/login`, data)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          history.push('/home');
        }
      
      })
      .catch(error => {
        console.log(error);
        setError2("Correo o contraseña incorrecta");
      });
      
      
      // try {
      //   const responseU = axios.post("/login", {data});

      //   if (responseU.status === 201) {
      //     window.open("/home");
      //   }
      // } catch (error) {
  
      //   console.error(error);
      // }
      

 } else {
 setError2("Error ejecutamiento");
  
    }
  };




  return (
    <Container className="full-width">
      <Row className="h-100-vh align-items-center">
        <Col className="d-none-mobile">
          <img src={loginImgI} alt="Imagen ingreso" className="image-size" />
        </Col>
        <Col>
          <Card className="panel-white">
            <Card.Body>
              <Card.Title className="panel-white-title">Iniciar Sesion</Card.Title>
              <form onSubmit={handleSubmit}>
                <div className="flex-inputs container-inputs-login">
                  <img src={user} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="text"
                    placeholder="Ingrese su correo electronico"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                {error && <span className="text-validate">{error}</span>}
                <div className="flex-inputs last-input-margin container-inputs-login">
                  <img src={passwordu} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                {error2 && <span className="text-validate">{error2}</span>}

                <Button
                  type="submit"
                  variant="INICIAR SESIÓN"
                  className="button-red"
                  onClick={handleSubmit}
                  
                >
                  INICIAR SESIÓN
                </Button>
                <div>
                  <a
                    href="/recover-password"
                    className="login__recover-password-link"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <p className="login__without-account">
                  ¿No tienes una cuenta? <a href="/register" className="">Registrate aquí</a>
                </p>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}

export default Login;
