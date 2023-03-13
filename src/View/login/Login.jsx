import React, { useState } from "react";
import { useHistory } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import loginImg from "../../assets/img/loginImg.svg";
import loginImgI from "../../assets/img/loginIcon.png";
import logo from "../../assets/img/logo.svg";
import user from "../../assets/img/email.png";
import password from "../../assets/img/forgot.png";
import './login.css';


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


          <img src={loginImgI} alt="Imagen ingreso" className="image-size" />
        </Col>
        <Col className="col-height">
          <div className="panel-white">
           
            <h1>Iniciar Sesion</h1>
            <p className="main__text">Ingrese los siguientes datos</p>

            <div className="flex-inputs">

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

            <div className="flex-inputs last-input-margin">
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
              ¿No tienes una cuenta? <a href="/register">registrate aquí</a>.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
