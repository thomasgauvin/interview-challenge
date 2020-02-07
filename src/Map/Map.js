import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { mapboxToken } from '../env/apiTokens';
import { redDot, blueDot } from '../static-assets/dots';
import { Line } from '../Line/Line';
import { findClosestStop, countClosestPeopleToStop } from '../helpers/findClosestStop';
import useMousePosition from '../helpers/useMousePosition';
import '../styles/styles.css';

export default function Map(props) {
  const [viewport, setViewport] = useState({
    width: 600,
    height: 600,
    latitude: 45.5129604703,
    longitude: -73.5729924601,
    zoom: 14
  });

  const [hoverBoxVisible, setHoverBoxVisible] = useState(false);
  const [hoverBoxLon, setHoverBoxLon] = useState(0);
  const { x, y } = useMousePosition();
  const hasMovedCursor = typeof x === "number" && typeof y === "number";

  const renderPassengers = (passengerCoordinates) => {
    let markerJsx = [];
    for(let passenger of passengerCoordinates){
      markerJsx.push(
        <Marker latitude={passenger['lat']} longitude={passenger['lon']} offsetLeft={-7.5} offsetTop={-7.5}>
          {redDot}
        </Marker>
      )
    }
    return markerJsx;
  }

  const renderStops = (stopCoordinates, passengerCoordinates) => {
    let markerJsx = [];
    for(let stop of stopCoordinates){
      markerJsx.push(
        <div
          onMouseEnter={()=>{displayHoverBox(countClosestPeopleToStop(stop, stopCoordinates, passengerCoordinates));}}
          onMouseLeave={()=>{hideDisplayHoverBox()}}
        >
          <Marker latitude={stop['lat']} longitude={stop['lon']} offsetLeft={-7.5} offsetTop={-7.5}>
            {blueDot}
          </Marker>
        </div>
      )
    }
    return markerJsx;
  }

  const drawLines = (passengerCoordinates, stopCoordinates) => {
    let lineJsx = [];

    for(let passenger of passengerCoordinates){
      const closestStop = findClosestStopAndSaveAmountOfPassengersForStop(passenger, stopCoordinates);
      lineJsx.push(<Line points={[[passenger.lon, passenger.lat], [closestStop.lon, closestStop.lat]]}/>)
    }
    return lineJsx;
  }

  const findClosestStopAndSaveAmountOfPassengersForStop = (passenger, stopCoordinates) => {
    const closestStop = findClosestStop(passenger, stopCoordinates);


    return closestStop;
  }

  function displayHoverBox(lon, lat){
    console.log('display');
    console.log(x);
    console.log(y);
    setHoverBoxLon(lon);
    setHoverBoxVisible(true);
  }

  function hideDisplayHoverBox(lat, lon){
    console.log('hide')
    setHoverBoxVisible(false);
  }

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={mapboxToken}
    >
            
      {drawLines(props.passengerCoordinates, props.stopCoordinates)}
      {renderPassengers(props.passengerCoordinates)}
      {hoverBoxVisible && 
        <div className='arrow_box' style={{position: 'absolute', zIndex: 1, top: y-45, left: x-100}}>
            Riders for this stop count: {hoverBoxLon}
        </div>
      }
      {renderStops(props.stopCoordinates, props.passengerCoordinates)}

    </ReactMapGL>
  );
}