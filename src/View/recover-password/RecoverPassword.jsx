import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "@restart/ui/esm/Button";
import { Card, Col, Container, Row } from "react-bootstrap";
import recoverImg from "../../assets/img/Imagen4.svg";
import logo from "../../assets/img/Imagen3.svg";
import email from "../../assets/img/email.png";
import loginImg from "../../assets/img/passwordImage.png";

function RecoverPassword() {
  const history = useHistory();
  const { search } = window.location;
  const validCode = search === "?valid-code";
  const saveInfo = search === "?save-new-password";

  const [codeVerification, setCodeVerification] = useState("");

  const handleChange = (e) => setCodeVerification(e.target.value);

  const actionButton = () => {
    if (validCode) return history.push("/recover-password?save-new-password");

    return (
      codeVerification === "code34" &&
      history.push("/recover-password?valid-code")
    );
  };

  const validateText = () => {
    if (validCode) return "Ingresa la nueva contraseña que deseas establecer.";

    if (search)
      return "Ingresa el codigo de verificacion que enviamos a tu correo electronico para cambiar tu contraseña.";

    return "Ingresa tu correo electrónico para buscar tu cuenta.";
  };

  const validateButtonText = () => {
    if (validCode) return "GUARDAR";
    if (search) return "VERIFICAR";
    return "Enviar";
  };


  return (
    <Container className="full-width">
      <Row className="h-100-vh align-items-center">
        <Col className="background-red col-height">
          <img src={loginImg} alt="Imagen de recuperar contraseña" className="image-size" />
        </Col>
        <Col className="col-height">

        <Card className="panel-white">
        <Card.Body>
        <Card.Title className="panel-white-title">Recupera tu cuenta!</Card.Title>
      

            <p className="recover-password__text">{validateText()}</p>

            {validCode && (
              <>
                <div className="flex-inputs">
                  <label className="label-input">Contraseña nueva:</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Ingrese su contraseña nueva"
                  />
                </div>

                <div className="flex-inputs last-input-margin">
                  <label className="label-input">Verificar contraseña:</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Ingrse de nuevo la contraseña nueva"
                  />
                </div>
              </>
            )}

            {!validCode && !saveInfo && (
              <div className="flex-inputs">
                <img src={email} alt="Imagen ingreso" className="input-icon" />
                <input
                  className="input"
                  type="text"
                  placeholder={`Ingrese su correo`}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  maxLength={6}
                />
              </div>
            )}

            {/* <Button  className="button-red last-input-margin" href="/login">Cancelar</Button> */}
            <Button className="botonp" href='/'>Cancelar</Button>

            {saveInfo && (
              <div className="box-green">
                <p>
                  Tu contraseña se ha modificado correctamente

                  <a href="/login" className="link-green">
                    haga click aquí para iniciar sesión
                  </a>
                  .
                </p>
              </div>
            )}

            {(!search || validCode) && !saveInfo && (
              <Button
                className="botonp recover-password__button-margin"
                onClick={() => {
                  actionButton();
                }}
              >
                {validateButtonText()}
              </Button>
            )}

            {!search && (
              <p className="login__without-account">
                ¿Quieres volver a &nbsp;
                <a className="login__without-account--link" href="/">
                  iniciar sesión
                </a>
                ?
              </p>
            )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RecoverPassword;
