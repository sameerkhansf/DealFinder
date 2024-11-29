import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../config/constants';

const libraries: ("places" | "geometry" | "drawing" | "localContext" | "visualization")[] = ["places"];

interface GoogleMapWrapperProps {
  children: React.ReactNode;
}

export function GoogleMapWrapper({ children }: GoogleMapWrapperProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-red-500">Error loading Google Maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Loading maps...</p>
      </div>
    );
  }

  return <>{children}</>;
}