import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LocationSetup = ({ onLocationSet, isLoading }) => {
  const [locationData, setLocationData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    coordinates: null
  });
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [useManualEntry, setUseManualEntry] = useState(false);

  const detectLocation = () => {
    setIsDetecting(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      setIsDetecting(false);
      setUseManualEntry(true);
      return;
    }

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position?.coords;
        
        // Mock reverse geocoding - in real app, use Google Maps API
        const mockLocationData = {
          address: '123 Main Street',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          coordinates: { lat: latitude, lng: longitude }
        };

        setLocationData(mockLocationData);
        setIsDetecting(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationError('Unable to detect your location. Please enter manually.');
        setIsDetecting(false);
        setUseManualEntry(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setLocationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!locationData?.city || !locationData?.state || !locationData?.zipCode) {
      setLocationError('Please fill in all required location fields');
      return;
    }
    onLocationSet(locationData);
  };

  useEffect(() => {
    // Auto-detect location on component mount
    if (!useManualEntry) {
      detectLocation();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="MapPin" size={32} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Set Your Location
        </h3>
        <p className="text-muted-foreground">
          We'll use this to find service providers in your area
        </p>
      </div>
      {!useManualEntry && !locationData?.city && (
        <div className="text-center space-y-4">
          {isDetecting ? (
            <div className="space-y-3">
              <div className="animate-spin mx-auto">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Detecting your location...
              </p>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={detectLocation}
              iconName="Navigation"
              iconPosition="left"
              className="mx-auto"
            >
              Detect My Location
            </Button>
          )}

          <div className="flex items-center space-x-3">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          <Button
            variant="ghost"
            onClick={() => setUseManualEntry(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Enter Manually
          </Button>
        </div>
      )}
      {locationError && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{locationError}</p>
          </div>
        </div>
      )}
      {(useManualEntry || locationData?.city) && (
        <div className="space-y-4">
          <Input
            label="Street Address"
            type="text"
            name="address"
            value={locationData?.address}
            onChange={handleInputChange}
            placeholder="123 Main Street"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              type="text"
              name="city"
              value={locationData?.city}
              onChange={handleInputChange}
              placeholder="Seattle"
              required
            />

            <Input
              label="State"
              type="text"
              name="state"
              value={locationData?.state}
              onChange={handleInputChange}
              placeholder="WA"
              required
            />
          </div>

          <Input
            label="ZIP Code"
            type="text"
            name="zipCode"
            value={locationData?.zipCode}
            onChange={handleInputChange}
            placeholder="98101"
            required
          />

          {locationData?.coordinates && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <p className="text-sm text-success">Location detected successfully</p>
              </div>
            </div>
          )}

          <Button
            variant="default"
            onClick={handleSubmit}
            loading={isLoading}
            iconName="MapPin"
            iconPosition="left"
            fullWidth
          >
            Confirm Location
          </Button>
        </div>
      )}
      {/* Map Preview */}
      {locationData?.coordinates && (
        <div className="bg-muted rounded-lg overflow-hidden h-48">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Your Location"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${locationData?.coordinates?.lat},${locationData?.coordinates?.lng}&z=14&output=embed`}
            className="border-0"
          />
        </div>
      )}
    </div>
  );
};

export default LocationSetup;