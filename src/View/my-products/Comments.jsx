import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import iconoAtras from "../../assets/img/icono-atras.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { urlRequest } from "../../urlRequest";
import moment from "moment";
import Swal from "sweetalert2";

function Comments() {
  const history = useHistory();
  const minDate = moment().subtract(0, 'days').toDate();
  const [informationProduct, setInformationProduct] = useState([]);
  const [submit, setSubmit] = useState(false);

  const validateInputsComments = {
    name_user: false,
    assessment: false,
    start_date: false,
    title: false,
    text: false,
    contact_information: false,
    product_id: false,
  };
  const id = localStorage.getItem('id');
  const [informationComments, setInformationComments] = useState({
    name_user: "",
    assessment: "",
    start_date: moment(new Date()).format("YYYY-MM-DD"),
    title: "",
    text: "",
    contact_information: "",
    product_id: "",
  });

  const [errorsInputs, setErrorsInputs] = useState({
    ...validateInputsComments,
  });

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (submit) validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [informationComments, submit]);

  const getProduct = () => {
    axios
      .get(`${urlRequest}/product/list/${id}`)
      .then(function (response) {
        setInformationProduct(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChange = (e) => {
    setInformationComments({
      ...informationComments,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeDate = (e) => {
    setInformationComments({
      ...informationComments,
      start_date: moment(e).format('YYYY-MM-DD')
    });
  }
  const validate = () => {
    const nameRegex = /^[a-zA-Z]*$/;
    const errors = { ...validateInputsComments };

    Object.keys(errors).forEach((e) => {
      errors[e] = !informationComments[e] ? "*Campo es obligatorio" : "";
    });
    if (informationComments.name_user && !nameRegex.test(informationComments.name_user)) {
      errors['name_user'] = '*Digite un nombre válido';
    }

    setErrorsInputs(errors);
    return Object.values(errors).some((x) =>
      typeof x === "string" ? !!x : !!x.name
    );
  };

  const onSubmit = () => {
    setSubmit(true);
    if (!validate()) {
      axios
        .post(`${urlRequest}/comments`, informationComments)
        .then(function (response) {
          if (response.status === 200) {
            Swal.fire({
              title: "¡Registro exitoso!",
              text: "Se ha creado un nuevo comentario.",
              icon: "success",
              confirmButtonText: "Continuar",
              confirmButtonColor: "rgb(157 160 223)",
            }).then((resultado) => {
              history.push("/my-products");
            });
          } else {
            Swal.fire({
              title: "¡Error!",
              text: "Se ha generado un error al crear un nuevo comentario.",
              icon: "error",
              confirmButtonText: "Continuar",
              confirmButtonColor: "rgb(157 160 223)",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="body-view">
      <Container>
        <Row>
          <Col lg={1}>
            <img
              onClick={() => history.goBack()}
              src={iconoAtras}
              alt="Icono de atras"
              style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }}
            />
          </Col>
          <Col lg={2}>
            <p className="title-Products">Comentarios</p>
          </Col>
        </Row>
        <Row>
          <Col className="description-Products">
            <p className="paragraf-products">
              Para poder crear/editar un comentario debe llenar todos los
              espacios que contengan (*)
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <p className="title-inputs mt-4 ml-2">Producto(*)</p>
            <select
              className="input inputs-class"
              name="product_id"
              value={informationComments.product_id}
              onChange={(e) => onChange(e)}
            >
              <option value="option1">Seleccione el producto</option>
              {informationProduct.map(({ id, name }) => (
                <option value={id}>{name}</option>
              ))}
            </select>
            {errorsInputs.product_id && <span className="text-validate">{errorsInputs.product_id}</span>}
          </Col>
          <Col lg={6}>
            <p className="title-inputs mt-4 ml-2">Nombre de usuario(*)</p>
            <input
              className="inputDiscounts"
              type="text"
              placeholder="Ingrese su nombre"
              name="name_user"
              value={informationComments.name_user}
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.name_user && <span className="text-validate">{errorsInputs.name_user}</span>}
          </Col>
          <Col lg={6}>.
            <p className="title-inputs ml-2">Valoracion(*)</p>
            <select className="input inputs-class" name="assessment" value={informationComments.assessment}
              onChange={(e) => onChange(e)}>
              <option value="option1">Seleccione valoracion</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errorsInputs.assessment && <span className="text-validate">*Campo requerido</span>}
          </Col>
          <Col>
            <p className="title-inputs mt-4 ml-2">Fecha inicial(*)</p>
            <DatePicker
              minDate={minDate}
              name="start_date"
              className="inputDiscounts"
              value={informationComments.start_date}
              onChange={(e) => onChangeDate(e)}
            />
            {errorsInputs.start_date && <span className="text-validate">*Campo requerido</span>}
          </Col>
          <Col lg={6}>
            <p className="title-inputs mt-4 ml-2">Titulo(*)</p>
            <input
              className="inputDiscounts"
              type="text"
              placeholder="Ingrese el titulo"
              name="title"
              value={informationComments.title}
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.title && <span className="text-validate">*Campo requerido</span>}
          </Col>
          <Col lg={6}>
            <p className="title-inputs mt-4 ml-2">Numero de contacto (*)</p>
            <input
              className="inputDiscounts"
              type="number"
              placeholder="Numero de contacto"
              name="contact_information"
              value={informationComments.contact_information}
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.contact_information && <span className="text-validate">*Campo requerido</span>}
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <p className="title-inputs mt-4 ml-2">Descripcion del comentario</p>
            <textarea
              name="text"
              cols="80"
              rows="5"
              placeholder="Ingrese una descripcion"
              className="textarea-product"
              style={{
                height: "80%",
                width: "100%",
                textAlign: "start",
                position: "relative",
                marginBottom: "30px",
                borderRadius: "15px !important",
                marginLeft:"0px"
              }}
              value={informationComments.text}
              onChange={(e) => onChange(e)}
            />
          </Col>
        </Row>
        <Col lg={12} className="content-product content-body-home mt-5">
          <Button
            className="button-purple-home"
            onClick={(e) => onSubmit(e)}
            style={{ marginBottom: "50px" }}
          >
            Guardar
          </Button>
        </Col>
      </Container>
    </div>
  );
}
export default Comments;
