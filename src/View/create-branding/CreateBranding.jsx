import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";

function CreateBranding() {
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
            <label className="label-input">Nombre de  la marca</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese nombre de la marca"
            />
          </div>
          <div className="second flex-inputs">
            <label className="label-input">Categoria</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese la categoria"
            />
          </div>
          <div className="third flex-inputs">
            <label className="label-input">¿En que supermercado se encuentra esta marca?</label>
            <input
              className="input"
              type="text"
              placeholder="Ingrese nombre del supermercado"
            />
          </div>
          <div className="btn-create-branding">
            <button className="button-red margin-btn">GUARDAR</button>
          </div>
        </div>
        <div className="container-lists horizontal-list">
          <div>
            <p className="element-title">Leche deslactosada</p>
            <p className="element-subtitle">Marca: Alpina</p>
          </div>
          <div>
            <button className="button-edit">Editar</button>
            <button className="button-delete without-margin">Eliminar</button>
          </div>
        </div>
        <div className="container-lists horizontal-list">
          <div>
            <p className="element-title">Leche deslactosada</p>
            <p className="element-subtitle">Marca: Alpina</p>
          </div>
          <div>
            <button className="button-edit">Editar</button>
            <button className="button-delete without-margin">Eliminar</button>
          </div>
        </div>
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

export default CreateBranding;
