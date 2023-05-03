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
    name: false,
    description: false,
    category: {
      name: false
    },
    brand: {
      name: false
    }
  }
  const [errorsInputs, setErrorsInputs] = useState({ ...validateInputs });
  const [submit, setSubmit] = useState(false);
  const [category, setCategory] = useState([]);

  const [brand, setBrand] = useState([]);

  const [products, setProducts] = useState({
    unit_cost: false,
    name: '',
    description: '',
    category: {
      id: null,
      name: '',
      description: ''
    },
    brand: {
      id: null,
      name: '',
      state: true,
      description: ''
    }
  });
  const { state } = useLocation();


  useEffect(() => {
    if (submit) validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, submit]);

  useEffect(() => {
    getCategory();
    getBrand();
  }, []);

  const getCategory = () => {
    axios.get(`${urlRequest}/category/list`)
      .then(function (response) {
        console.log(response);
        setCategory(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getBrand = () => {
    axios.get(`${urlRequest}/category/list`)
      .then(function (response) {
        console.log(response.data);
        setBrand(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (state?.id) getProduct(state.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  }

  const onChangeMulti = (e, fatherKey) => {
    setProducts({
      ...products,
      [fatherKey]: {
        ...products[fatherKey],
        [e.target.name]: e.target.value
      }
    });
  }

  const getProduct = (id) => {
    axios.get(`${urlRequest}/product/${id}`, products)
      .then(function (response) {
        setProducts({
          unit_cost: response.data.data.unit_cost,
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
    const errors = { ...validateInputs };
    Object.keys(errors).forEach((e) => {
      if (['category', 'brand'].includes(e)) {
        errors[e].name = !products[e].id ? 'campo obligatirio' : '';
        return;
      }
      errors[e] = !products[e] ? '*Campo es obligatorio' : '';
    });
    setErrorsInputs(errors);
    return Object.values(errors).some(x => typeof x === 'string' ? !!x : !!x.name);
  }

  const onSubmit = () => {
    setSubmit(true);
    if (!validate()) {
      if (state?.id) {
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
          <Col lg={1}>
            <img onClick={() => history.goBack()} src={iconoAtras} alt="Icono de atras" style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }} />
          </Col>
          <Col lg={11}>
            <h1 className="title-Products">Productos</h1>
          </Col>
        </Row>
        <Row>
          <Col className='description-Products'>
            <p className="paragraf-products">Para poder crear un producto debe llenar todos los espacios que contengan él (*), adicionalmente si desea crear una marca o una categoría debe elegir la opción (Otros), esto con el fin de que le aparezca el nuevo formulario correspondiente a marca o categoría</p>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <h1 className='subtitle'>Informacion del producto</h1>
          </Col>
          <Col lg={7}>
            <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
          </Col>
        </Row>
        <Row>
          <Col>


            <h1 className="second-Title">Nombre del producto(*)</h1>
            <input
              className="inputDiscounts"
              name="name"
              type="text"
              value={products.name}
              placeholder="Ingrese su nombre"
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.name && <span className="text-validate">*Campo requrido</span>}

            <div className="third flex-inputs">
              <h1 className="second-Title">Marca del producto(*)</h1>
              <select className="inputDiscounts" name="id" onChange={(e) => onChangeMulti(e, 'brand')} value={products.brand.id}>
                <option value="option1">Seleccione la marca</option>
                {brand.map(({ id, name }, index) => (
                  <option value={id}>{name}</option>
                ))}
                <option value="">Otros</option>
              </select>
            </div>
            {errorsInputs.unit_cost && <span className="text-validate">*Campo requrido</span>}
          </Col>
          <Col>

            <h1 className="second-Title">Costo del producto(*)</h1>
            <input
              className="inputDiscounts"
              name="unit_cost"
              type="number"
              value={products.unit_cost}
              placeholder="Ingrese un costo unitario"
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.unit_cost && <span className="text-validate">*Campo requrido</span>}
            <div className="third flex-inputs">
              <h1 className="second-Title">Categoria del producto(*)</h1>
              <select className="inputDiscounts" name="id" onChange={(e) => onChangeMulti(e, 'category')} value={products.category.id}>
                <option value="option1">Seleccione la categoria</option>
                {category.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
                <option value="0">Otros</option>
              </select>
            </div>
            {errorsInputs.unit_cost && <span className="text-validate">*Campo requrido</span>}
          </Col>


        </Row>
        <Row>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="second-Title mt-4 ml-2">Descripcion del producto</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <textarea
                name="description"
                cols="80"
                rows="5"
                onChange={(e) => onChange(e)}
                value={products.description}
                placeholder="Ingrese unadescripcion"
                className="textarea-product"
                style={{
                  height: "80px",
                  width: "1105px",
                  textAlign: "start",
                  position: "relative",
                  marginBottom: "30px",
                  borderRadius: "15px !important"
                }}
              ></textarea>
            </div>
          </div>
        </Row>

        <Row>
          <Col lg={5}>
            <h1 className='subtitle'>Informacion de la categoria</h1>
          </Col>
          <Col lg={7}>
            <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="first flex-inputs">

              <h1 className="second-Title">Nombre de la categoria(*)</h1>
              <input
                className="inputDiscounts"
                name="name"
                type="text"
                value={products.category.name}
                placeholder="Ingrese su nombre"
                onChange={(e) => onChangeMulti(e, 'category')}
              />
              {errorsInputs.category.name && <span className="text-validate">*Campo requrido</span>}

            </div>
          </Col>
          <Col>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1 className="second-Title">Descripcion de la categoria</h1>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <textarea
                  name="description"
                  cols="80"
                  rows="5"
                  onChange={(e) => onChangeMulti(e, 'category')}
                  value={products.category.description}
                  placeholder="Ingrese una descripcion"
                  className="inputDiscounts"
                  style={{ width: "100%" ,height:"80px" }}
                ></textarea>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <h1 className='subtitle'>Informacion de la marca</h1>
          </Col>
          <Col lg={7}>
            <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="first flex-inputs">
              <h1 className="second-Title">Nombre de la marca(*)</h1>
              <input
                className="inputDiscounts"
                name="name"
                type="text"
                value={products.brand.name}
                placeholder="Ingrese su nombre"
                onChange={(e) => onChangeMulti(e, 'brand')}
              />
              {errorsInputs.brand.name && <span className="text-validate">*Campo requrido</span>}
            </div>


          </Col>
          <Col>


            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1 className="second-Title">Descripcion de la marca</h1>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <textarea
                  name="description"
                  cols="80"
                  rows="5"
                  onChange={(e) => onChangeMulti(e, 'brand')}
                  value={products.brand.description}
                  placeholder="Ingrese una descripcion"
                  className="inputDiscounts"
                  style={{ width: "100%", height:"80px" }}
                ></textarea>
              </div>
            </div>
          </Col>
        </Row>

        <Row>

          {products.category.id === "0" && (
            <>
              <div className="first flex-inputs">
                <h1 className="second-Title">Ingrese el nombre de la categoria(*)</h1>
                <input
                  className="input"
                  name="name"
                  type="text"
                  value={products.category.name}
                  placeholder="Ingrese nombre del producto"
                  onChange={(e) => onChangeMulti(e, 'category')}
                />
                {errorsInputs.category.name && <span className="text-validate">*Campo requrido</span>}

              </div>




              <div style={{ display: "flex", flexDirection: "column" }}>
                <p className="subtitle-product mt-4 ml-2">Ingrese una descripcion de la categoria</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <textarea
                    name="description"
                    cols="80"
                    rows="5"
                    onChange={(e) => onChangeMulti(e, 'category')}
                    value={products.category.description}
                    placeholder="Ingrese una descripcion"
                    className="textarea-product"
                    style={{ width: "100%" }}
                  ></textarea>
                </div>
              </div>
            </>
          )}

          {products.brand.id === "" && (
            <>
              <div className="first flex-inputs">
                <p className="subtitle-product mt-4 ml-2">Ingrese el nombre de la marca</p>
                <input
                  className="input"
                  name="name"
                  type="text"
                  value={products.brand.name}
                  placeholder="Ingrese nombre del producto"
                  onChange={(e) => onChangeMulti(e, 'brand')}
                />
                {errorsInputs.brand.name && <span className="text-validate">*Campo requrido</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <p className="subtitle-product mt-4 ml-2">Ingrese una descripcion de la marca</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <textarea
                    name="description"
                    cols="80"
                    rows="5"
                    onChange={(e) => onChangeMulti(e, 'brand')}
                    value={products.brand.description}
                    placeholder="Ingrese una descripcion"
                    className="textarea-product"
                    style={{ width: "100%" }}
                  ></textarea>
                </div>
              </div>
            </>
          )}




          <Col lg={12} className="content-product content-body-home mt-5">
            <Button className="button-purple-home" onClick={(e) => (onSubmit(e))} style={{ marginBottom: "50px" }}>
              Guardar
            </Button>
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default CreateProduct;
