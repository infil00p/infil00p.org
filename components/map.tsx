import React from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type Props = {
  geojson: any;
  center?: [number, number];
  zoom?: number;
}

const MapboxMap = ({ geojson, center = [-122.486052, 37.830348], zoom = 14 }: Props) => {
  return (
    <div className="relative h-[400px] w-full my-8 rounded-lg overflow-hidden shadow-lg">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: center[0],
          latitude: center[1],
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