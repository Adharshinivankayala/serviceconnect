import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ providers, onProviderSelect, selectedProvider }) => {
  const [mapCenter] = useState({ lat: 47.6062, lng: -122.3321 }); // Seattle coordinates

  // Mock map implementation using Google Maps iframe
  const mapSrc = `https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`;

  return (
    <div className="relative h-full min-h-[500px] bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Service Providers Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
          className="border-0"
        />
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          className="bg-background/90 backdrop-blur-sm"
        />
        <Button
          variant="outline"
          size="sm"
          iconName="Minus"
          className="bg-background/90 backdrop-blur-sm"
        />
        <Button
          variant="outline"
          size="sm"
          iconName="Locate"
          className="bg-background/90 backdrop-blur-sm"
        />
      </div>
      {/* Provider Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {providers?.slice(0, 10)?.map((provider, index) => {
          // Mock positioning for demonstration
          const positions = [
            { top: '20%', left: '30%' },
            { top: '40%', left: '60%' },
            { top: '60%', left: '25%' },
            { top: '30%', left: '70%' },
            { top: '70%', left: '50%' },
            { top: '25%', left: '80%' },
            { top: '55%', left: '15%' },
            { top: '80%', left: '35%' },
            { top: '15%', left: '55%' },
            { top: '45%', left: '85%' }
          ];

          const position = positions?.[index] || { top: '50%', left: '50%' };

          return (
            <div
              key={provider?.id}
              className="absolute pointer-events-auto"
              style={{ top: position?.top, left: position?.left, transform: 'translate(-50%, -50%)' }}
            >
              <button
                onClick={() => onProviderSelect(provider)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-md transition-all duration-200 hover:scale-110 ${
                  selectedProvider?.id === provider?.id
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/30'
                    : provider?.isEmergencyAvailable
                    ? 'bg-error text-error-foreground'
                    : provider?.isAvailable
                    ? 'bg-success text-success-foreground'
                    : 'bg-warning text-warning-foreground'
                }`}
              >
                <Icon name="MapPin" size={20} />
                
                {/* Price Badge */}
                <div className="absolute -top-2 -right-2 bg-background text-foreground text-xs px-1.5 py-0.5 rounded-full shadow-sm border border-border">
                  {provider?.priceRange?.split('-')?.[0]}
                </div>
              </button>
            </div>
          );
        })}
      </div>
      {/* Selected Provider Info Card */}
      {selectedProvider && (
        <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg shadow-modal p-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={selectedProvider?.photo}
                alt={selectedProvider?.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{selectedProvider?.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(selectedProvider?.rating) ? 'text-amber-400 fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {selectedProvider?.rating} ({selectedProvider?.reviewCount})
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} />
                  <span>{selectedProvider?.distance}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="DollarSign" size={12} />
                  <span>{selectedProvider?.priceRange}</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`/service-provider-profile?id=${selectedProvider?.id}`, '_blank')}
              >
                View
              </Button>
              <Button
                variant="default"
                size="sm"
                disabled={!selectedProvider?.isAvailable && !selectedProvider?.isEmergencyAvailable}
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3">
        <h4 className="text-sm font-medium text-foreground mb-2">Provider Status</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Available Now</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Emergency Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Busy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;