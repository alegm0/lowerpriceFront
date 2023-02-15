import React, { useState } from "react";
import { useHistory } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import loginImg from "../../assets/img/loginImg.svg";
import logo from "../../assets/img/logo.svg";

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
      <Row>
        <Col className="background-red col-height">
          <h1 className="main__title">¡Ingresa ya!</h1>
          <p className="main__description">
            Te brindamos el servicio para mejorar tu organización en cada una de
            tus compras, es importante para nosotros hacer tu vida mucho mas
            sencilla.
          </p>
          <img src={loginImg} alt="Imagen ingreso" className="image-size" />
        </Col>
        <Col className="col-height">
          <img className="main__image" src={logo} alt="MBShop Logo" />
          <p className="main__text">Ingrese los siguientes datos</p>

          <div className="flex-inputs">
            <label className="label-input">Código estudiantil:</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese su código"
              name="student_code"
              onChange={(e) => handleChangeInfo(e)}
              value={userInfo?.student_code || ""}
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
