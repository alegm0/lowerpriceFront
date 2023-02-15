import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";

import "./CreateShoppingList.css";

function CreateShoppingList() {
  const history = useHistory();

  return (
    <div className="ml-5 pt-5" style={{ height: "91vh" }}>
      <Container className="margin-top-for-all">
        <Row>
          <Col lg={12}>
            <h1 className="titleHomeIn">
              Ingrese un producto a su lista de compras
            </h1>
          </Col>
        </Row>
        <div className="container-inputs">
          <div className="first flex-inputs">
            <label className="label-input">Nombre de la lista</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese el nombre de la lista"
            />
          </div>
          <div className="second flex-inputs">
            <label className="label-input">Marca</label>
            <select className="input">
              <option>Seleccione...</option>
              <option>Opción 1</option>
              <option>Opción 2</option>
              <option>Opción 3</option>
              <option>Opción 4</option>
            </select>
          </div>
          <div className="third flex-inputs">
            <label className="label-input">Marca</label>
            <select className="input">
              <option>Seleccione...</option>
              <option>Opción 1</option>
              <option>Opción 2</option>
              <option>Opción 3</option>
              <option>Opción 4</option>
            </select>
          </div>
          <div className="fourth flex-inputs">
            <label className="label-input">
              ¿En que supermercado deseas comprar?
            </label>
            <select className="input">
              <option>Seleccione...</option>
              <option>Opción 1</option>
              <option>Opción 2</option>
              <option>Opción 3</option>
              <option>Opción 4</option>
            </select>
          </div>
          <div className="fifth flex-inputs">
            <label className="label-input">Cantidad</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese el nombre de la lista"
            />
          </div>
        </div>
        <button className="button-red">AGREGAR PRODUCTO</button>
        <div className="container-lists">
          <div className="element">
            <p className="element-title">Leche deslactosada</p>
            <p className="element-subtitle">Marca: Alpina</p>
            <button className="button-edit">Editar</button>
            <button className="button-delete">Eliminar</button>
          </div>
          <div className="element">
            <p className="element-title">Leche deslactosada</p>
            <p className="element-subtitle">Marca: Alpina</p>
            <button className="button-edit">Editar</button>
            <button className="button-delete">Eliminar</button>
          </div>
        </div>
        <button className="button-red">CREAR LISTA</button>
      </Container>
      <button
        className="button-white btn-finish"
        onClick={() => history.goBack()}
      >
        ATRÁS
      </button>
    </div>
  );
}

export default CreateShoppingList;
