import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { urlRequest } from "../../urlRequest";
import axios from "axios";
function Maps(props) {
  const history = useHistory();
  const mapStyles = {
    width: "90%",
    height: "650px",
  };
  // const [addresses, setAddresses] = useState([
  //   "Carrera 7 # 32-77, Bogotá, Colombia",
  //   "Avenida Calle 26 # 68D-35, Bogotá, Colombia",
  //   "Calle 100 # 8A-49, Bogotá, Colombia"
  // ]);
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    geocodeAddresses();
    getAddress();
  }, []);
  const [addresses, setAddresses] = useState([]);
  const getAddress = () => {
    axios.get(`${urlRequest}/company/address`)
      .then(function (response) {
        console.log(response);
        setAddresses(response.data.data.address_description);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const geocodeAddresses = () => {
    const geocoder = new props.google.maps.Geocoder();
    const newMarkers = [];

    addresses.forEach((address) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          const { lat, lng } = results[0].geometry.location;
          newMarkers.push({ lat: lat(), lng: lng() });
          if (newMarkers.length === addresses.length) {
            setMarkers(newMarkers);
          }
        }
      });
    });
  };
  return (
    <div style={{ marginLeft: "15%", height: "100%" }}>
      <Container>
        <Row >
          <Col lg={11} md={11} sm={11}>
            <h1 className="title-marks-my-products" style={{ position: "initial", paddingLeft: "0px" }}>Mapa</h1>
          </Col>
        </Row>
        <Row >
          <Col lg={11} md={8} sm={9}>
            <p className="paragraph2">A continuación, se presentará en el mapa la ubicación de las tiendas existentes, representadas por marcadores de color rojo. Estos marcadores resaltarán visualmente cada punto donde se encuentran las tiendas en cuestión. Esta representación cartográfica permitirá una fácil identificación y visualización de las tiendas</p>
          </Col>
        </Row>
        <Row>
          <div className="body-view">
            <Col lg={11} md={8} sm={8}>
              <Map
                google={props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{ lat: 4.67424, lng: -74.0898706 }}
              >


                {markers.map((marker, index) => (
                  <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />

                ))}
              </Map>
            </Col>
          </div>
        </Row>

      </Container>
    </div>
  );
}
export default GoogleApiWrapper({
  // apiKey: "AIzaSyAcPFrLpY737tr7WfdiLq9JlwATJJJzlio",
  apiKey: "AIzaSyADT8nsK51DCMFhCZ6psBFS5pHvmDskCRE"


})(Maps);