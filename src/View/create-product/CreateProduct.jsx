import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { urlRequest } from "../../urlRequest";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import iconoAtras from '../../assets/img/icono-atras.svg';

function CreateProduct() {
  const history = useHistory();
  const validateInputs = {
    unit_cost: false,
    quantity: false,
    name: false
  }
  const [errorsInputs, setErrorsInputs] = useState({...validateInputs});
  const [submit, setSubmit] = useState(false) 
  const [products, setProducts] = useState({
    unit_cost: '',
    quantity: '',
    name: '',
    description: '',
    category_id: 1,
    user_id: 1
  });
  const { state }  = useLocation();
  const { search } = useLocation();


  useEffect(() => {
    if (submit) validate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[products, submit]);

  useEffect(() => {
    console.log(search);
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
          unit_cost: response.data.data.unit_cost,
          quantity: response.data.data.quantity,
          name: response.data.data.name,
          description: response.data.data.description,
          category_id: 1,
          user_id: 1
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const validate = () => {
    const errors = {...validateInputs};
    Object.keys(errors).forEach((e) => {
      if (!products[e] && e !== 'unit_cost' && e !== 'quantity') errors[e] = true;
      if (!products[e] > 0 && e !== 'name') errors[e] = true;
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
              confirmButtonColor: 'rgb(157 160 223)',
            }).then(resultado => {
                history.push('/my-products');
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
      } else {
        axios.post(`${urlRequest}/product`, products)
        .then(function (response) {
          if (response.status === 201) {
            Swal.fire({
              title: '¡Registro exitoso!',
              text: 'Se ha creado un nuevo producto.',
              icon: 'success',
              confirmButtonText: "Continuar", 
              confirmButtonColor: 'rgb(157 160 223)',
            }).then(resultado => {
              history.push('/my-products');
            });
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'Se ha generado un error al crear un nuevo producto.',
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
  }

  return (
    <div className="body-view">
      <Container>
        <Row>
          <Col lg={2}>
            <img onClick={() => history.goBack()} src={iconoAtras} alt="Icono de atras" style={{width:"3rem", marginTop:"3rem", marginLeft:"-3rem"}}/>
          </Col>
        </Row>
        <Row>
          <Col lg={9} className="content-home">
           
            <h1 className="title-home m-0">Ingrese el producto</h1>
            <div className="container-inputs">
              <div className="first flex-inputs">
                <p className="subtitle-product mt-4 ml-2">Ingrese el nombre del producto</p>
                <input
                  className="input"
                  name="name"
                  type="text"
                  value={products.name}
                  placeholder="Ingrese nombre del producto"
                  onChange={(e) => onChange(e)}
                />
                {errorsInputs.name && <span className="text-validate">*Campo requrido</span>}
              </div>
              <div className="second flex-inputs">
                <p className="subtitle-product mt-4 ml-2">Ingrese el costo unitario</p>
                <input
                  className="input"
                  name="unit_cost"
                  type="number"
                  value={products.unit_cost}
                  placeholder="Ingrese el costo unitario"
                  onChange={(e) => onChange(e)}
                />
                {errorsInputs.unit_cost && <span className="text-validate">*Campo requrido</span>}
              </div>
              <div className="third flex-inputs">
              <p className="subtitle-product mt-4 ml-2">Ingrese el cantidad</p>
                <input
                  className="input"
                  name="quantity"
                  type="number"
                  value={products.quantity}
                  onChange={(e) => onChange(e)}
                />
                {errorsInputs.quantity && <span className="text-validate">*Campo requrido</span>}
              </div>
              <div className="third flex-inputs">
              <p className="subtitle-product mt-4 ml-2">Ingrese la categoria</p>
              <select className="select-product">
                <option value="option1">Seleccione la categoria</option>
                <option value="1">Tecnologia</option>
                <option value="2">Salud</option>
                <option value="3">Tecnologia</option>
                <option value="4">Aseo</option>
                <option value="4">Comida</option>
              </select>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
            <p className="subtitle-product mt-4 ml-2">Ingrese una descripcion</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  onChange={(e) => onChange(e)}
                  value={products.description}
                  placeholder="Ingrese una descripcion"
                  className="textarea-product"
                  style={{ width: "100%"}}
                ></textarea>
              </div>
            </div>
          </Col>
          <Col lg={12} className="content-product content-body-home mt-5">
              <Button className="button-purple-home" onClick={(e) => (onSubmit(e))}>
                  Guardar
              </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateProduct;
