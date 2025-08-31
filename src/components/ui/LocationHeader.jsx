import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LocationHeader = () => {
  const [currentLocation, setCurrentLocation] = useState('Detecting location...');
  const [isEditing, setIsEditing] = useState(false);
  const [editLocation, setEditLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved location in localStorage
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setCurrentLocation(savedLocation);
      setIsLoading(false);
      return;
    }

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          // In a real app, you would reverse geocode these coordinates
          const mockLocation = 'Downtown Seattle, WA';
          setCurrentLocation(mockLocation);
          localStorage.setItem('userLocation', mockLocation);
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation('Seattle, WA');
          setIsLoading(false);
        }
      );
    } else {
      setCurrentLocation('Location not available');
      setIsLoading(false);
    }
  }, []);

  const handleEditLocation = () => {
    setEditLocation(currentLocation);
    setIsEditing(true);
  };

  const handleSaveLocation = () => {
    if (editLocation?.trim()) {
      setCurrentLocation(editLocation?.trim());
      localStorage.setItem('userLocation', editLocation?.trim());
      setIsEditing(false);
      setEditLocation('');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditLocation('');
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSaveLocation();
    } else if (e?.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className="bg-muted border-b border-border">
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <Icon 
              name="MapPin" 
              size={16} 
              className="text-primary flex-shrink-0" 
            />
            
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin">
                  <Icon name="Loader2" size={14} className="text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Detecting location...
                </span>
              </div>
            ) : isEditing ? (
              <div className="flex items-center space-x-2 flex-1">
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e?.target?.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 px-2 py-1 text-sm bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your location"
                  autoFocus
                />
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={handleSaveLocation}
                    iconName="Check"
                    className="text-success hover:text-success"
                  />
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={handleCancelEdit}
                    iconName="X"
                    className="text-muted-foreground hover:text-foreground"
                  />
                </div>
              </div>
            ) : (
              <>
                <span className="text-sm font-medium text-foreground truncate">
                  Service area: {currentLocation}
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={handleEditLocation}
                  iconName="Edit2"
                  className="text-muted-foreground hover:text-primary ml-2 flex-shrink-0"
                />
              </>
            )}
          </div>

          {/* Desktop: Expanded location info */}
          <div className="hidden lg:flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>Available 24/7</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Verified Providers</span>
            </div>
          </div>

          {/* Mobile: Location dropdown */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="xs"
              iconName="ChevronDown"
              className="text-muted-foreground"
            />
          </div>
        </div>

        {/* Mobile: Expanded info (hidden by default, could be toggled) */}
        <div className="lg:hidden mt-2 pt-2 border-t border-border hidden">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationHeader;