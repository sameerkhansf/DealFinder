import { useState, useCallback, useEffect } from "react";
import { MapPin, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "./components/SearchBar";
import { LocationSearch } from "./components/LocationSearch";
import { RestaurantCard } from "./components/RestaurantCard";
import { Map } from "./components/Map";
import { FilterBar } from "./components/ui/FilterBar";
import { GoogleMapWrapper } from "./components/Map/GoogleMapWrapper";
import { useGeolocation } from "./hooks/useGeolocation";
import { calculateDistance } from "./utils/distance";
import { restaurants } from "./data/mockData";
import { DEFAULT_CENTER, DEFAULT_SEARCH_RADIUS } from "./config/constants";
import type { Restaurant, Location, SearchFilters } from "./types";

function App() {
  const { location: userLocation, error: locationError } = useGeolocation();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: null,
    radius: DEFAULT_SEARCH_RADIUS,
    query: "",
  });

  const [filteredRestaurants, setFilteredRestaurants] =
    useState<Restaurant[]>(restaurants);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [mapCenter, setMapCenter] = useState<Location>(DEFAULT_CENTER);
  const [sortOrder, setSortOrder] = useState<"distance" | "rating">("distance");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  useEffect(() => {
    if (userLocation) {
      setSelectedLocation(userLocation);
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  const handleSearch = useCallback((query: string) => {
    setSearchFilters((prev) => ({ ...prev, query }));
  }, []);

  const handleLocationSelect = useCallback((location: Location) => {
    setSelectedLocation(location);
    setMapCenter(location);
    setSearchFilters((prev) => ({ ...prev, location }));
  }, []);

  const handleSortByDistance = useCallback(() => {
    setSortOrder("distance");
  }, []);

  const handleSortByRating = useCallback(() => {
    setSortOrder("rating");
  }, []);

  const handleFilterByOpenNow = useCallback(() => {
    setShowOpenOnly((prev) => !prev);
  }, []);

  useEffect(() => {
    let filtered = [...restaurants];

    if (searchFilters.query) {
      const query = searchFilters.query.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.cuisine.toLowerCase().includes(query)
      );
    }

    if (searchFilters.location) {
      filtered = filtered.filter((restaurant) => {
        const distance = calculateDistance(
          searchFilters.location!.lat,
          searchFilters.location!.lng,
          restaurant.location.lat,
          restaurant.location.lng
        );
        return distance <= searchFilters.radius;
      });
    }

    if (sortOrder === "distance" && searchFilters.location) {
      filtered.sort((a, b) => {
        const distanceA = calculateDistance(
          searchFilters.location!.lat,
          searchFilters.location!.lng,
          a.location.lat,
          a.location.lng
        );
        const distanceB = calculateDistance(
          searchFilters.location!.lat,
          searchFilters.location!.lng,
          b.location.lat,
          b.location.lng
        );
        return distanceA - distanceB;
      });
    } else if (sortOrder === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredRestaurants(filtered);
  }, [searchFilters, sortOrder]);

  const handleRestaurantClick = useCallback((restaurant: Restaurant) => {
    setMapCenter(restaurant.location);
  }, []);

  return (
    <GoogleMapWrapper>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Utensils className="w-8 h-8 text-blue-600" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900">
                  DealFinder
                </h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Find the Best Restaurant Deals Nearby
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <LocationSearch onLocationSelect={handleLocationSelect} />
              <SearchBar onSearch={handleSearch} />
            </div>
            {locationError && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {locationError}
              </p>
            )}
          </motion.div>

          <FilterBar
            onSortByDistance={handleSortByDistance}
            onSortByRating={handleSortByRating}
            onFilterByOpenNow={handleFilterByOpenNow}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Map
                restaurants={filteredRestaurants}
                center={mapCenter}
                onRestaurantClick={handleRestaurantClick}
              />
            </div>
            <div className="space-y-6">
              <AnimatePresence>
                {filteredRestaurants.map((restaurant) => (
                  <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RestaurantCard restaurant={restaurant} />
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredRestaurants.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500 text-lg">
                    No restaurants found. Try adjusting your search or location.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </GoogleMapWrapper>
  );
}

export default App;
