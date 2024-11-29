export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  distance: string;
  deals: Deal[];
  location: {
    lat: number;
    lng: number;
  };
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface SearchFilters {
  location: Location | null;
  radius: number;
  query: string;
}