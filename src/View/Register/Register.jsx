import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';
import loginImg from "../../assets/img/Imagen2.svg";
import logo from "../../assets/img/Imagen3.svg";
import { urlRequest } from '../../urlRequest';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register() {
  const history = useHistory();
  const validateInputs = {
    name: false,
    email:false,
    document_number: false,
    password: false
  };
  const [errorsInputs, setErrorsInputs] = useState({...validateInputs});
  const [submit, setSubmit] = useState(false) 
  const [register, setRegister] = useState({
    name: '',
    email:'',
    document_number: 0,
    password: ''
  });

  useEffect(() => {
    if (submit) validate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[register, submit]);

  const validate = () => {
    const errors = {...validateInputs};
    Object.keys(errors).forEach((e) => {
      if (!register[e] && e !== 'name') errors[e] = true;
      if (!register[e] > 0 && e !== 'document_number') errors[e] = true;
    });
    setErrorsInputs(errors);
    return Object.values(errors).some( x => String(x).includes(true));
  } 

  const onChange = (e) => {
    setRegister({...register, [e.target.name]: e.target.value});
  }
  
  const onSubmit = () => {
    setSubmit(true);
    if (!validate()) {
        axios.post(`${urlRequest}/register`, register)
        .then(function (response) {
          if (response.status === 201) {
            Swal.fire({
              title: '¡Registro exitoso!',
              text: 'Se ha creado tu perfil',
              icon: 'success',
              confirmButtonText: "Continuar", 
              confirmButtonColor: 'rgb(40, 136, 255)',
            }).then(resultado => {
                history.push('/home');
            });
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'Se ha generado un error al crear tu perfil',
              icon: 'error',
              confirmButtonText: "Continuar", 
              confirmButtonColor: 'rgb(255, 146, 158)',
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
      <Row>
        <Col className="background-red col-height">
          <h1 className="main__title">¡Regístrate ya!</h1>
          <p className="main__description">Te brindamos el servicios para mejorar tu organizacion  en cada
            una de tus compras, es importante para nosotros hacer tu vida
            mucho mas sencillas.</p>
          <img src={loginImg} alt="Imagen ingreso" className="image-size" />
        </Col>
        <Col className="col-height">
          <img className="main__image" src={logo} alt="MBShop Logo" />

          <div className="flex-inputs">
            <label className="label-input">Nombre:</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese su nombre"
              name="name"
              value={register.name}
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.name && <span className="text-validate">*Campo requrido</span>}
          </div>
          <div className="flex-inputs last-input-margin">
            <label className="label-input">Numero de documento:</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese su numero de documento"
              name="document_number"
              value={register.document_number}
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.document_number && <span className="text-validate">*Campo requrido</span>}
          </div>
          <div className="flex-inputs last-input-margin">
            <label className="label-input">Correo electronico:</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese su correo electronico"
              name="email"
              value={register.email}
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.email && <span className="text-validate">*Campo requrido</span>}
          </div>
          <div className="flex-inputs last-input-margin">
            <label className="label-input">Contraseña:</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese su contraseña"
              name="password"
              value={register.password}
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.document_number && <span className="text-validate">*Campo requrido</span>}
          </div>
          {/* <div className="flex-inputs last-input-margin">
            <label className="label-input">Confirmar contraseña:</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese su confirmar contraseña"
            />
          </div> */}

          <Button variant="REGISTRARSE" className="button-red last-input-margin" onClick={() => onSubmit()}>REGISTRARSE</Button>

          <p className="login__without-account">Si tienes una cuenta <a href='/'>inicia sesión aquí</a>.</p>
        </Col>
      </Row>
    </Container>
  );

}

export default Register;