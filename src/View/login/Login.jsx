import React, { useState } from "react";
import { useHistory } from "react-router";
import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
//import loginImg from "../../assets/img/loginImg.svg";
import loginImgI from "../../assets/img/loginIcon.png";
//import logo from "../../assets/img/logo.svg";
import user from "../../assets/img/email.png";
import password from "../../assets/img/forgot.png";



function Login() {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({ student_code: "", password: "" });
  const [validate, setValidate] = useState(false);

  const handleChangeInfo = (e) => {
    const { name, value } = e?.target;
    setValidate(false);
    setUserInfo({ ...userInfo, [name]: value });
  };

  const login = () => {
    if (
      (userInfo.student_code === "RogerUMB" &&
        userInfo.password === "Test1234") ||
      (userInfo.student_code === "JulianUMB" &&
        userInfo.password === "Test1234") ||
      (userInfo.student_code === "BrayanUMB" && userInfo.password === "Test1234")
    ) {
      setValidate(false);
      history.push("/home");
    } else {
      setValidate(true);
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
              <div className="flex-inputs container-inputs-login">
                <img src={user} alt="Imagen ingreso" className="input-icon" />
                <input
                  className="input"
                  type="text"
                  placeholder="Ingrese su correo"
                  name="student_code"
                  onChange={(e) => handleChangeInfo(e)}
                  value={userInfo?.student_code || ""}
                />
              </div>
              <div className="flex-inputs last-input-margin container-inputs-login">
                <img src={password} alt="Imagen ingreso" className="input-icon" />
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
              <Button
                variant="INICIAR SESIÓN"
                className="button-red"
                onClick={() => login()}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
