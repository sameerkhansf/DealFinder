import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

const restaurantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  cuisine: z.string().min(2, 'Cuisine must be at least 2 characters'),
  image: z.string().url('Must be a valid URL'),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

type RestaurantFormData = z.infer<typeof restaurantSchema>;

export function RestaurantForm() {
  const { user } = useAuthStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
  });

  const onSubmit = async (data: RestaurantFormData) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('restaurants')
        .insert({
          ...data,
          owner_id: user.id,
          approved: false,
        });

      if (error) throw error;
      // Handle success (e.g., show notification, redirect)
    } catch (error) {
      console.error('Error submitting restaurant:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cuisine Type</label>
        <input
          type="text"
          {...register('cuisine')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.cuisine && (
          <p className="mt-1 text-sm text-red-600">{errors.cuisine.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          {...register('image')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.image && (
          <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
        )}
      </div>

      <Button type="submit" isLoading={isSubmitting}>
        Submit Restaurant
      </Button>
    </form>
  );
}