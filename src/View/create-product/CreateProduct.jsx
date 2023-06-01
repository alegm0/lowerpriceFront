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
    category: {
      name: false
    },
    brand: {
      id: false,
      name: false
    }
  }
  const [errorsInputs, setErrorsInputs] = useState({ ...validateInputs });
  const [submit, setSubmit] = useState(false);
  const [category, setCategory] = useState([]);
  const [id] = useState(localStorage.getItem("id") || '');
  const type = id === '2' ? 'COMPANY' : 'USER';
  const [brand, setBrand] = useState([]);

  const [products, setProducts] = useState({
    unit_cost: false,
    name: '',
    description: '',
    type: type,
    creator_id: parseInt(id),
    category: {
      id: null,
      name: '',
      identifier: '',
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
    axios.get(`${urlRequest}/brand/list`)
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
        [e.target.name]: e.target.value,
        'identifier': fatherKey === 'brand' ?? e.target.value,
      }
    });
  }

  const onChangeBrand = (e) => {
    if (e.target.value !== '0' && e.target.value !== '') {
      const name = brand.filter(item => item.id === parseInt(e.target.value))[0];
      setProducts({
        ...products,
        'brand': {
          ...products['brand'],
          'id': e.target.value,
          'name': name.name,
        }
      });
    }else {
      setProducts({
        ...products,
        'brand': {
          ...products['brand'],
          [e.target.name]: e.target.value,
          'identifier': e.target.value,
        }
      });
    }
  }

  const onChangeCategory = (e) => {
    if (e.target.value !== '0' && e.target.value !== '') {
      const name = category.filter(item => item.id === parseInt(e.target.value))[0];
      setProducts({
        ...products,
        'category': {
          ...products['category'],
          'id': e.target.value,
          'name': name.name,
          'identifier': name.name
        }
      });
    }else {
      setProducts({
        ...products,
        'category': {
          ...products['category'],
          [e.target.name]: e.target.value
        }
      });
    }
  }

  const getProduct = (id) => {
    axios.get(`${urlRequest}/product/${id}`, products)
      .then(function (response) {

        setProducts({
          unit_cost: response.data.data.unit_cost,
          name: response.data.data.name,
          description: response.data.data.description,
          category: response.data.data.category,
          brand: response.data.data.brand,
          user_id: 1,
          creator_id: response.data.data.creator_id,
          is_company: response.data.data.is_company,
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
        errors[e].id = !products[e].id ? 'campo obligatorio' : '';
        errors[e].name = products[e].id === '0' && !products[e].name ? 'campo obligatorio' : '';
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
      let data = {...products};
      if (products.brand.id === '0'){
        data.brand.id = null;
      }
      if (products.category.id === '0') {
       data.category.id = null
      }
      if (state?.id) {
        axios.put(`${urlRequest}/product/update/${state.id}`, data)
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
        axios.post(`${urlRequest}/product`, data)
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
                text: 'Se ha generado un error',
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
          <Col lg={2} md={2} sm={2}className="mt-3">
            <img onClick={() => history.goBack()} src={iconoAtras} alt="Icono de atras" style={{ width: "3rem", marginTop: "3rem", marginLeft: "-3rem" }} />
          </Col>
          <Col lg={10} md={10} sm={7}>
            <p className="title-Products">Productos</p>
          </Col>
        </Row>
        <Row>
          <Col className='description-Products'>
            <p className="paragraf-products">Para poder crear un producto debe llenar todos los espacios que contengan él (*), adicionalmente si desea crear una marca o una categoría debe elegir la opción (Otros), esto con el fin de que le aparezca el nuevo formulario correspondiente a marca o categoría</p>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <p className='subtitle'>Informacion del producto</p>
          </Col>
          <Col lg={8}>
            <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <p className="title-inputs mt-4 ml-2">Nombre del producto(*)</p>
            <input
              className="inputDiscounts"
              name="name"
              type="text"
              value={products.name}
              placeholder="Ingrese su nombre"
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.name && <span className="text-validate">*Campo requerido</span>}

            <div className="third flex-inputs">
              <p className="title-inputs mt-4 ml-2">Marca del producto(*)</p>
              <select className="inputDiscounts" name="id" onChange={(e) => onChangeBrand(e)} value={products.brand.id}>
                <option value=''>Seleccione la marca</option>
                {brand.map(({ id, name }, index) => (
                  <option value={id}>{name}</option>
                ))}
                <option value='0'>Otros</option>
              </select>
            </div>
            {errorsInputs.brand.id && <span className="text-validate">*Campo requerido</span>}
          </Col>
          <Col lg={6}>

            <p className="title-inputs mt-4 ml-2">Costo del producto(*)</p>
            <input
              className="inputDiscounts"
              name="unit_cost"
              type="number"
              value={products.unit_cost}
              placeholder="Ingrese un costo unitario"
              onChange={(e) => onChange(e)}
            />
            {errorsInputs.unit_cost && <span className="text-validate">*Campo requerido</span>}
            <div className="third flex-inputs">
              <p className="title-inputs mt-4 ml-2">Categoria del producto(*)</p>
              <select className="inputDiscounts" name="id" onChange={(e) => onChangeCategory(e)} value={products.category.id}>
                <option value="">Seleccione la categoria</option>
                {category.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
                <option value="0">Otros</option>
              </select>
            </div>
            {errorsInputs.unit_cost && <span className="text-validate">*Campo requerido</span>}
          </Col>


        </Row>
        <Row>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className="title-inputs mt-4 ml-3">Descripcion del producto</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <textarea
                name="description"
                cols="100"
                rows="5"
                onChange={(e) => onChange(e)}
                value={products.description}
                placeholder="Ingrese una descripcion"
                className="textarea-product"
                style={{
                  height: "80px",
                  width: "100%",
                  textAlign: "start",
                  position: "relative",
                  marginBottom: "30px",
                  borderRadius: "15px !important"
                }}
              ></textarea>
            </div>
          </div>
        </Row>

        <Row >
          <Col lg={4}>
            <p className='subtitle'>Informacion de la categoria</p>
          </Col>
          <Col lg={8}>
            <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
          </Col>
        </Row>
        <Row >
          <Col lg={6}>
            <div className="first flex-inputs">

              <p className="title-inputs mt-4 ml-2">Nombre de la categoria(*)</p>
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
          <Col lg={6}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="title-inputs mt-4 ml-2">Descripcion de la categoria</p>
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
          <Col lg={4}>
            <p className='subtitle'>Informacion de la marca</p>
          </Col>
          <Col lg={8}>
            <hr style={{ borderColor: "white", marginTop: "32px" }}></hr>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <div className="first flex-inputs">
              <p className="title-inputs mt-4 ml-2">Nombre de la marca(*)</p>
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
          <Col lg={6}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="title-inputs mt-4 ml-2">Descripcion de la marca</p>
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