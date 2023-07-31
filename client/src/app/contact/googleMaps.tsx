import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "650px",
  height: "700px",
};

const center = {
  lat: 25.840026, // Latitud del centro del mapa
  lng: -80.201496, // Longitud del centro del mapa
};

const minimalMapStyle = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      {
        saturation: -20,
      },
      {
        lightness: 0,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        lightness: 50,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
];

const NaturaliMap: React.FC = () => {
  const marker = { lat: 25.840026, lng: -80.201496, name: "Naturalistone" };
  const mapOptions = {
    disableDefaultUI: true, // Deshabilita los controles y etiquetas predeterminadas
  };
  return (
    <LoadScript googleMapsApiKey={"AIzaSyD6VxZ0PXb-BfOa_oLcWW5dxLohSLLKKyU"}>
      <GoogleMap options={{ ...mapOptions, styles: minimalMapStyle }} mapContainerStyle={containerStyle} center={center} zoom={17}>
        <Marker position={marker} />
      </GoogleMap>
    </LoadScript>
  );
};

export default NaturaliMap;
