import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFiltersPanel = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const serviceCategories = [
    { id: 'plumbing', label: 'Plumbing', count: 45 },
    { id: 'electrical', label: 'Electrical', count: 38 },
    { id: 'carpentry', label: 'Carpentry', count: 29 },
    { id: 'hvac', label: 'HVAC', count: 22 },
    { id: 'locksmith', label: 'Locksmith', count: 18 },
    { id: 'appliance', label: 'Appliance Repair', count: 31 },
    { id: 'painting', label: 'Painting', count: 26 },
    { id: 'roofing', label: 'Roofing', count: 15 }
  ];

  const languages = [
    { id: 'english', label: 'English' },
    { id: 'spanish', label: 'Spanish' },
    { id: 'french', label: 'French' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'korean', label: 'Korean' }
  ];

  const priceRanges = [
    { id: 'budget', label: 'Budget ($50-$100)', min: 50, max: 100 },
    { id: 'standard', label: 'Standard ($100-$200)', min: 100, max: 200 },
    { id: 'premium', label: 'Premium ($200-$300)', min: 200, max: 300 },
    { id: 'luxury', label: 'Luxury ($300+)', min: 300, max: 1000 }
  ];

  const handleFilterChange = (category, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleArrayFilterChange = (category, itemId, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: checked
        ? [...(prev?.[category] || []), itemId]
        : (prev?.[category] || [])?.filter(id => id !== itemId)
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      radius: 10,
      services: [],
      languages: [],
      priceRange: '',
      rating: 0,
      emergencyAvailable: false,
      verifiedOnly: false,
      availableNow: false
    };
    setLocalFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50" onClick={onClose}></div>
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border shadow-modal lg:relative lg:w-80 lg:shadow-none lg:border lg:rounded-lg overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Advanced Filters</h2>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        <div className="p-4 space-y-6">
          {/* Search Radius */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Search Radius: {localFilters?.radius || 10} miles
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={localFilters?.radius || 10}
              onChange={(e) => handleFilterChange('radius', parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1 mile</span>
              <span>50 miles</span>
            </div>
          </div>

          {/* Service Categories */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Service Categories</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {serviceCategories?.map((category) => (
                <div key={category?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={category?.label}
                    checked={(localFilters?.services || [])?.includes(category?.id)}
                    onChange={(e) => handleArrayFilterChange('services', category?.id, e?.target?.checked)}
                  />
                  <span className="text-xs text-muted-foreground">({category?.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Price Range</h3>
            <div className="space-y-2">
              {priceRanges?.map((range) => (
                <div key={range?.id} className="flex items-center">
                  <input
                    type="radio"
                    id={range?.id}
                    name="priceRange"
                    value={range?.id}
                    checked={localFilters?.priceRange === range?.id}
                    onChange={(e) => handleFilterChange('priceRange', e?.target?.value)}
                    className="w-4 h-4 text-primary bg-background border-border focus:ring-primary focus:ring-2"
                  />
                  <label htmlFor={range?.id} className="ml-2 text-sm text-foreground">
                    {range?.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Minimum Rating</h3>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5]?.map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange('rating', rating)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded text-sm transition-micro ${
                    (localFilters?.rating || 0) >= rating
                      ? 'text-amber-600' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Star" size={16} className={rating <= (localFilters?.rating || 0) ? 'fill-current' : ''} />
                  <span>{rating}+</span>
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Languages Spoken</h3>
            <div className="space-y-2">
              {languages?.map((language) => (
                <Checkbox
                  key={language?.id}
                  label={language?.label}
                  checked={(localFilters?.languages || [])?.includes(language?.id)}
                  onChange={(e) => handleArrayFilterChange('languages', language?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Special Options */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Special Options</h3>
            <div className="space-y-3">
              <Checkbox
                label="Emergency Available"
                description="Providers available for urgent requests"
                checked={localFilters?.emergencyAvailable || false}
                onChange={(e) => handleFilterChange('emergencyAvailable', e?.target?.checked)}
              />
              <Checkbox
                label="Available Now"
                description="Currently accepting new bookings"
                checked={localFilters?.availableNow || false}
                onChange={(e) => handleFilterChange('availableNow', e?.target?.checked)}
              />
              <Checkbox
                label="Verified Only"
                description="Show only background-checked providers"
                checked={localFilters?.verifiedOnly || false}
                onChange={(e) => handleFilterChange('verifiedOnly', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex space-x-3">
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            variant="default"
            onClick={handleApplyFilters}
            className="flex-1"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFiltersPanel;