import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/Button';
import type { Database } from '../../types/supabase';

type Restaurant = Database['public']['Tables']['restaurants']['Row'];

export function RestaurantApproval() {
  const [pendingRestaurants, setPendingRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingRestaurants();
  }, []);

  const fetchPendingRestaurants = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('approved', false);

      if (error) throw error;
      setPendingRestaurants(data || []);
    } catch (error) {
      console.error('Error fetching pending restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (restaurantId: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('restaurants')
        .update({ approved })
        .eq('id', restaurantId);

      if (error) throw error;
      await fetchPendingRestaurants();
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pending Restaurant Approvals</h2>
      {pendingRestaurants.length === 0 ? (
        <p>No pending restaurants to approve</p>
      ) : (
        <div className="space-y-4">
          {pendingRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApproval(restaurant.id, false)}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApproval(restaurant.id, true)}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}