import React from "react";
import Example from "../../assets/img/example.png";
import "../../App.css";
import { useHistory } from "react-router";
import axios from "axios";
import { urlRequest } from "../../urlRequest";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

function MyProducts() {
  const history = useHistory();
  const [listProducts, setLisrProducts] = useState([]);

  const getListProducts = () => {
    axios.get(`${urlRequest}/product/list`, [])
      .then(function (response) {
        setLisrProducts(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });      
  }

  useEffect(() => {
    getListProducts();
  },[]);

  const deleteProduct = (id) => {
    axios.delete(`${urlRequest}/product/delete/${id}`, [])
      .then(function (response) {
        if (response.status === 201) {
          getListProducts();
          Swal.fire({
            title: '¡Eliminacion exitosa!',
            text: 'Se ha eliminado un producto.',
            icon: 'success',
            confirmButtonText: "Continuar", 
            confirmButtonColor: 'rgb(255, 146, 158)',
          })
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'Se ha generado un error al eliminar un producto.',
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

  return (
    <div className="pt-5 ml-5" style={{ height: "91vh" }}>
      <div>
        <h2 style={{ fontWeight: "bold", marginTop: "3rem" }}>Mis productos</h2>
      </div>
      <div
        style={{
          backgroundColor: "#CE3030",
          width: "90%",
          height: "70%",
          margin: "2rem auto",
          padding: "1rem 0 ",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "98%",
            height: "3rem",
            margin: "auto",
            borderBottom: "1px solid #CE3030",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="d-flex col-4 justify-content-center"
            style={{
              fontWeight: "bold"
            }}
          >
            Producto
          </div>
          <div 
            className="d-flex col-4 justify-content-center"
            style={{ fontWeight: "bold" }}>Cantidad</div>
          <div
            className="d-flex col-4 justify-content-center"
            style={{
              fontWeight: "bold"
            }}
          >
            Estado
          </div>
        </div>
        <div
          style={{
            width: "98%",
            height: "91%",
            margin: "auto",
            overflowY:"auto"
          }}
        >
          {listProducts.length > 0 &&
          listProducts.map((product) => {
            return (
              <div className="row justify-content-center m-auto" style={{ width:'100%', backgroundColor: "white" }}>
                <div className="col-4">
                  <img src={Example} alt="arduino" />
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {product.name_mark}
                  </p>
                </div>
                <div className="col-4">
                  <p
                    style={{
                      fontWeight: "bold"
                    }}
                  >
                    {product.quantity}
                  </p>
                </div>
                <div className="col-4">
                  <p
                    style={{
                      fontWeight: "bold"
                    }}
                  >
                    Disponible
                  </p>
                </div>
                <div className="col-12 d-flex justify-content-center aling-item-center" style={{ height: "3rem" }}>
                    <button className="button-edit">
                      Ver
                    </button>
                    <button
                      className="button-delete"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="button-edit-yellow"
                      onClick={() => history.push("/create-product", {id: product.id})}
                    >
                      Editar
                    </button>
                  </div>
              </div>
            );
          })
        }
          
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
      </div>
    </div>
  );
}

export default MyProducts;
