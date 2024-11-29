import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import type { Restaurant, Location } from '../types';
import { DEFAULT_ZOOM } from '../config/constants';

interface MapProps {
  restaurants: Restaurant[];
  center: Location;
  onRestaurantClick: (restaurant: Restaurant) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

export function Map({ restaurants, center, onRestaurantClick }: MapProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const handleMarkerClick = useCallback((restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    onRestaurantClick(restaurant);
  }, [onRestaurantClick]);

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={DEFAULT_ZOOM}
        center={center}
        options={{
          styles: mapStyles,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={restaurant.location}
            onClick={() => handleMarkerClick(restaurant)}
            animation={google.maps.Animation.DROP}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new google.maps.Size(40, 40),
            }}
          />
        ))}

        {selectedRestaurant && (
          <InfoWindow
            position={selectedRestaurant.location}
            onCloseClick={() => setSelectedRestaurant(null)}
          >
            <div className="p-2">
              <h3 className="font-medium">{selectedRestaurant.name}</h3>
              <p className="text-sm text-gray-600">{selectedRestaurant.cuisine}</p>
              {selectedRestaurant.deals.length > 0 && (
                <p className="text-sm text-blue-600 mt-1">
                  {selectedRestaurant.deals.length} active deals
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}