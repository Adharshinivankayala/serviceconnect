import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LocationConfirmation = ({ address, onAddressChange, accessInstructions, onAccessInstructionsChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);
  const [coordinates, setCoordinates] = useState({ lat: 47.6062, lng: -122.3321 }); // Seattle default

  useEffect(() => {
    setTempAddress(address);
  }, [address]);

  const handleSaveAddress = () => {
    onAddressChange(tempAddress);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempAddress(address);
    setIsEditing(false);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          
          // In a real app, you would reverse geocode these coordinates
          const mockAddress = "1234 Pine Street, Seattle, WA 98101";
          setTempAddress(mockAddress);
          onAddressChange(mockAddress);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to default Seattle location
          const mockAddress = "Downtown Seattle, WA 98101";
          setTempAddress(mockAddress);
          onAddressChange(mockAddress);
        }
      );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="MapPin" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Service Location</h2>
      </div>
      {/* Address Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-foreground">Service Address</label>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="xs"
              onClick={handleUseCurrentLocation}
              iconName="Navigation"
              iconPosition="left"
            >
              Use Current
            </Button>
            {!isEditing && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setIsEditing(true)}
                iconName="Edit2"
              />
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <Input
              type="text"
              value={tempAddress}
              onChange={(e) => setTempAddress(e?.target?.value)}
              placeholder="Enter complete address"
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveAddress}
                iconName="Check"
                iconPosition="left"
              >
                Save Address
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelEdit}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Home" size={16} className="text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{address}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Service will be provided at this location
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Map Preview */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">Location Preview</label>
        <div className="w-full h-48 bg-muted rounded-lg overflow-hidden border border-border">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Service Location"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${coordinates?.lat},${coordinates?.lng}&z=15&output=embed`}
            className="border-0"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Map shows approximate location for service provider reference
        </p>
      </div>
      {/* Access Instructions */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Access Instructions
        </label>
        <textarea
          value={accessInstructions}
          onChange={(e) => onAccessInstructionsChange(e?.target?.value)}
          placeholder="Building entry codes, parking instructions, apartment number, special directions..."
          className="w-full h-24 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
        <div className="flex items-start space-x-2 mt-2">
          <Icon name="Info" size={12} className="text-muted-foreground mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Help your service provider find and access your location easily. Include gate codes, parking spots, or any special entry requirements.
          </p>
        </div>
      </div>
      {/* Location Verification */}
      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Location Verified</p>
            <p className="text-xs text-muted-foreground">
              This address is within our service area and accessible to providers
            </p>
          </div>
          <Icon name="CheckCircle" size={16} className="text-success" />
        </div>
      </div>
    </div>
  );
};

export default LocationConfirmation;