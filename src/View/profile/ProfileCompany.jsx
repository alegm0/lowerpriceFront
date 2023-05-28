import React, { useState, useEffect} from "react";
import { useHistory } from "react-router";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import iconDelete from '../../assets/img/navbar/icono-eliminar.svg';

import "./Profile.css";
import axios from "axios";
import { urlRequest } from "../../urlRequest";
import Swal from "sweetalert2";


function ProfileCompany() {

    // Guardar data necesaria para el from
    const [country, setCountry] = useState([]);
    const [department, setDepartment] = useState([]);
    const [city, setCity] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const history = useHistory();

    //Validar que oprimio el boton "Guardar"
    const [submit, setSubmit] = useState(false);

    //Lenar los state de informacion necesaria 
    useEffect(() => {
        getInformation();
        getDocumentType();
        getCountry();
        getDepartment();
        getCity();
    }, []);

    //Data Information profile person
    const [information, setInformation] = useState({
        name: '',
        email: '',
        phone: 0,
        website: '',
        size_company: '',
        is_active: true,
        address_description: '',
        city_id: 0,
        country_id: 0,
        department_id: 0,
        payment_methods: []
    });

    const [paymentMethodData, setPaymentMethodData] = useState({
        id: 0,
        company_id: 1
    });
    const [listPaymentMethod, setListPaymentMethod] = useState([]);

    const validateInputsInformation = {
        name: false,
        email: false,
        is_active: false,
    }
    const [errorsInputs, setErrorsInputs] = useState({...validateInputsInformation});
    //UseEffect  para validar los campos
    useEffect(() => {
        if (submit) validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[information, submit]);

    const onChange = (e) => {
        if (e.target.name === 'is_active') {
            setInformation({...information, [e.target.name]: e.target.value.includes(true)});
        }else {
            setInformation({...information, [e.target.name]: e.target.value});
        }
    }

    const getInformation = () => {
        axios.get(`${urlRequest}/company/1`)
        .then(function (response) {
          setInformation(response.data.data);
          setListPaymentMethod(response.data.data.payment_methods || []);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const getCity = () => {
        axios.get(`${urlRequest}/utils/cities`)
        .then(function (response) {
            setCity(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const getDepartment = () => {
        axios.get(`${urlRequest}/utils/departments`)
        .then(function (response) {
            setDepartment(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const getCountry = () => {
        axios.get(`${urlRequest}/utils/countries`)
        .then(function (response) {
            setCountry(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const getDocumentType = () => {
        axios.get(`${urlRequest}/utils/payment-method`)
        .then(function (response) {
            setPaymentMethod(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const validate = () => {
        const errors = {...validateInputsInformation};
        Object.keys(errors).forEach((e) => {
          errors[e] = !information[e] ? '*Campo es obligatorio' : '';
        });
        setErrorsInputs(errors);
        return Object.values(errors).some(x => typeof x === 'string' ? !!x : !!x.name );
    } 

    const onSubmitInformation = () => {
        setSubmit(true);
        if (!validate()) {
            axios.put(`${urlRequest}/company/update/1`, information)
            .then(function (response) {
              if (response.status === 201) {
                Swal.fire({
                  title: '¡Actualizacion exitosa!',
                  text: 'Se ha actualizado tu informacion.',
                  icon: 'success',
                  confirmButtonText: "Continuar", 
                  confirmButtonColor: 'rgb(157 160 223)',
                }).then(resultado => {
                    history.push('/profile-company');
                });
              } else {
                Swal.fire({
                  title: '¡Error!',
                  text: 'Se ha generado un erro al actualizar un producto.',
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

    const onSubmitPaymentMethod = () => {
        axios.post(`${urlRequest}/company/payment-methods`,[...listPaymentMethod, paymentMethodData].map(({id}) => ({ payment_method_id: id, company_id: 1}))).then(() => {
            getInformation();
            setPaymentMethodData({
                id: 0,
                company_id: 1
            });
        }).catch(e => console.log(e));
    }
    
    const onDeletePaymentMethod = (id) => {
        axios.delete(`${urlRequest}/company/payment-methods/${id}`).then(() => {
            getInformation();
        }).catch( e => console.log(e));
    }


    return (
        <div className="body-view">
            <Container>
                <h2 className="title">Perfil</h2>
                <p className="subtitle">Para poder editar el perfil debe llenar todos los espacios que contengan él (*), adicionalmente si desea agregar los métodos de pagos, sus respectivas direcciones</p>
            <Row>
                <Col lg={3}>
                    <h4 className="subdivision">Información personal</h4>
                </Col>
                <Col lg={9}>
                    <hr style={{borderColor: "white", marginTop: "32px"}}></hr>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Nombre (*)</p>
                    <input
                        className="input inputs-class"
                        name="name"
                        type="text"
                        placeholder="Ingrese su nombre"
                        value={information.name}
                        onChange={(e) => onChange(e)}
                    />
                    {errorsInputs.name && <span className="text-validate">*Campo requrido</span>}
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Telefono</p>
                    <input
                        className="input inputs-class"
                        name="phone"
                        type="text"
                        placeholder="Ingrese su telefono"
                        value={information.phone}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Email (*)</p>
                    <input
                        className="input inputs-class"
                        name="email"
                        type="text"
                        placeholder="Ingrese su email"
                        value={information.email}
                        onChange={(e) => onChange(e)}
                        disabled
                        style={{backgroundColor: "#d0d0d0"}}
                    />
                    {errorsInputs.email && <span className="text-validate">*Campo requrido</span>}
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Pagina web</p>
                    <input
                        className="input inputs-class"
                        name="website"
                        type="text"
                        placeholder="Ingrese su pagina web"
                        value={information.website}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                </Col>
                
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Tamaño de la compañia</p>
                    <input
                        className="input inputs-class"
                        name="size_company"
                        type="text"
                        placeholder="Ingrese el tamaño de la compañia"
                        value={information.size_company}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Estado</p>
                    <select className="input inputs-class" name="is_active" value={information.is_active} onChange={(e) => onChange(e)}>
                        <option value={true}>Activo</option>
                        <option value={false}>Inactivo</option>
                    </select>
                    {errorsInputs.is_active && <span className="text-validate">*Campo requrido</span>}
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Direccion de la compañia (*)</p>
                    <input
                        className="input inputs-class"
                        name="address_description"
                        type="text"
                        placeholder="Ingrese la direccion de la compañia"
                        value={information.address_description}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Pais</p>
                    <select className="input inputs-class" name="country_id" value={information.country_id} onChange={(e) => onChange(e)}>
                        <option value="">Seleccione una opcion</option>
                        {country.map(({id, name}) => (
                            <option value={id}>{name}</option>
                        ))}
                    </select>
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Departamento </p>
                    <select className="input inputs-class" name="department_id" onChange={(e) => onChange(e)} value={information.department_id}>
                        <option value="option1">Seleccione una opcion</option>
                        {department.map(({id, name}) => (
                            <option value={id}>{name}</option>
                        ))}
                    </select>
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Ciudad </p>
                    <select className="input inputs-class" name="city_id" onChange={(e) => onChange(e)} value={information.city_id}>
                        <option value="option1">Seleccione una opcion</option>
                        {city.map(({id, name}) => (
                            <option value={id}>{name}</option>
                        ))}
                    </select>
                </div>
                </Col>
            </Row>
            <Row>
            <Col lg={12} className="content-product content-body-home mt-5">
                <Button className="button-purple-home" onClick={(e) => (onSubmitInformation(e))}>
                    Guardar
                </Button>
            </Col>
            </Row>
            <Row className="mt-4">
                <Col lg={5}>
                    <h4 className="subdivision">Informacion de metodos de pago recibido</h4>
                </Col>
                <Col lg={7}>
                    <hr style={{borderColor: "white", marginTop: "32px"}}></hr>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Metodo de pago (*)</p>
                    <select className="input inputs-class" name="id" onChange={({ target: { name, value } }) => setPaymentMethodData({...paymentMethodData, [name]: value})} value={paymentMethodData.id}>
                        <option>Seleccione su metodo de pago</option>
                        {paymentMethod.map(({id, name}) => {
                            const className = listPaymentMethod.some(({ id: idP }) => idP === id) ? 'd-none' : '';
                            return <option value={id} className={className}>{name}</option>
                        })}
                    </select>
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <Button className="button-purple-home mt-5" onClick={() => onSubmitPaymentMethod()}>
                    Guardar
                </Button>
                </Col>
            </Row>
            <Row>
                {listPaymentMethod.map((item, index) => (
                    <Col lg={4} md={6} sm={12} className="m-3" key={index}>
                        <Card style={{ width: '389px', borderRadius:"40px", height:"110px"}}>
                            <Card.Body>
                                <Card.Title>
                                    <Row className="justify-content-center align-items-center">
                                        <Col lg={6} className="mt-2">
                                            <p className="textCard" style={{marginBottom: '0px !important'}}>{item.name}</p>
                                        </Col>
                                        <Col lg={6} className="mt-2">
                                            <img src={iconDelete} alt="edit" style={{width: "20%"}} onClick={() => {onDeletePaymentMethod(item.id)}}/>
                                        </Col>
                                    </Row>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </Container>
        </div>
    );
}
export default ProfileCompany;