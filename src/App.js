import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map/Map';
import passengerCoordinates from './static-data/passengers';
import stopCoordinates from './static-data/stops';
function App() {
  return (
    <Map 
      passengerCoordinates={passengerCoordinates}
      stopCoordinates={stopCoordinates}
    ></Map>
  );
}

export default App;
