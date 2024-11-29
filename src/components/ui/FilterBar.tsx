import React from 'react';
import { Button } from './Button';
import { Sliders, Clock } from 'lucide-react';

interface FilterBarProps {
  onSortByDistance: () => void;
  onSortByRating: () => void;
  onFilterByOpenNow: () => void;
}

export function FilterBar({ onSortByDistance, onSortByRating, onFilterByOpenNow }: FilterBarProps) {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onSortByDistance}
        className="whitespace-nowrap"
      >
        <Sliders className="w-4 h-4 mr-2" />
        Sort by Distance
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onSortByRating}
        className="whitespace-nowrap"
      >
        <Sliders className="w-4 h-4 mr-2" />
        Sort by Rating
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onFilterByOpenNow}
        className="whitespace-nowrap"
      >
        <Clock className="w-4 h-4 mr-2" />
        Open Now
      </Button>
    </div>
  );
}