import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingSummary = ({ 
  selectedServices, 
  selectedDate, 
  selectedTime, 
  address, 
  isEmergency, 
  specialInstructions,
  accessInstructions,
  onConfirmBooking,
  isLoading 
}) => {
  const [provider] = React.useState({
    id: 'provider-1',
    name: 'Seattle Pro Plumbing',
    rating: 4.8,
    reviewCount: 127,
    phone: '(206) 555-0123',
    email: 'contact@seattleproplumbing.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: true,
    responseTime: '< 15 min'
  });

  const calculateTotal = () => {
    const subtotal = selectedServices?.reduce((total, service) => {
      const basePrice = selectedTime?.price || service?.basePrice;
      return total + (basePrice * service?.quantity);
    }, 0);
    
    const emergencyFee = isEmergency ? Math.round(subtotal * 0.5) : 0;
    const serviceFee = Math.round(subtotal * 0.08);
    const tax = Math.round((subtotal + emergencyFee + serviceFee) * 0.095);
    
    return subtotal + emergencyFee + serviceFee + tax;
  };

  const getEstimatedArrival = () => {
    if (!selectedDate || !selectedTime) return null;
    
    const appointmentDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime?.time?.split(':');
    appointmentDate?.setHours(parseInt(hours), parseInt(minutes));
    
    // Add 15 minutes buffer for arrival
    const arrivalTime = new Date(appointmentDate.getTime() - 15 * 60000);
    
    return arrivalTime?.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDateTime = () => {
    if (!selectedDate || !selectedTime) return 'Not selected';
    
    const date = selectedDate?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    return `${date} at ${selectedTime?.time}`;
  };

  if (selectedServices?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="FileText" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Booking Summary</h2>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Calendar" size={24} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Complete the form to see booking summary</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="FileText" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Booking Summary</h2>
        {isEmergency && (
          <span className="px-2 py-1 bg-error/10 text-error text-xs font-medium rounded-full">
            Emergency
          </span>
        )}
      </div>
      {/* Provider Information */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={provider?.avatar}
            alt={provider?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-foreground">{provider?.name}</h3>
              {provider?.verified && (
                <Icon name="BadgeCheck" size={16} className="text-primary" />
              )}
            </div>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-warning fill-current" />
                <span>{provider?.rating} ({provider?.reviewCount})</span>
              </div>
              <span>Responds in {provider?.responseTime}</span>
            </div>
          </div>
          <Link
            to="/service-provider-profile"
            className="text-xs text-primary hover:text-primary/80"
          >
            View Profile
          </Link>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Phone" size={12} />
            <span>{provider?.phone}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Mail" size={12} />
            <span>{provider?.email}</span>
          </div>
        </div>
      </div>
      {/* Services */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Selected Services</h3>
        <div className="space-y-2">
          {selectedServices?.map((service) => (
            <div key={service?.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{service?.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {service?.quantity}</p>
              </div>
              <span className="text-sm font-medium text-foreground">
                ${(selectedTime?.price || service?.basePrice) * service?.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Date & Time */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-2">Appointment Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={14} className="text-primary" />
            <span className="text-foreground">{formatDateTime()}</span>
          </div>
          {getEstimatedArrival() && (
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-primary" />
              <span className="text-muted-foreground">
                Provider arrives by: {getEstimatedArrival()}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Location */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-2">Service Location</h3>
        <div className="flex items-start space-x-2">
          <Icon name="MapPin" size={14} className="text-primary mt-0.5" />
          <span className="text-sm text-foreground">{address}</span>
        </div>
      </div>
      {/* Instructions */}
      {(specialInstructions || accessInstructions) && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-2">Instructions</h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            {specialInstructions && (
              <div>
                <span className="font-medium">Service Notes:</span>
                <p className="mt-1">{specialInstructions}</p>
              </div>
            )}
            {accessInstructions && (
              <div>
                <span className="font-medium">Access Instructions:</span>
                <p className="mt-1">{accessInstructions}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Total */}
      <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">Total Amount</span>
          <span className="text-xl font-bold text-primary">${calculateTotal()}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Payment will be processed after service completion
        </p>
      </div>
      {/* Confirm Button */}
      <Button
        variant="default"
        size="lg"
        onClick={onConfirmBooking}
        loading={isLoading}
        iconName="CheckCircle"
        iconPosition="left"
        fullWidth
        disabled={!selectedDate || !selectedTime || selectedServices?.length === 0}
      >
        {isLoading ? 'Processing...' : 'Confirm Booking'}
      </Button>
      {/* Terms */}
      <div className="mt-4 text-xs text-muted-foreground text-center">
        <p>
          By confirming, you agree to our{' '}
          <a href="/terms" className="text-primary hover:text-primary/80">Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy" className="text-primary hover:text-primary/80">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;