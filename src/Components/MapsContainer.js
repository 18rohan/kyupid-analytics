import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9oYW4wMTgiLCJhIjoiY2t4b25xd3V4MDFubTJ3cHRteGQ5M25ndiJ9.OZ3xYshVk4yDKWIprF6R1g";

// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const MapsContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.59);
  const [lat, setLat] = useState(12.97);
  const [zoom, setZoom] = useState(9);
  const [hoveredStateId, setHoveredStateId] = useState(null);
  const FetchData = async () => {
    const fetchedData = await axios.get(
      "https://kyupid-api.vercel.app/api/areas"
    );
    return fetchedData.data.features[0].geometry.coordinates;
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  // Fetch data from api
  const coordinates = FetchData();
  console.log(coordinates);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.on("load", () => {
      map.current.addSource("regions", {
        type: "geojson",
        data: "https://kyupid-api.vercel.app/api/areas",
      });

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
      map.current.addLayer({
        id: "region-fills",
        type: "fill",
        source: "regions",
        layout: {},
        paint: {
          "fill-color": "gray",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.5,
          ],
        },
      });
      map.current.addLayer({
        id: "region-borders",
        type: "line",
        source: "regions",
        layout: {},
        paint: {
          "line-color": "#627BC1",
          "line-width": 2,
        },
      });
      map.current.on("mousemove", "region-fills", (e) => {
        if (e.features.length > 0) {
          if (hoveredStateId !== null) {
            map.current.setFeatureState(
              { source: "regions", id: hoveredStateId },
              { hover: false }
            );
          }
          setHoveredStateId(e.features[0].id);
          map.current.setFeatureState(
            { source: "regions", id: hoveredStateId },
            { hover: true }
          );
        }

        map.current.on("mouseleave", "state-fills", () => {
          if (hoveredStateId !== null) {
            map.current.setFeatureState(
              { source: "states", id: hoveredStateId },
              { hover: false }
            );
          }
          setHoveredStateId(null);
        });
      });
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
