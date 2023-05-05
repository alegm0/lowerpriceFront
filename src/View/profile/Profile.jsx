import React, { useState, useEffect} from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import iconEdit from '../../assets/img/navbar/icono-editar.svg';
import iconDelete from '../../assets/img/navbar/icono-eliminar.svg';
import { useHistory } from "react-router";
import axios from "axios";
import { urlRequest } from "../../urlRequest";

import "./Profile.css";
import Swal from "sweetalert2";

function Profile() {
    // Guardar data necesaria para el from
    const [documentType, setDocumentType] = useState([]);
    const [country, setCountry] = useState([]);
    const [department, setDepartment] = useState([]);
    const [city, setCity] = useState([]);
    const [companies, setCompanies] = useState([]);
    const history = useHistory();

    //Lenar los state de informacion necesaria 
    useEffect(() => {
        getInformation();
        getDocumentType();
        getCountry();
        getDepartment();
        getCity();
        getCompanies();
        getComplaints();
    }, []);
    
    //Validacion de informacion cliente
    const validateInputsInformation = {
        name: false,
        last_name: false,
        document_type_id: false,
        document_number: false
    }

    //Validacion de direccion
    const validateInputsAddress = {
        city_id: false,
        department_id: false, 
        country_id: false,
        name: false
    }

    //Validacion de Quejas
    const validateInputsComplaints = {
        title: false,
        text: false,
        company_id: false
    }

    const defaultAddress = {
        user_id: 1,
        city_id: 0,
        department_id: 0,
        country_id: 0,
        name: null,
        postal_code: ''
    };

    const defaultComplaints = {
        title: '',
        text: '',
        user_id: 1,
        company_id: 0
    };

    //State para los errores
    const [errorsInputs, setErrorsInputs] = useState({...validateInputsInformation});
    const [errorInputsAddress, setErrorsInputsAddress] = useState({...validateInputsAddress});
    const [errorInputsComplaints, setErrorsInputsComplaints] = useState({...validateInputsComplaints});
    
    //Data Information profile person
    const [information, setInformation] = useState({
        name: '',
        last_name: '',
        document_type_id: '',
        phone: 0, 
        document_number: 0,
        gender_id: 0
    });

    //Data Address
    const [address, setAddress] = useState({...defaultAddress});

    // Data Complaints/Quejas
    const [complaints, setComplaints] = useState({...defaultComplaints});
    const [listComplaint, setListComplaint] = useState([]);

    const [listAddress, setListAddress] = useState([]);
    const [isEditAddress, setIsEditAddress] = useState(false);

    //Validar que oprimio el boton "Guardar"
    const [submit, setSubmit] = useState(false);
    const [submitAddress, setSubmitAddress] = useState(false);
    const [submitComplaints, setSubmitComplaints] = useState(false);

    //UseEffect  para validar los campos
    useEffect(() => {
        if (submit) validate();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[information, submit]);

    useEffect(() => {
        if (submitAddress) validateAddress();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[address, submitAddress]);

    useEffect(() => {
        if (submitComplaints) validateComplaints();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[complaints, submitComplaints]);

    const getInformation = () => {
        axios.get(`${urlRequest}/user/1`)
        .then(function (response) {
          setInformation(response.data.data);
          setListAddress(response.data.data.address);
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
        axios.get(`${urlRequest}/utils/document-type`)
        .then(function (response) {
            setDocumentType(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const getCompanies = () => {
        axios.get(`${urlRequest}/company/all`)
        .then(function (response) {
            setCompanies(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const getComplaints = () => {
        axios.get(`${urlRequest}/complaints/${1}`).then((response) => {
            setListComplaint(response.data.data || []);
        }).catch(e => console.log(e));
    }

    const validate = () => {
        const regex = /^3/;
        const errors = {...validateInputsInformation};
        Object.keys(errors).forEach((e) => {
          errors[e] = !information[e] ? '*Campo es obligatorio' : '';
          if (information[e] === 'phone') {
            console.log(regex.test(information[e]));
        }
        });
        
        setErrorsInputs(errors);
        return Object.values(errors).some(x => typeof x === 'string' ? !!x : !!x.name );
    } 

    const validateAddress = () => {
        const errors = {...validateInputsAddress};
        Object.keys(errors).forEach((e) => {
          errors[e] = !address[e] ? '*Campo es obligatorio' : '';
        });
        setErrorsInputsAddress(errors);
        return Object.values(errors).some(x => typeof x === 'string' ? !!x : !!x.name );
    }

    const validateComplaints = () => {
        const errors = {...validateInputsComplaints};
        Object.keys(errors).forEach((e) => {
          errors[e] = !complaints[e] ? '*Campo es obligatorio' : '';
        });
        setErrorsInputsComplaints(errors);
        return Object.values(errors).some(x => typeof x === 'string' ? !!x : !!x.name );
    }

    const onChange = (e) => {
        setInformation({...information, [e.target.name]: e.target.value});
    }
    
    const onChangeAddress = (e) => {
        setAddress({...address, [e.target.name]: e.target.value});
    }

    const onChangeComplaints = (e) => {
        setComplaints({...complaints, [e.target.name]: e.target.value});
    }

    const onSubmitAddress = () => {
        setSubmitAddress(true);
        if (!validateAddress()) {
            axios.post(`${urlRequest}/user/address`, address)
            .then(function (response) {
              if (response.status === 201) {
                Swal.fire({
                  title: 'Creacion exitosa!',
                  text: 'Se ha creado tu informacion.',
                  icon: 'success',
                  confirmButtonText: "Continuar", 
                  confirmButtonColor: 'rgb(157 160 223)',
                }).then(resultado => {
                    history.push('/profile-clients');
                });
              } else {
                Swal.fire({
                  title: '¡Error!',
                  text: 'Se ha generado un error al crear un direccion.',
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

    const onSubmitInformation = () => {
        setSubmit(true);
        if (!validate()) {
            axios.put(`${urlRequest}/user/update/1`, information)
            .then(function (response) {
              if (response.status === 201) {
                Swal.fire({
                  title: '¡Actualizacion exitosa!',
                  text: 'Se ha actualizado tu informacion.',
                  icon: 'success',
                  confirmButtonText: "Continuar", 
                  confirmButtonColor: 'rgb(157 160 223)',
                }).then(resultado => {
                    history.push('/profile-clients');
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

    const onSubmitComplaints = () => {
        setSubmitComplaints(true);
        if (!validateComplaints()) {
            axios.post(`${urlRequest}/complaints`, complaints).then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                      title: '¡Actualizacion exitosa!',
                      text: 'Se ha actualizado tu informacion.',
                      icon: 'success',
                      confirmButtonText: "Continuar", 
                      confirmButtonColor: 'rgb(157 160 223)',
                    });
                    setComplaints({...defaultComplaints});
                    getComplaints();
                }
            }).catch( e => console.log(e));
        }
    }

    const onEditAddress = () => {
        if (!validateAddress()) {
            axios.put(`${urlRequest}/user/address/update/${address.id}`, address).then((response) => {
                if (response.status === 201) {
                    setAddress({...defaultAddress});
                    getInformation();
                    Swal.fire({
                      title: '¡Actualizacion exitosa!',
                      text: 'Se ha actualizado tu informacion.',
                      icon: 'success',
                      confirmButtonText: "Continuar", 
                      confirmButtonColor: 'rgb(157 160 223)',
                    });
                }
            }).catch((e) => console.log(e));
        }
    }

    const onDeleteAddress = (id) => {
        axios.delete(`${urlRequest}/user/address/delete/${id}`).then((response) => {
            getInformation();
        }).catch((e) => console.log(e))
    }

    const onDeleteComplaints = (id) => {
        axios.delete(`${urlRequest}/complaints/delete/${id}`).then((response) => {
            getComplaints();
        }).catch((e) => console.log(e))
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
                    <p className="title-inputs mt-4 ml-2">Apellido (*)</p>
                    <input
                    className="input inputs-class"
                    name="last_name"
                    type="text"
                    placeholder="Ingrese su apellido"
                    value={information.last_name}
                    onChange={(e) => onChange(e)}
                    />
                 {errorsInputs.last_name && <span className="text-validate">*Campo requrido</span>}
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Tipo de documento (*)</p>
                    <select className="input inputs-class" name="document_type_id" onChange={(e) => onChange(e)} value={information.document_type_id}>
                        <option value="option1">Seleccione la categoria</option>
                        {documentType.map(({id, name}) => (
                            <option value={id}>{name}</option>
                        ))}
                    </select>
                    {errorsInputs.document_type_id && <span className="text-validate">*Campo requrido</span>}
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Telefono</p>
                    <input
                    className="input inputs-class"
                    name="phone"
                    type="number"
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
                    <p className="title-inputs mt-4 ml-2">Numero de documento (*)</p>
                    <input
                    className="input inputs-class"
                    name="document_number"
                    type="number"
                    placeholder="Ingrese su numero de documento"
                    value={information.document_number}
                    onChange={(e) => onChange(e)}
                    />
                    {errorsInputs.document_number && <span className="text-validate">*Campo requrido</span>}
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Genero</p>
                    <select className="input inputs-class" name="gender_id" onChange={(e) => onChange(e, 'category')} value={information.gender_id}>
                        <option>Seleccione...</option>
                        <option value={1}>Masculino</option>
                        <option value={2}>Femenino</option>
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
                <Col lg={4}>
                    <h4 className="subdivision">Informacion de direcciones</h4>
                </Col>
                <Col lg={8}>
                    <hr style={{borderColor: "white", marginTop: "32px"}}></hr>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Dirección (*)</p>
                    <input
                    className="input inputs-class"
                    name="name"
                    type="text"
                    placeholder="Ingrese una dirección"
                    value={address.name}
                    onChange={(e) => onChangeAddress(e)}
                    />
                    {errorInputsAddress.name && <span className="text-validate">*Campo requrido</span>}
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Codigo postal</p>
                    <input
                    className="input inputs-class"
                    name="postal_code"
                    type="number"
                    placeholder="Ingrese el codigo postal"
                    value={address.postal_code}
                    onChange={(e) => onChangeAddress(e)}
                    />
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Pais (*)</p>
                    <select className="input inputs-class" name="country_id" onChange={(e) => onChangeAddress(e)} value={address.country_id}>
                        <option value="option1">Seleccione una opcion</option>
                        {country.map(({id, name}) => (
                            <option value={id}>{name}</option>
                        ))}
                    </select>
                    {errorInputsAddress.country_id && <span className="text-validate">*Campo requrido</span>}
                </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Departamento (*)</p>
                    <select className="input inputs-class" name="department_id" onChange={(e) => onChangeAddress(e)} value={address.department_id}>
                        <option value="option1">Seleccione una opcion</option>
                        {department.map(({id, name}) => (
                            <option value={id}>{name}</option>
                        ))}
                    </select>
                    {errorInputsAddress.department_id && <span className="text-validate">*Campo requrido</span>}
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                <div className="first flex-inputs">
                    <p className="title-inputs mt-4 ml-2">Ciudad (*)</p>
                    <select className="input inputs-class" name="city_id" onChange={(e) => onChangeAddress(e)} value={address.city_id}>
                        <option value="option1">Seleccione una opcion</option>
                        {city.map(({id, name}) => (
                            <option value={id}>{name}</option>
                        ))}
                    </select>
                    {errorInputsAddress.city_id && <span className="text-validate">*Campo requrido</span>}
                </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} className="content-product content-body-home mt-5">
                    <Button className="button-purple-home mb-3" onClick={() => isEditAddress ? onEditAddress() : onSubmitAddress()}>
                        {isEditAddress ? 'Editar' : 'Guardar'}
                    </Button>
                </Col>
            </Row>
            <Row>
                {listAddress.map((item, index) => (
                    <Col lg={3} md={6} sm={12} key={index} className="m-3">
                    <Card style={{ width: '18rem', borderRadius:"40px", height:"300px"}}>
                        <Card.Body>
                            <Card.Title>
                                <Row>
                                    <Col lg={6} className="mt-2">
                                        <p className="textCard">{item.name}</p>
                                    </Col>
                                    <Col lg={6} className="mt-2">
                                        <img src={iconEdit} alt="edit" style={{width: "20%"}} className="mr-3" onClick={() => {
                                            setAddress({...item});
                                            setIsEditAddress(true);
                                        }}/>
                                        <img src={iconDelete} alt="delete" style={{width: "20%"}} onClick={() => {
                                            onDeleteAddress(item.id);
                                        }}/>
                                    </Col>
                                </Row>
                            </Card.Title>
                            <Card.Text>
                                <div style={{margin: "0 23px", textAlign:"initial"}}>
                                    <p>{item.postal_code}</p>
                                    <p>{item.department.name}</p>
                                    <p>{item.city.name}</p>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
            <Row className="mt-4">
                <Col lg={4}>
                    <h4 className="subdivision">Registro de quejas</h4>
                </Col>
                <Col lg={8}>
                    <hr style={{borderColor: "white", marginTop: "32px"}}></hr>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12}>
                    <div className="first flex-inputs">
                        <p className="title-inputs mt-4 ml-2">Titulo (*)</p>
                        <input
                        className="input inputs-class"
                        name="title"
                        type="text"
                        placeholder="Ingrese su titulo"
                        value={complaints.title}
                        onChange={(e) => onChangeComplaints(e)}
                        />
                        {errorInputsComplaints.title && <span className="text-validate">*Campo requrido</span>}
                    </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                    <div className="first flex-inputs">
                        <p className="title-inputs mt-4 ml-2">Compañia (*)</p>
                        <select className="input inputs-class" onChange={(e) => onChangeComplaints(e)} value={complaints.company_id} name="company_id">
                            <option value="option1">Seleccione una opcion</option>
                            {companies.map(({id, name}) => (
                                <option value={id} key={id}>{name}</option>
                            ))}
                        </select>
                        {errorInputsComplaints.company_id && <span className="text-validate">*Campo requrido</span>}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="first flex-inputs">
                        <p className="title-inputs mt-4 ml-2">Ingrese una descripcion de su queja (*)</p>
                        <textarea
                        name="text"
                        cols="80"
                        rows="5"
                        placeholder="Ingrese una descripcion"
                        className="textarea-product"
                        style={{ width: "100%"}}
                        value={complaints.text}
                        onChange={(e) => onChangeComplaints(e)}
                        ></textarea>
                        {errorInputsComplaints.text && <span className="text-validate">*Campo requrido</span>}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} className="content-product content-body-home mt-5">
                    <Button className="button-purple-home" onClick={() => {
                        onSubmitComplaints()
                    }}>
                        Guardar
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {listComplaint.map((item, index) => (
                    <Col lg={3} md={6} sm={12} key={index} className="m-3">
                        <Card style={{ width: '18rem', borderRadius:"40px", MinHeight:"183px", MaxHeight: "auto"}}>
                            <Card.Body>
                                <Card.Title>
                                    <Row className="justify-content-center">
                                        <Col lg={6} className="mt-2">
                                            <p className="textCard">{item.title}</p>
                                            <p className="mt-1">{companies.find(({id}) => id === item.company_id)?.name}</p>
                                        </Col>
                                    </Row>
                                </Card.Title>
                                <Card.Text>
                                     <Col lg={6} className="mt-2 mx-auto">
                                        <img src={iconDelete} alt="edit" style={{width: "20%"}} onClick={() => onDeleteComplaints(item.id)}/>
                                     </Col>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col> 
                ))}
            </Row>
            </Container>
        </div>
    );
};
export default Profile;