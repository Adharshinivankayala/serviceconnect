import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BookingFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const serviceTypeOptions = [
    { value: '', label: 'All Services' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'painting', label: 'Painting' },
    { value: 'appliance-repair', label: 'Appliance Repair' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'rating-desc', label: 'Highest Rated' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== '' && value !== null && value !== undefined
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Mobile: Collapsible Header */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-micro"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">Filters & Search</span>
            {hasActiveFilters && (
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            )}
          </div>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-4">
          {/* Search Bar */}
          <div>
            <Input
              type="search"
              placeholder="Search bookings, providers, or services..."
              value={filters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Desktop: Horizontal Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4">
            <Select
              label="Service Type"
              options={serviceTypeOptions}
              value={filters?.serviceType || ''}
              onChange={(value) => handleFilterChange('serviceType', value)}
            />
            
            <Input
              type="date"
              label="From Date"
              value={filters?.fromDate || ''}
              onChange={(e) => handleFilterChange('fromDate', e?.target?.value)}
            />
            
            <Input
              type="date"
              label="To Date"
              value={filters?.toDate || ''}
              onChange={(e) => handleFilterChange('toDate', e?.target?.value)}
            />
            
            <Select
              label="Sort By"
              options={sortOptions}
              value={filters?.sortBy || 'date-desc'}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>

          {/* Mobile: Vertical Layout */}
          <div className="lg:hidden space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                label="From Date"
                value={filters?.fromDate || ''}
                onChange={(e) => handleFilterChange('fromDate', e?.target?.value)}
              />
              
              <Input
                type="date"
                label="To Date"
                value={filters?.toDate || ''}
                onChange={(e) => handleFilterChange('toDate', e?.target?.value)}
              />
            </div>
            
            <Select
              label="Service Type"
              options={serviceTypeOptions}
              value={filters?.serviceType || ''}
              onChange={(value) => handleFilterChange('serviceType', value)}
            />
            
            <Select
              label="Sort By"
              options={sortOptions}
              value={filters?.sortBy || 'date-desc'}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>

          {/* Price Range Filter */}
          <div className="pt-2 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Price Range</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min $"
                value={filters?.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e?.target?.value)}
              />
              <Input
                type="number"
                placeholder="Max $"
                value={filters?.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e?.target?.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          {hasActiveFilters && (
            <div className="pt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                iconName="X"
                iconPosition="left"
                fullWidth
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;