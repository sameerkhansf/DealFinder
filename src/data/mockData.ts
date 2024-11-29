import { Restaurant } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Bella Italia',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Italian',
    rating: 4.5,
    distance: '0.5 miles',
    location: { lat: 40.7128, lng: -74.0060 },
    deals: [
      {
        id: 'd1',
        title: 'Happy Hour Special',
        description: 'All pizzas 30% off',
        discount: '30%',
        validUntil: '2024-03-31'
      }
    ]
  },
  {
    id: '2',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Japanese',
    rating: 4.8,
    distance: '0.8 miles',
    location: { lat: 40.7150, lng: -74.0047 },
    deals: [
      {
        id: 'd2',
        title: 'Lunch Special',
        description: 'Buy one roll, get one 50% off',
        discount: '50%',
        validUntil: '2024-03-31'
      }
    ]
  },
  {
    id: '3',
    name: 'Burger House',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&auto=format&fit=crop&q=60',
    cuisine: 'American',
    rating: 4.3,
    distance: '1.2 miles',
    location: { lat: 40.7112, lng: -74.0077 },
    deals: [
      {
        id: 'd3',
        title: 'Family Bundle',
        description: '4 burgers, 4 fries, and drinks for $40',
        discount: '25%',
        validUntil: '2024-03-31'
      }
    ]
  },
  {
    id: '4',
    name: 'Taj Mahal',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Indian',
    rating: 4.6,
    distance: '1.5 miles',
    location: { lat: 40.7140, lng: -74.0090 },
    deals: [
      {
        id: 'd4',
        title: 'Curry Festival',
        description: 'Free naan with any curry order',
        discount: '20%',
        validUntil: '2024-03-31'
      }
    ]
  },
  {
    id: '5',
    name: 'El Mariachi',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Mexican',
    rating: 4.4,
    distance: '0.9 miles',
    location: { lat: 40.7160, lng: -74.0030 },
    deals: [
      {
        id: 'd5',
        title: 'Taco Tuesday',
        description: 'All tacos $2 each on Tuesdays',
        discount: '40%',
        validUntil: '2024-03-31'
      }
    ]
  },
  {
    id: '6',
    name: 'Dragon Wok',
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Chinese',
    rating: 4.7,
    distance: '1.1 miles',
    location: { lat: 40.7135, lng: -74.0050 },
    deals: [
      {
        id: 'd6',
        title: 'Lunch Box Special',
        description: 'Any combo box with free soup',
        discount: '15%',
        validUntil: '2024-03-31'
      }
    ]
  }
];