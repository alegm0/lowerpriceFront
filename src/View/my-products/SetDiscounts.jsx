import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { urlRequest } from "../../urlRequest";
import iconoAtras from "../../assets/img/icono-atras.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

function SetDiscounts() {
  const history = useHistory();
  const FORMAT = "dd-MM-yyyy";
  const validateInputs = {
    start_date: false,
    finish_date: false,
    value: false,
    product_id: false
  };
  const id = localStorage.getItem('id');
  const [submit, setSubmit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateFinal, setSelectedDateFinal] = useState(new Date());
  const minDate = moment().subtract(0, "days").toDate();
  const [products, setProducts] = useState([]);
  const [errorsInputs, setErrorsInputs] = useState({ ...validateInputs });
  const [discounts, setDiscounts] = useState({
    start_date: moment(selectedDate).format("YYYY-MM-DD"),
    finish_date: moment(selectedDateFinal).format("YYYY-MM-DD"),
    value: "",
    conditions: "",
    product_id: "",
    company_id: id,
  });

  const handleSelectedDateChange = (date) => {
    setSelectedDate(date);
    setDiscounts({
      ...discounts,
      start_date: moment(date).format("YYYY-MM-DD"),
    });
  };

  const handleSelectedDateFinalChange = (date) => {
    setSelectedDateFinal(date);
    setDiscounts({
      ...discounts,
      finish_date: moment(date).format("YYYY-MM-DD"),
    });
  };
  const onChange = (e) => {
    setDiscounts({ ...discounts, [e.target.name]: e.target.value });
  };

  //edit
  const { state } = useLocation();

  useEffect(() => {
    if (submit) validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discounts, submit]);

  useEffect(() => {
    if (state?.id) getDiscount(state.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    getListProducts();
}, []);

const getListProducts = () => {
    axios.get(`${urlRequest}/product/list/${id}`, [])
        .then(function (response) {
            setProducts(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

  const getDiscount = (id) => {
    axios
      .get(`${urlRequest}/discount-promotions/specific/${id}`, discounts)

      .then(function (response) {
        setDiscounts({
          value: response.data.data.value,
          start_date: response.data.data.start_date,
          finish_date: response.data.data.finish_date,
          conditions: response.data.data.conditions,
          product_id: response.data.data.product_id,
          company_id: response.data.data.company_id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
 
  const validate = () => {
    const errors = { ...validateInputs };
    Object.keys(errors).forEach((e) => {
      errors[e] = !discounts[e] ? "*Campo es obligatorio" : "";
      if (e === "value" && (discounts[e] < 0 || discounts[e] > 100)) {
        errors[e] = "*Descuento debe ser entre 0 y 100";
      }
    });

    setErrorsInputs(errors);
    return Object.values(errors).some((x) => x);
  };

  const onSubmit = () => {
    setSubmit(true);
    if (!validate()) {
      if (state?.id) {
        axios
          .put(`${urlRequest}/discount-promotions/${state.id}`, discounts)
          .then(function (response) {
            if (response.status === 200) {
              Swal.fire({
                title: "¡Actualizacion exitosa!",
                text: "Se ha actualizado un descuento.",
                icon: "success",
                confirmButtonText: "Continuar",
                confirmButtonColor: "rgb(157 160 223)",
              }).then((resultado) => {
                history.push("/discounts");
              });
            } else {
              Swal.fire({
                title: "¡Error!",
                text: "Se ha generado un error al actualizar un producto.",
                icon: "error",
                confirmButtonText: "Continuar",
                confirmButtonColor: "rgb(157 160 223)",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post(`${urlRequest}/discount-promotions`, discounts)
          .then(function (response) {
            if (response.status === 200) {
              Swal.fire({
                title: "Creacion exitosa!",
                text: "Se ha creado un descuento.",
                icon: "success",
                confirmButtonText: "Continuar",
                confirmButtonColor: "rgb(157 160 223)",
              }).then((resultado) => {
                history.push("/discounts");
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  return (
    <div className="body-view">
      <Container>
        <Row>
          <Col lg={1} md={1} sm={1}>
            <img
              onClick={() => history.goBack()}
              src={iconoAtras}
              alt="Icono de atras"
              style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }}
            />
          </Col>
          <Col lg={11} md={11} sm={11}>
            <h1 className="title-Products">Descuentos</h1>
          </Col>
        </Row>
        <Row>
          <Col className="description-Products" lg={12} md={12} sm={10}>
            <p className="paragraf-products">
              Para poder crear/editar un descuento debe llenar todos los
              espacios que contengan (*)
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={6}>
          
            <div className="form-group">
              <h1 className="second-Title">Seleccione un producto(*)</h1>
              <select
                className="input inputs-class"
                name="product_id"
                value={discounts.product_id}
                onChange={(e) => onChange(e)}
              >
                <option value="option1">Seleccione el producto</option>
                {products.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
              </select>
              {errorsInputs.product_id && (
                <span className="text-validate">{errorsInputs.product_id}</span>
              )}
            </div>
            <div className="form-group">
              <h1 className="second-Title">Valor(*)</h1>
              <input
                onChange={(e) => onChange(e)}
                className="inputDiscounts"
                type="number"
                placeholder="Ingrese el valor"
                name="value"
                value={discounts.value}
              />
              {errorsInputs.value && (
                <span className="text-validate">{errorsInputs.value}</span>
              )}
            </div>
            <div className="form-group">
              <h1 className="second-Title">Fecha final(*)</h1>
              <DatePicker
                selected={selectedDateFinal}
                className="inputDiscounts"
                dateFormat={FORMAT}
                value={discounts.finish_date}
                minDate={selectedDate}
                onChange={handleSelectedDateFinalChange}
              />
              {errorsInputs.finish_date && (
                <span className="text-validate">
                  {errorsInputs.finish_date}
                </span>
              )}
            </div>
          </Col>
          <Col lg={6} md={6} sm={6}>
            <h1 className="second-Title">Fecha inicial(*)</h1>
            <DatePicker
              minDate={minDate}
              selected={selectedDate}
              className="inputDiscounts"
              onChange={handleSelectedDateChange}
              dateFormat={FORMAT}
              value={discounts.start_date}
            />
            {errorsInputs.start_date && (
              <span className="text-validate">{errorsInputs.start_date}</span>
            )}
            <h1 className="second-Title">Condiciones</h1>
            <textarea
              className="inputDiscounts"
              type="text"
              placeholder="Ingrese las condiciones"
              name="conditions"
              style={{
                height: "200px",
                textAlign: "start",
                position: "relative",
              }}
              value={discounts.conditions}
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.conditions && (
              <span className="text-validate">{errorsInputs.conditions}</span>
            )}
          </Col>
        </Row>
        <Row lg={12} md={8} sm={4}>
          <Button
            type="submit"
            className="buttonSave"
            onClick={onSubmit}
            style={{ Align: "center" }}
          >
            Guardar
          </Button>
        </Row>
      </Container>
    </div>
  );
}
export default SetDiscounts;
