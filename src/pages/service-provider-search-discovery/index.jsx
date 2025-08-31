import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import FilterChips from './components/FilterChips';
import SortControls from './components/SortControls';
import ServiceProviderCard from './components/ServiceProviderCard';
import MapView from './components/MapView';
import AdvancedFiltersPanel from './components/AdvancedFiltersPanel';
import LoadingSkeletons from './components/LoadingSkeletons';

const ServiceProviderSearchDiscovery = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [currentLocation, setCurrentLocation] = useState('Downtown Seattle, WA');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('distance');
  const [viewMode, setViewMode] = useState('list');
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMapProvider, setSelectedMapProvider] = useState(null);
  const [advancedFilters, setAdvancedFilters] = useState({
    radius: 10,
    services: [],
    languages: [],
    priceRange: '',
    rating: 0,
    emergencyAvailable: false,
    verifiedOnly: false,
    availableNow: false
  });

  // Mock service providers data
  const mockProviders = [
    {
      id: 'sp-001',
      name: 'Seattle Pro Plumbing',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      services: ['Emergency Plumbing', 'Pipe Repair', 'Water Heater'],
      rating: 4.8,
      reviewCount: 127,
      isAvailable: true,
      isEmergencyAvailable: true,
      isVerified: true,
      isFavorite: false,
      distance: '0.8 mi',
      priceRange: '$75-$150',
      responseTime: '15 min',
      completedJobs: 450
    },
    {
      id: 'sp-002',
      name: 'Elite Electrical Services',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
      services: ['Electrical Repair', 'Wiring', 'Panel Upgrade'],
      rating: 4.9,
      reviewCount: 89,
      isAvailable: true,
      isEmergencyAvailable: false,
      isVerified: true,
      isFavorite: true,
      distance: '1.2 mi',
      priceRange: '$85-$200',
      responseTime: '20 min',
      completedJobs: 320
    },
    {
      id: 'sp-003',
      name: 'Master Carpenter Co.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop',
      services: ['Carpentry', 'Cabinet Repair', 'Door Installation'],
      rating: 4.7,
      reviewCount: 156,
      isAvailable: false,
      isEmergencyAvailable: false,
      isVerified: true,
      isFavorite: false,
      distance: '2.1 mi',
      priceRange: '$60-$120',
      responseTime: '45 min',
      completedJobs: 280
    },
    {
      id: 'sp-004',
      name: 'Quick Fix HVAC',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop',
      services: ['HVAC Repair', 'AC Service', 'Heating'],
      rating: 4.6,
      reviewCount: 203,
      isAvailable: true,
      isEmergencyAvailable: true,
      isVerified: false,
      isFavorite: false,
      distance: '1.8 mi',
      priceRange: '$90-$180',
      responseTime: '30 min',
      completedJobs: 380
    },
    {
      id: 'sp-005',
      name: 'Reliable Locksmith',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      services: ['Lockout Service', 'Lock Repair', 'Key Duplication'],
      rating: 4.5,
      reviewCount: 94,
      isAvailable: true,
      isEmergencyAvailable: true,
      isVerified: true,
      isFavorite: false,
      distance: '0.5 mi',
      priceRange: '$50-$100',
      responseTime: '10 min',
      completedJobs: 520
    },
    {
      id: 'sp-006',
      name: 'Home Appliance Experts',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
      services: ['Appliance Repair', 'Washer/Dryer', 'Refrigerator'],
      rating: 4.4,
      reviewCount: 78,
      isAvailable: false,
      isEmergencyAvailable: false,
      isVerified: true,
      isFavorite: true,
      distance: '3.2 mi',
      priceRange: '$70-$140',
      responseTime: '60 min',
      completedJobs: 190
    }
  ];

  const [providers, setProviders] = useState(mockProviders);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);

  // Initialize component
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Get saved location
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setCurrentLocation(savedLocation);
    }

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort providers
  useEffect(() => {
    let filtered = [...providers];

    // Apply search query
    if (searchQuery) {
      filtered = filtered?.filter(provider =>
        provider?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        provider?.services?.some(service => 
          service?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    }

    // Apply quick filters
    if (activeFilters?.includes('available')) {
      filtered = filtered?.filter(p => p?.isAvailable);
    }
    if (activeFilters?.includes('emergency')) {
      filtered = filtered?.filter(p => p?.isEmergencyAvailable);
    }
    if (activeFilters?.includes('highly-rated')) {
      filtered = filtered?.filter(p => p?.rating >= 4.5);
    }
    if (activeFilters?.includes('verified')) {
      filtered = filtered?.filter(p => p?.isVerified);
    }

    // Apply advanced filters
    if (advancedFilters?.verifiedOnly) {
      filtered = filtered?.filter(p => p?.isVerified);
    }
    if (advancedFilters?.availableNow) {
      filtered = filtered?.filter(p => p?.isAvailable);
    }
    if (advancedFilters?.emergencyAvailable) {
      filtered = filtered?.filter(p => p?.isEmergencyAvailable);
    }
    if (advancedFilters?.rating > 0) {
      filtered = filtered?.filter(p => p?.rating >= advancedFilters?.rating);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b?.rating - a?.rating;
        case 'price-low':
          return parseInt(a?.priceRange?.split('-')?.[0]?.replace('$', '')) - 
                 parseInt(b?.priceRange?.split('-')?.[0]?.replace('$', ''));
        case 'price-high':
          return parseInt(b?.priceRange?.split('-')?.[0]?.replace('$', '')) - 
                 parseInt(a?.priceRange?.split('-')?.[0]?.replace('$', ''));
        case 'availability':
          return (b?.isAvailable ? 1 : 0) - (a?.isAvailable ? 1 : 0);
        case 'reviews':
          return b?.reviewCount - a?.reviewCount;
        case 'distance':
        default:
          return parseFloat(a?.distance) - parseFloat(b?.distance);
      }
    });

    setFilteredProviders(filtered);
  }, [providers, searchQuery, activeFilters, advancedFilters, sortBy]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params?.set('q', searchQuery);
    if (viewMode !== 'list') params?.set('view', viewMode);
    if (sortBy !== 'distance') params?.set('sort', sortBy);
    setSearchParams(params);
  }, [searchQuery, viewMode, sortBy, setSearchParams]);

  // Event handlers
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleLocationClick = () => {
    // In a real app, this would open a location picker
    const newLocation = prompt('Enter your location:', currentLocation);
    if (newLocation) {
      setCurrentLocation(newLocation);
      localStorage.setItem('userLocation', newLocation);
    }
  };

  const handleFavoriteToggle = (providerId) => {
    setProviders(prev => prev?.map(provider =>
      provider?.id === providerId
        ? { ...provider, isFavorite: !provider?.isFavorite }
        : provider
    ));
  };

  const handleQuickBook = (provider) => {
    navigate(`/booking-scheduling?providerId=${provider?.id}&service=${encodeURIComponent(provider?.services?.[0])}`);
  };

  const handleAdvancedFiltersChange = (newFilters) => {
    setAdvancedFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onLocationClick={handleLocationClick}
          currentLocation={currentLocation}
        />
        <FilterChips
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
          onAdvancedFilters={() => setIsAdvancedFiltersOpen(true)}
        />
        <SortControls
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultsCount={0}
        />
        <div className="px-4 py-6">
          <LoadingSkeletons count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onLocationClick={handleLocationClick}
        currentLocation={currentLocation}
      />
      {/* Filter Chips */}
      <FilterChips
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
        onAdvancedFilters={() => setIsAdvancedFiltersOpen(true)}
      />
      {/* Sort Controls */}
      <SortControls
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        resultsCount={filteredProviders?.length}
      />
      {/* Main Content */}
      <div className="flex-1">
        {viewMode === 'list' ? (
          <div className="px-4 py-6">
            {filteredProviders?.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No providers found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search in a different area
                </p>
                <button
                  onClick={() => {
                    setActiveFilters([]);
                    setAdvancedFilters({
                      radius: 10,
                      services: [],
                      languages: [],
                      priceRange: '',
                      rating: 0,
                      emergencyAvailable: false,
                      verifiedOnly: false,
                      availableNow: false
                    });
                    setSearchQuery('');
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders?.map((provider) => (
                  <ServiceProviderCard
                    key={provider?.id}
                    provider={provider}
                    onFavoriteToggle={handleFavoriteToggle}
                    onQuickBook={handleQuickBook}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="h-[calc(100vh-200px)] p-4">
            <MapView
              providers={filteredProviders}
              onProviderSelect={setSelectedMapProvider}
              selectedProvider={selectedMapProvider}
            />
          </div>
        )}
      </div>
      {/* Advanced Filters Panel */}
      <AdvancedFiltersPanel
        isOpen={isAdvancedFiltersOpen}
        onClose={() => setIsAdvancedFiltersOpen(false)}
        filters={advancedFilters}
        onFiltersChange={handleAdvancedFiltersChange}
      />
    </div>
  );
};

export default ServiceProviderSearchDiscovery;