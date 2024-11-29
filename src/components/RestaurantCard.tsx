import React from 'react';
import { Star, MapPin, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Restaurant } from '../types';
import { Button } from './ui/Button';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full shadow-md">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{restaurant.name}</h3>
        </div>

        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{restaurant.distance}</span>
          <span className="mx-2">•</span>
          <span>{restaurant.cuisine}</span>
        </div>

        <div className="space-y-3">
          {restaurant.deals.map((deal) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-md border border-blue-200"
            >
              <h4 className="font-medium text-blue-900">{deal.title}</h4>
              <p className="text-sm text-blue-700 mt-1">{deal.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium text-blue-600">
                  Save {deal.discount}
                </span>
                <span className="text-xs text-gray-500">
                  Valid until {format(new Date(deal.validUntil), 'MMM dd, yyyy')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => window.open(`https://maps.google.com/?q=${restaurant.name}`, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Directions
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Clock className="w-4 h-4 mr-2" />
            Reserve
          </Button>
        </div>
      </div>
    </motion.div>
  );
}