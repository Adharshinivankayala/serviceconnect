import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onFilterChange, onAdvancedFilters }) => {
  const filterOptions = [
    { id: 'available', label: 'Available Now', icon: 'Clock' },
    { id: 'emergency', label: 'Emergency', icon: 'AlertTriangle' },
    { id: 'highly-rated', label: '4.5+ Rating', icon: 'Star' },
    { id: 'nearby', label: 'Within 5 miles', icon: 'MapPin' },
    { id: 'verified', label: 'Verified', icon: 'CheckCircle' }
  ];

  const serviceTypes = [
    { id: 'plumber', label: 'Plumber' },
    { id: 'electrician', label: 'Electrician' },
    { id: 'carpenter', label: 'Carpenter' },
    { id: 'hvac', label: 'HVAC' },
    { id: 'locksmith', label: 'Locksmith' }
  ];

  const isFilterActive = (filterId) => activeFilters?.includes(filterId);

  const toggleFilter = (filterId) => {
    if (isFilterActive(filterId)) {
      onFilterChange(activeFilters?.filter(f => f !== filterId));
    } else {
      onFilterChange([...activeFilters, filterId]);
    }
  };

  const activeFilterCount = activeFilters?.length;

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-3">
        {/* Filter Controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-foreground">Filters</h3>
            {activeFilterCount > 0 && (
              <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {activeFilterCount}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onAdvancedFilters}
              className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-micro"
            >
              <Icon name="SlidersHorizontal" size={16} />
              <span>Advanced</span>
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={() => onFilterChange([])}
                className="text-sm text-muted-foreground hover:text-foreground transition-micro"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-3">
          {filterOptions?.map((filter) => (
            <button
              key={filter?.id}
              onClick={() => toggleFilter(filter?.id)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-standard ${
                isFilterActive(filter?.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <Icon name={filter?.icon} size={14} />
              <span>{filter?.label}</span>
            </button>
          ))}
        </div>

        {/* Service Type Filters */}
        <div className="flex flex-wrap gap-2">
          {serviceTypes?.map((service) => (
            <button
              key={service?.id}
              onClick={() => toggleFilter(service?.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-standard ${
                isFilterActive(service?.id)
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {service?.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;