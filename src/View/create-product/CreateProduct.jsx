import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { urlRequest } from "../../urlRequest";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

function CreateProduct() {
  const history = useHistory();
  const validateInputs = {
    price: false,
    quantity: false,
    name_mark: false
  }
  const [errorsInputs, setErrorsInputs] = useState({...validateInputs});
  const [submit, setSubmit] = useState(false) 
  const [products, setProducts] = useState({
    price: 0,
    quantity: 0,
    name_mark: '',
    description: ''
  });
  const { state }  = useLocation();


  useEffect(() => {
    if (submit) validate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[products, submit]);

  useEffect(() => {
    if (state?.id) getProduct(state.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onChange = (e) => {
    setProducts({...products, [e.target.name]: e.target.value});
  }

  const getProduct = (id) => {
    axios.get(`${urlRequest}/product/${id}`, products)
      .then(function (response) {
        setProducts({
          price: response.data.data.price,
          quantity: response.data.data.quantity,
          name_mark: response.data.data.name_mark,
          description: response.data.data.description
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const validate = () => {
    const errors = {...validateInputs};
    Object.keys(errors).forEach((e) => {
      if (!products[e] && e !== 'price' && e !== 'quantity') errors[e] = true;
      if (!products[e] > 0 && e !== 'name_mark') errors[e] = true;
    });
    setErrorsInputs(errors);
    return Object.values(errors).some( x => String(x).includes(true));
  } 

  const onSubmit = () => {
    setSubmit(true);
    if (!validate()) {
      if(state?.id){
        axios.put(`${urlRequest}/product/update/${state.id}`, products)
        .then(function (response) {
          if (response.status === 201) {
            Swal.fire({
              title: '¡Actualizacion exitosa!',
              text: 'Se ha actualizado un producto.',
              icon: 'success',
              confirmButtonText: "Continuar", 
              confirmButtonColor: 'rgb(255, 146, 158)',
            }).then(resultado => {
                history.push('/shopping-list#');
            });
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'Se ha generado un erro al actualizar un producto.',
              icon: 'error',
              confirmButtonText: "Continuar", 
              confirmButtonColor: 'rgb(255, 146, 158)',
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        axios.post(`${urlRequest}/product`, products)
        .then(function (response) {
          if (response.status === 201) {
            Swal.fire({
              title: '¡Registro exitoso!',
              text: 'Se ha creado un nuevo producto.',
              icon: 'success',
              confirmButtonText: "Continuar", 
              confirmButtonColor: 'rgb(255, 146, 158)',
            }).then(resultado => {
                history.push('/shopping-list#');
            });
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'Se ha generado un error al crear un nuevo producto.',
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
  }

  return (
    <div className="pt-5 ml-5" style={{ height: "91vh" }}>
      <Container className="margin-top-for-all">
        <Row>
          <Col lg={12}>
            <h1 className="titleHomeIn">Ingresa los datos</h1>
          </Col>
        </Row>
        <div className="container-inputs">
          <div className="first flex-inputs">
            <label className="label-input">Nombre de la marca</label>
            <input
              className="input"
              name="name_mark"
              type="text"
              value={products.name_mark}
              placeholder="Ingrese nombre de la marca"
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.name_mark && <span className="text-validate">*Campo requrido</span>}
          </div>
          <div className="second flex-inputs">
            <label className="label-input">Precio</label>
            <input
              className="input"
              name="price"
              type="number"
              value={products.price}
              placeholder="Ingrese el precio"
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.price && <span className="text-validate">*Campo requrido</span>}
          </div>
          <div className="third flex-inputs">
            <label className="label-input">Cantidad</label>
            <input
              className="input"
              name="quantity"
              type="number"
              value={products.quantity}
              placeholder="Ingrese la cantidad"
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.quantity && <span className="text-validate">*Campo requrido</span>}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{ fontWeight: "bold", fontSize: "20px", textAlign: "left" }}
          >
            Descripción
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <textarea
              name="description"
              cols="30"
              rows="10"
              onChange={(e) => onChange(e)}
              value={products.description}
              style={{ width: "85%", borderRadius: "1rem", backgroundColor: "#FF929E", borderColor: "#DE0B0B", padding:"1rem" }}
            ></textarea>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  borderColor: "#E01A79",
                  backgroundColor: "white",
                  fontWeight: "bold",
                  color: "#E01A79",
                  borderRadius: "1rem",
                  height: " 3rem",
                }}
              >
                Subir foto
              </button>
              <button
                style={{
                  borderColor: "#E01A79",
                  backgroundColor: "white",
                  fontWeight: "bold",
                  color: "#E01A79",
                  borderRadius: "1rem",
                  height: " 3rem",
                }}
              >
                Eliminar foto
              </button>
            </div>
          </div>
        </div>
      </Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "40%",
          margin: "auto",
        }}
      >
        <button
          className="button-red btn-finish"
          onClick={() => history.goBack()}
        >
          ATRÁS
        </button>
        <button className="button-green btn-finish" onClick={() => onSubmit()}>GUARDAR</button>
      </div>
    </div>
  );
}

export default CreateProduct;
