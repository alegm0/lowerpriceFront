import React, { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { useHistory } from 'react-router';
import { Card, Col, Container, Row } from "react-bootstrap";
import Button from '@restart/ui/esm/Button';
import loginImg from "../../assets/img/loginIcon.png";
import { urlRequest } from '../../urlRequest';
import axios from 'axios';
import './Register.css';
import useru from "../../assets/img/user.png";
import emailu from "../../assets/img/email.png";
import passwordu from "../../assets/img/forgot.png";
import repeat from "../../assets/img/repeat.png";
import idc from "../../assets/img/id.png";


function Register() {
  const validateInputs = {
    name: '',
    document_number: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role: ''
  }



  const [errorsInputs, setErrorsInputs] = useState({ ...validateInputs });
  const history = useHistory();
  const [register, setRegister] = useState({
    name: '',
    document_number: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role: 0
  });

  const onChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  }
  const clientID = "240204035171-nola6klc59kianch63n8vpq88k42kv1j.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const onSuccess = (response) => {
    console.log(response)
    setUser(response.profileObj);
    document.getElementsByClassName("btn").hidden = true;
    const data1 = {
      name: user.givenName,
      document_number: user.googleId,
      email: user.email,
      password: user.googleId,
      passwordRepeat: user.googleId,
      role: 0
    };
    history.push('/home');
    //axios.post(`${urlRequest}/register`, data1)

  }
  const onFailure = () => {
    console.log("Something went wrong");
  }
  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      })
    }
 
    gapi.load("client:auth2", start)

  }, [])

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    const errors = { ...validateInputs };

    Object.keys(errors).forEach((e) => {
      errors[e] = !register[e] ? '*Campo es obligatorio' : '';
    });


    errors['email'] = !emailRegex.test(register.email) ? '*Correo no valido' : '';
    errors['password'] = !contrasenaRegex.test(register.password) ? '*La contraseña no es valida' : '';
    errors['passwordRepeat'] = register.password !== register.passwordRepeat ? '*La contraseña coincide' : '';
    setErrorsInputs(errors);
    return Object.values(errors).some(x => x);
  }

  const onSubmit = () => {
    if (!validate()) {
      axios.post(`${urlRequest}/register`, register)
        .then(function (response) {
          if (response.status === 201) {
            history.push('/');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <Container className="full-width">

      <Row className="h-100-vh align-items-center">
        <Col className="d-none-mobile">
          <img src={loginImg} alt="Imagen ingreso" className="image-size" />
        </Col>
        <Col className="col-height">
          <Card className="panel-white">
            <Card.Body>

              <Card.Title className="panel-white-title">Registrate</Card.Title>

              {/* <form onSubmit={onSubmit}> */}
              <div className="flex-inputs last-input-marginRegister">
                <img src={useru} alt="Imagen ingreso" className="input-icon" />
                <input
                  className="input"
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="name"
                  value={register.name}
                  onChange={(e) => onChange(e)}
                />
                {errorsInputs.name && <span className="text-validate">{errorsInputs.name}</span>}
              </div>

              <div className="flex-inputs last-input-marginRegister">
                <img src={idc} alt="Imagen ingreso" className="input-icon" />
                <input
                  className="input"
                  type="number"
                  placeholder="Ingrese su numero de documento"
                  name="document_number"
                  value={register.document_number}
                  onChange={(e) => onChange(e)}
                />
                {errorsInputs.document_number && <span className="text-validate">{errorsInputs.document_number}</span>}
              </div>

              <div className="flex-inputs last-input-marginRegister">
                <img src={emailu} alt="Imagen ingreso" className="input-icon" />
                <input
                  className="input"
                  type="text"
                  placeholder="Ingrese su correo electronico"
                  name="email"
                  value={register.email}
                  onChange={(e) => onChange(e)}
                />
                {errorsInputs.email && <span className="text-validate">{errorsInputs.email}</span>}
              </div>

              <div className="flex-inputs last-input-marginRegister">
                <img src={passwordu} alt="Imagen ingreso" className="input-icon" />
                <input
                  className="input"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  name="password"
                  value={register.password}
                  onChange={(e) => onChange(e)}
                />
                {errorsInputs.password && <span className="text-validate">{errorsInputs.password}</span>}
              </div>

              <div className="flex-inputs last-input-marginRegister">
                <img src={repeat} alt="Imagen ingreso" className="input-icon" />
                <input
                  className="input"
                  type="password"
                  placeholder="Ingrese nuevamente su contraseña"
                  name="passwordRepeat"
                  value={register.passwordRepeat}
                  onChange={(e) => onChange(e)}
                />
                {errorsInputs.passwordRepeat && <span className="text-validate">{errorsInputs.passwordRepeat}</span>}
              </div>

              <div className="flex-inputs last-input-marginRegister" >
                <img src={useru} alt="Imagen ingreso" className="input-icon" />
                <select className="input" name="role" onChange={(e) => onChange(e)} value={register.role}>
                  <option value="">Seleccione el rol</option>
                  <option value="1">Cliente</option>
                  <option value="2">Empresa</option>
                </select>
                {errorsInputs.role && <span className="text-validate">{errorsInputs.role}</span>}
              </div>
              <Button type="submit"
                variant="REGISTRARSE"
                className="button-red1 last-input-marginRegister"
                style={{ marginTop: "20px" }}
                onClick={onSubmit}>
                REGISTRARSE
            
              </Button>
       
              <p className="login__without-account" >Si tienes una cuenta <a href='/'>inicia sesión aquí</a></p>
              <GoogleLogin
                  clientId={clientID}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  buttonText="Continua con Google"
                  cookiePolicy={"single_host_origin"}
              
                />
              {/* </form> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

}

export default Register;