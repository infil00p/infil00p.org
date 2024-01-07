import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL, { Marker, ViewportProps } from 'react-map-gl';

interface MapboxProps {
  latitude: number;
  longitude: number;
}

const Mapbox: React.FC<MapboxProps> = ({ latitude, longitude }) => {
  const [viewport, setViewport] = useState<ViewportProps>({
    width: '100%',
    height: '400px',
    latitude: latitude,
    longitude: longitude,
    zoom: 10
  });

  const mapRef = useRef<ReactMapGL | null>(null);
  const accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();

      // Customize the map here if needed
      // map.setStyle('mapbox://styles/your-style');

      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div style={{ height: '400px' }}>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={accessToken}
        onViewportChange={setViewport}
      >
        <Marker latitude={latitude} longitude={longitude}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="8" fill="#007BFF" />
          </svg>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Mapbox;
