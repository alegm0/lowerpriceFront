import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import axios from 'axios';
import { urlRequest } from '../../urlRequest';
import { useHistory } from "react-router";
import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import loginImgI from "../../assets/img/loginIcon.png";
import userU from "../../assets/img/email.png";
import passwordu from "../../assets/img/forgot.png";
import jwt from 'jsonwebtoken';

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

  const clientID = "240204035171-nola6klc59kianch63n8vpq88k42kv1j.apps.googleusercontent.com";
  const [user, setUser] = useState({});

  const onSuccess = (response) => {
    console.log(response)
    setUser(response.profileObj);
    document.getElementsByClassName("btn").hidden = true;
    const data1 = {
      email: user.email,
      password: user.googleId,
    };
    //axios.post(`${urlRequest}/login`, data1)
    // history.push('/home');
    // window.location.reload();
  }
  const onFailure = () => {
    console.log("Something went wrong");
  }



  //iniciar servicio de google
  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      })
    }
    gapi.load("client:auth2", start)

  }, [])

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (password.length < 7) {
      setError2("*Contraseña no valida");

    } else {
      setError2("");

    }
    setPassword(newPassword);
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
          if (response.status === 200) {
            localStorage.setItem('access_token',response.data.access_token);
            const decoded = jwt.decode(response.data.access_token);
            localStorage.setItem('role',decoded.sub);
            history.push('/home');
            window.location.reload();
          }

        })
        .catch(error => {
          setError2("Correo o contraseña incorrecta");
        });

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
                  <img src={userU} alt="Imagen ingreso" className="input-icon" />
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
                  {error2 && <span className="text-validate">{error2}</span>}
                </div>
                <Button
                  type="submit"
                  variant="INICIAR SESIÓN"
                  className="button-red"
                  onClick={handleSubmit}
                >
                  INICIAR SESIÓN
                </Button>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>ó</p>
                <GoogleLogin
                  clientId={clientID}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  buttonText="Continue  with Google"
                  cookiePolicy={"single_host_origin"}

                />
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
