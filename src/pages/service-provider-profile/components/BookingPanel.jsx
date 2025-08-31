import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BookingPanel = ({ provider, onBookNow, isSticky = false }) => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const serviceOptions = provider?.services?.map(service => ({
    value: service?.id,
    label: `${service?.name} - ${service?.priceRange}`,
    description: service?.description
  }));

  const dateOptions = [
    { value: 'today', label: 'Today', description: 'Same day service' },
    { value: 'tomorrow', label: 'Tomorrow', description: 'Next day service' },
    { value: 'this-week', label: 'This Week', description: 'Within 7 days' },
    { value: 'next-week', label: 'Next Week', description: '8-14 days' }
  ];

  const timeOptions = [
    { value: 'morning', label: 'Morning (8AM - 12PM)' },
    { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
    { value: 'evening', label: 'Evening (5PM - 8PM)' },
    { value: 'emergency', label: '24/7 Emergency' }
  ];

  const handleQuickBook = () => {
    const bookingData = {
      providerId: provider?.id,
      service: selectedService,
      preferredDate: selectedDate,
      preferredTime: selectedTime
    };
    onBookNow(bookingData);
  };

  const isBookingReady = selectedService && selectedDate && selectedTime;

  return (
    <div className={`bg-card border border-border rounded-lg ${isSticky ? 'sticky top-20' : ''}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-foreground">Quick Booking</h3>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="text-sm font-medium">{provider?.rating}</span>
            <span className="text-sm text-muted-foreground">({provider?.reviewCount})</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Book instantly or get a custom quote
        </p>
      </div>
      <div className="p-4 space-y-4">
        {/* Service Selection */}
        <div>
          <Select
            label="Select Service"
            placeholder="Choose a service"
            options={serviceOptions}
            value={selectedService}
            onChange={setSelectedService}
            searchable
          />
        </div>

        {/* Date Selection */}
        <div>
          <Select
            label="Preferred Date"
            placeholder="When do you need service?"
            options={dateOptions}
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </div>

        {/* Time Selection */}
        <div>
          <Select
            label="Preferred Time"
            placeholder="What time works best?"
            options={timeOptions}
            value={selectedTime}
            onChange={setSelectedTime}
          />
        </div>

        {/* Pricing Info */}
        {selectedService && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Estimated Cost:</span>
              <span className="font-medium text-foreground">
                {provider?.services?.find(s => s?.id === selectedService)?.priceRange}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Response Time:</span>
              <span className="text-sm font-medium text-primary">{provider?.responseTime}</span>
            </div>
          </div>
        )}

        {/* Booking Actions */}
        <div className="space-y-2">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={handleQuickBook}
            disabled={!isBookingReady}
            iconName="Calendar"
            iconPosition="left"
          >
            Book Now
          </Button>
          
          <Button
            variant="outline"
            size="default"
            fullWidth
            onClick={() => window.open(`tel:${provider?.contact?.phone}`, '_self')}
            iconName="Phone"
            iconPosition="left"
          >
            Call {provider?.contact?.phone}
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="pt-3 border-t border-border">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center space-x-1 text-success">
              <Icon name="Shield" size={12} />
              <span>Verified</span>
            </div>
            <div className="flex items-center space-x-1 text-success">
              <Icon name="CheckCircle" size={12} />
              <span>Licensed</span>
            </div>
            <div className="flex items-center space-x-1 text-success">
              <Icon name="Heart" size={12} />
              <span>Insured</span>
            </div>
            <div className="flex items-center space-x-1 text-success">
              <Icon name="Award" size={12} />
              <span>Top Rated</span>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        {provider?.emergencyService && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-error">
              <Icon name="AlertTriangle" size={14} />
              <span className="text-xs font-medium">24/7 Emergency Available</span>
            </div>
            <p className="text-xs text-error/80 mt-1">
              Call emergency line for urgent repairs
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPanel;