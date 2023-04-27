import React, { useState, useEffect} from "react";
import { useHistory } from "react-router";
import Button from "@restart/ui/esm/Button";
import { Card, Col, Container, Row } from "react-bootstrap";
import emailu from "../../assets/img/email.png";
import { urlRequest } from "../../urlRequest";
import loginImg from "../../assets/img/passwordImage.png";
import axios from "axios";
import Swal from "sweetalert2";
import passwordu from "../../assets/img/forgot.png";
import repeat from "../../assets/img/repeat.png";
import { useLocation } from "react-router-dom";

function RecoverPassword() {
  const history = useHistory();
  const { search }  = useLocation();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (search) {
      const [,token] = search.split('token=');
      setStep(2);
      setSavePassword({...savePassword, token});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  //Step == 2
  const validateInputs = {
    password: '',
    passwordRepeat: ''
  }

  const [errorsInputs, setErrorsInputs] = useState({...validateInputs});
  const [savePassword, setSavePassword] = useState({
    password: '',
    passwordRepeat: '',
    token: ''
  });

  const onChange = (e) => {
    setEmail(e.target.value);
  }

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (error === '') {
      setError('*Campo es obligatorio');
    } else if (!emailRegex.test(email)) {
      setError('*Correo no valido');
    }else {
      setError('');
    }
    return Object.values(error).some( x => x);
  }

  const onSubmit = () => {
    if (!validate()) {
      axios.get(`${urlRequest}/resetPassword/${email}`)
      .then(function (response) {
        if (response.status === 200) {
          Swal.fire({
            title: '¡Envio exitoso!',
            text: 'Se ha enviado un correo a tu email, por favor verifica',
            icon: 'success',
            confirmButtonText: "Continuar", 
            confirmButtonColor: 'rgb(157 160 223)',
          }).then(resultado => {
              history.push('/');
          });
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'Se ha generado un error al enviar el correo',
            icon: 'error',
            confirmButtonText: "Continuar", 
            confirmButtonColor: 'rgb(157 160 223)',
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  
  const onChangeSave = (e) => {
    setSavePassword({...savePassword, [e.target.name]: e.target.value});
  }

  const validateSave = () => {
    const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    const errors = {...validateInputs};

    Object.keys(errors).forEach((e) => {
      errors[e] = !savePassword[e] ? '*Campo es obligatorio' : '';
    });
    errors['password'] = !contrasenaRegex.test(savePassword.password) ? '*La contraseña no es valida' : '';
    errors['passwordRepeat'] = savePassword.password !== savePassword.passwordRepeat ? '*La contraseña coincide' : '';
    setErrorsInputs(errors);
    return Object.values(errors).some( x => x);
  }

  const onSubmitSave = () => {
    if (!validateSave()) {
      axios.post(`${urlRequest}/savePassword`, savePassword)
      .then(function (response) {
        if (response.status === 201) {
          Swal.fire({
            title: '¡Su contraseña se ha actualizado exitosamente!',
            text: 'Ya se actualizo la contraseña, vuelve a intentar iniciar sesion',
            icon: 'success',
            confirmButtonText: "Continuar", 
            confirmButtonColor: 'rgb(157 160 223)',
          }).then(resultado => {
              history.push('/');
          });
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'Se ha generado un error al actualizar tu contraseña',
            icon: 'error',
            confirmButtonText: "Continuar", 
            confirmButtonColor: 'rgb(157 160 223)',
          });
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
        <Col className="background-red">
          <img src={loginImg} alt="Imagen de recuperar contraseña" className="image-size" />
        </Col>
        <Col className="col-height">
        <Card className="panel-white">
        <Card.Body>
        <Card.Title className="panel-white-title">Recupera tu cuenta!</Card.Title>
          {step === 1 && (
            <>
            <p className="recover-password__text">Ingresa tu correo electrónico para buscar tu cuenta.</p>
              <div className="flex-inputs last-input-marginRegister">
                  <img src={emailu} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="text"
                    placeholder="Ingrese su correo electronico"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                  {error && <span className="text-validate">{error}</span>}
              </div>
              <Container>
                <Row>
                  <Col lg={5} className="mt-4 mr-2 ml-4">
                    <Button type="submit" variant="CANCELAR" style={{width:"165px"}} className="button-red1 last-input-marginRegister" onClick={() => history.push('/')}>Cancelar</Button>
                  </Col>
                  <Col lg={5}  className="mt-4 ml-2">
                    <Button type="submit" variant="ENVIAR" style={{width:"165px"}} className="button-red1 last-input-marginRegister" onClick={onSubmit}>Enviar</Button>
                  </Col>
                </Row>
              </Container>
            </>
          )}
          {step === 2 && (
            <>
            <p className="recover-password__text">Ingresa tu contraseña nueva</p>
            <div className="flex-inputs last-input-marginRegister">
                  <img src={passwordu} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    name="password"
                    value={savePassword.password}
                    onChange={(e) => onChangeSave(e)}
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
                    value={savePassword.passwordRepeat}
                    onChange={(e) => onChangeSave(e)}
                  />
                  {errorsInputs.passwordRepeat && <span className="text-validate">{errorsInputs.passwordRepeat}</span>}
                </div>
                <div className="mt-4">
                  <Button type="submit" variant="ENVIAR" style={{width:"165px"}} className="button-red1 last-input-marginRegister" onClick={onSubmitSave}>Enviar</Button> 
                </div>
            </>
          )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
}

export default RecoverPassword;
