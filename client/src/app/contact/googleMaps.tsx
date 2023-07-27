import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 25.840026, // Latitud del centro del mapa
  lng: -80.201496, // Longitud del centro del mapa
};

const NaturaliMap: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={'AIzaSyD6VxZ0PXb-BfOa_oLcWW5dxLohSLLKKyU'}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
  
      </GoogleMap>
    </LoadScript>
  );
};

export default NaturaliMap;
