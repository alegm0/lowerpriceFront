import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Card, Col, Container, Row } from "react-bootstrap";
import Button from '@restart/ui/esm/Button';
import loginImg from "../../assets/img/loginIcon.png";
import logo from "../../assets/img/Imagen3.svg";
import { urlRequest } from '../../urlRequest';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Register.css';
import useru from "../../assets/img/user.png";
import emailu from "../../assets/img/email.png";
import passwordu from "../../assets/img/forgot.png";
import repeat from "../../assets/img/repeat.png";
import uc from "../../assets/img/userchange.png";

//new
import Select from "react-select";


function Register() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [error2, setError2] = useState("");

  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");

  const [validationPassword, setValidationPassword] = useState("");
  const [error5, setError5] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [error6, setError6] = useState("");


  const options = [
    // { value: "opcion1", label: "" },
    { value: "opcion2", label: "Natural" },
    { value: "opcion3", label: "Compañia" }
  ];

  const history = useHistory();
  const validateInputs = {
    name: false,
    email: false,
    password: false,
    document_number: false
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError2("*Correo no valido");
    } else {
      setError2("");
    }
    setEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError2(
        "*Campo > de 8 caracteres"
      );
    } else {
      setError2("");
    }
    setPassword(newPassword);
  };

  const handleValidationPasswordChange = (e) => {
    const newvalidationPassword = e.target.value;
    setValidationPassword(newvalidationPassword);
  };

 
  function handleInputChange(selectedOption) {
    setSelectedOption(selectedOption);
  }



  const handleUserChange = (e) => {
    const newUser = e.target.value;
    setPassword(newUser);
  };



  const [errorsInputs, setErrorsInputs] = useState({ ...validateInputs });
  const [submit, setSubmit] = useState(false)
  const [register, setRegister] = useState({
    name: '',
    document_number: 0,
    email: '',
    password: ''
  });
  


  const customStyles = {
    control: (base) => ({
      ...base,

      border: '1px solid #2888FF',
      borderRadius: '30px',
      fontsize: '16px',
      width: '400px',
      height: '50px',
      flex: '1',
      dispose: 'flex',
      fontsize: '16px',
      padding: '0.5rem 0.5rem 0.5rem 0.8rem',
      backgroundcolor: 'White',
      outline: 'none',
      right: '20px',
      textalign:'center',
      

    }),
    menu: (provided) => ({
      ...provided,
      fontsize: '16px',
      padding: '0.5rem 0.5rem 0.5rem 0.8rem',
      outline: 'none',
      border: '1px solid #2888FF',
      borderRadius: '30px',
      fontsize: '16px',
      width: '400px',



    }),
    menuList: (provided) => ({
      ...provided,
      borderRadius: '30px',
    }),
    option: (provided) => ({
      ...provided,
      borderRadius: '30px',
    }),



  };




  useEffect(() => {

    if (submit) validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register, submit]);


  const validate = () => {
    const errors = { ...validateInputs };
    Object.keys(errors).forEach((e) => {


      // if (!register[e] && e !== 'name') errors[e] = true;
      // if (!register[e] && e !== 'email') errors[e] = true;
      // if (!register[e] && e !== 'password') errors[e] = true;
      // if (!register[e] && e !== 'user') errors[e] = true;


    });
    setErrorsInputs(errors);
    return Object.values(errors).some(x => String(x).includes(true));
  }

  const onChange = (e) => {
    setRegister({
      ...register, [e.target.name]: e.target.value
    });
  }

  //mensajes de error condiciones
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("*Email mal digitado");
    } else {
      setError("");

    }
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (password.length < 8) {
      setError2("*Contraseña no valida");
    }
    else {
      setError2("");
    }
    if (name === "") {
      setError3("*Campo no vacio");
    } else {
      setError3("");
    }
    if (!selectedOption) {
      setError4("*Elija 1 opcion");
    } else {
      setError4("");
    }
    if (validationPassword==="") {
      setError6("*Campo > de 8 caracteres");
    } else {
      setError6("");
    }
    if (password !== validationPassword) {
      setError5("*Contraseñas no coinciden");
    } else {
      setError5("");
    }

  };

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

      <Row className="h-100-vh align-items-center">
        <Col className="d-none-mobile">
          <img src={loginImg} alt="Imagen ingreso" className="image-size" />
        </Col>
        <Col className="col-height">
          <Card className="panel-white">
            <Card.Body>

              <Card.Title className="panel-white-title">Registrate</Card.Title>

              <form onSubmit={handleSubmit}>
                <div className="flex-inputs">
                  <img src={useru} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="text"
                    placeholder="Ingrese su nombre"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                  {error3 && <span className="text-validate">{error3}</span>}
                </div>

                <div className="flex-inputs">
                  <img src={useru} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="text"
                    placeholder="Ingrese su numero de documento"
                    name="document_number"
                    value={name}
                    onChange={handleNameChange}
                  />
                  {error3 && <span className="text-validate">{error3}</span>}
                </div>

                <div className="flex-inputs last-input-margin">
                  <img src={emailu} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="text"
                    placeholder="Ingrese su correo electronico"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {error && <span className="text-validate">{error}</span>}
                </div>

                <div className="flex-inputs last-input-margin">
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
                
                <div className="flex-inputs last-input-margin">
                  <img src={repeat} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="password"
                    placeholder="Ingrese nuevamente su contraseña"
                    name="validationPassword"
                    value={validationPassword}
                    onChange={handleValidationPasswordChange}
                  />
                  {error5 && error6 &&<span className="text-validate">{error5}</span>}
                </div>

                <div className="flex-inputSelect last-input-margin" >
                  <img src={uc} alt="Imagen ingreso" className="input-iconu" />
                  <Select
                    value={selectedOption}
                    onChange={handleInputChange}
                    options={options}
                    styles={customStyles}
                  />
                  {error4 && <span className="text-validate">{error4}</span>}
                </div>

                <Button type="submit" variant="REGISTRARSE" className="button-red1 last-input-margin" onClick={() => onSubmit()}>REGISTRARSE</Button>
                <p className="login__without-account" >Si tienes una cuenta <a href='/'>inicia sesión aquí</a>.</p>
              
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

}

export default Register;