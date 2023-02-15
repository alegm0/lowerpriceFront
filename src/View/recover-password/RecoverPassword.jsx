import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "@restart/ui/esm/Button";
import { Col, Container, Row } from "react-bootstrap";
import recoverImg from "../../assets/img/recuperarCimg.svg";
import logo from "../../assets/img/logo.svg";

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

    return "Para recuperar tu contraseña ingresa el correo electrónico con el que te registraste.";
  };

  const validateButtonText = () => {
    if (validCode) return "GUARDAR";
    if (search) return "VERIFICAR";
    return "ENVIAR";
  };

  return (
    <Container className="full-width">
      <Row>
        <Col className="background-red col-height">
          <h1 className="main__title">¡Recupera tu contraseña!</h1>
          <p className="main__description">
            Para brindarte un mejor servicio, necesitamos que continues los
            siguientes pasos, para poder cambiar tu contraseña.
          </p>
          <img src={recoverImg} alt="Imagen de recuperar contraseña" className="image-size" />
        </Col>
        <Col className="col-height">
          <img className="main__image" src={logo} alt="MBShop Logo" />
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
              <label className="label-input">
                Código {search ? "verficación" : "estudiantil"}:
              </label>
              <input
                className="input"
                type="text"
                placeholder={`Ingrese ${search ? "el" : "su"} código`}
                onChange={(e) => {
                  handleChange(e);
                }}
                maxLength={6}
              />
            </div>
          )}

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
              className="button-red recover-password__button-margin"
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
              <a className="login__without-account--link" href="/login">
                iniciar sesión
              </a>
              ?
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default RecoverPassword;
