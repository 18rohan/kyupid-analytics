import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9oYW4wMTgiLCJhIjoiY2t4b25xd3V4MDFubTJ3cHRteGQ5M25ndiJ9.OZ3xYshVk4yDKWIprF6R1g";

// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const MapsContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.59);
  const [lat, setLat] = useState(12.97);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return (
    <div className="maps-container">
      <h1 style={{ color: "##fffffe" }}>Kyupid Analytics</h1>
      <div>
        {/* <div className="map-sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div> */}
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
};

export default MapsContainer;
