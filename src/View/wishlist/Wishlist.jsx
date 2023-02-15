import React from "react";
import { useHistory } from "react-router";
import Heart from "../../assets/img/heart.svg";
import Example from "../../assets/img/example.png";
import "../../App.css";

function Wishlist() {
  const history = useHistory();
  return (
    <div className="pt-5 ml-5" style={{ height: "91vh" }}>
      <div>
        <img
          src={Heart}
          alt="Favoritos"
          style={{ width: "3rem", marginTop: "3rem" }}
        />
        <h2 style={{ fontWeight: "bold" }}>Mi Wishlist</h2>
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
          <p
            style={{
              fontWeight: "bold",
              marginLeft: "5rem",
              marginTop: "1rem",
            }}
          >
            Producto
          </p>
          <p style={{ fontWeight: "bold", marginTop: "1rem" }}>Cantidad</p>
          <p
            style={{
              fontWeight: "bold",
              marginRight: "5rem",
              marginTop: "1rem",
            }}
          >
            Estado
          </p>
        </div>
        <div
          style={{
            backgroundColor: "white",
            width: "98%",
            height: "10rem",
            margin: "auto",
            borderBottom: "1px solid #CE3030",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img src={Example} alt="arduino" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                Arduino UNO
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <button className="button-edit" style={{ margin: "0" }}>
                  Ver
                </button>
                <button
                  className="button-delete"
                  style={{ marginLeft: "1rem ", marginBottom: "0" }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          <p
            style={{
              fontWeight: "bold",
              marginRight: "4rem",
              marginTop: "1rem",
            }}
          >
            2 items
          </p>
          <p
            style={{
              fontWeight: "bold",
              marginRight: "4rem",
              marginTop: "1rem",
            }}
          >
            Disponible
          </p>
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

export default Wishlist;
