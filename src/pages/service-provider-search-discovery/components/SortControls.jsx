import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const SortControls = ({ sortBy, onSortChange, viewMode, onViewModeChange, resultsCount }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { id: 'distance', label: 'Distance', icon: 'MapPin' },
    { id: 'rating', label: 'Highest Rated', icon: 'Star' },
    { id: 'price-low', label: 'Price: Low to High', icon: 'DollarSign' },
    { id: 'price-high', label: 'Price: High to Low', icon: 'DollarSign' },
    { id: 'availability', label: 'Available Now', icon: 'Clock' },
    { id: 'reviews', label: 'Most Reviews', icon: 'MessageSquare' }
  ];

  const getCurrentSortLabel = () => {
    const current = sortOptions?.find(option => option?.id === sortBy);
    return current ? current?.label : 'Distance';
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {resultsCount} providers found
          </div>

          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-micro"
              >
                <Icon name="ArrowUpDown" size={14} />
                <span>Sort: {getCurrentSortLabel()}</span>
                <Icon name="ChevronDown" size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal z-50">
                  <div className="py-1">
                    {sortOptions?.map((option) => (
                      <button
                        key={option?.id}
                        onClick={() => {
                          onSortChange(option?.id);
                          setIsSortOpen(false);
                        }}
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted transition-micro ${
                          sortBy === option?.id ? 'text-primary bg-primary/10' : 'text-popover-foreground'
                        }`}
                      >
                        <Icon name={option?.icon} size={14} />
                        <span>{option?.label}</span>
                        {sortBy === option?.id && (
                          <Icon name="Check" size={14} className="ml-auto text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-md p-1">
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded transition-micro ${
                  viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="List" size={16} />
              </button>
              <button
                onClick={() => onViewModeChange('map')}
                className={`p-2 rounded transition-micro ${
                  viewMode === 'map' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Map" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortControls;