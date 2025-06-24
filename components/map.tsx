import React from 'react';
import Map, { Source, Layer } from 'react-map-gl';

type Props = {
  geojson: any;
  center?: [number, number];
  zoom?: number;
  bounds?: [[number, number], [number, number]]; // [southwest, northeast]
}

const MapboxMap = ({ geojson, center = [-122.486052, 37.830348], zoom = 14, bounds }: Props) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  if (!mapboxToken) {
    return (
      <div className="relative h-[400px] w-full my-8 rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Map not available</p>
          <p className="text-sm text-gray-500">Mapbox token not configured</p>
          <p className="text-xs text-gray-400 mt-2">
            Add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file
          </p>
        </div>
      </div>
    );
  }

  // Validate center coordinates
  const validCenter: [number, number] = [
    typeof center[0] === 'number' && !isNaN(center[0]) ? center[0] : -122.486052,
    typeof center[1] === 'number' && !isNaN(center[1]) ? center[1] : 37.830348
  ];

  // Validate GeoJSON
  if (!geojson || !geojson.features || !Array.isArray(geojson.features) || geojson.features.length === 0) {
    return (
      <div className="relative h-[400px] w-full my-8 rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Map not available</p>
          <p className="text-sm text-gray-500">Invalid GeoJSON data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[400px] w-full my-8 rounded-lg overflow-hidden shadow-lg">
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={bounds ? {
          bounds: bounds,
          fitBoundsOptions: {
            padding: 20,
            maxZoom: 16
          }
        } : {
          longitude: validCenter[0],
          latitude: validCenter[1],
          zoom: zoom
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
      >
        <Source type="geojson" data={geojson}>
          <Layer
            id="route"
            type="line"
            paint={{
              'line-color': '#4F6F46',
              'line-width': 3
            }}
          />
          {geojson.features[0].geometry.type === 'Point' && (
            <Layer
              id="point"
              type="circle"
              paint={{
                'circle-radius': 6,
                'circle-color': '#4F6F46'
              }}
            />
          )}
        </Source>
      </Map>
    </div>
  );
};

export default MapboxMap;