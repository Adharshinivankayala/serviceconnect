import React from 'react';
import Icon from '../../../components/AppIcon';

const PriceEstimation = ({ selectedServices, selectedTime, isEmergency, address }) => {
  const calculateSubtotal = () => {
    return selectedServices?.reduce((total, service) => {
      const basePrice = selectedTime?.price || service?.basePrice;
      return total + (basePrice * service?.quantity);
    }, 0);
  };

  const calculateEmergencyFee = () => {
    if (!isEmergency) return 0;
    return Math.round(calculateSubtotal() * 0.5); // 50% emergency fee
  };

  const calculateServiceFee = () => {
    return Math.round(calculateSubtotal() * 0.08); // 8% platform fee
  };

  const calculateTax = () => {
    const taxableAmount = calculateSubtotal() + calculateEmergencyFee() + calculateServiceFee();
    return Math.round(taxableAmount * 0.095); // 9.5% tax (Seattle rate)
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateEmergencyFee() + calculateServiceFee() + calculateTax();
  };

  const getEstimatedDuration = () => {
    const totalMinutes = selectedServices?.reduce((total, service) => {
      return total + (service?.duration * service?.quantity);
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  if (selectedServices?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Calculator" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Price Estimate</h2>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="DollarSign" size={24} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Select services to see price estimate</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Calculator" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Price Estimate</h2>
        {isEmergency && (
          <span className="px-2 py-1 bg-error/10 text-error text-xs font-medium rounded-full">
            Emergency Pricing
          </span>
        )}
      </div>
      {/* Service Breakdown */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-medium text-foreground">Service Details</h3>
        {selectedServices?.map((service) => {
          const servicePrice = selectedTime?.price || service?.basePrice;
          const totalServicePrice = servicePrice * service?.quantity;
          
          return (
            <div key={service?.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{service?.name}</p>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span>Qty: {service?.quantity}</span>
                  <span>${servicePrice} each</span>
                  <span>{service?.duration}min each</span>
                </div>
              </div>
              <span className="text-sm font-medium text-foreground">${totalServicePrice}</span>
            </div>
          );
        })}
      </div>
      {/* Time & Duration Info */}
      {selectedTime && (
        <div className="mb-6 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-primary" />
              <span className="text-muted-foreground">Estimated Duration:</span>
            </div>
            <span className="font-medium text-foreground">{getEstimatedDuration()}</span>
          </div>
          {selectedTime?.isPeak && (
            <div className="flex items-center space-x-2 mt-2 text-xs">
              <Icon name="TrendingUp" size={12} className="text-warning" />
              <span className="text-warning">Peak hour pricing applied</span>
            </div>
          )}
        </div>
      )}
      {/* Price Breakdown */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${calculateSubtotal()}</span>
        </div>
        
        {isEmergency && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">Emergency Fee</span>
              <span className="text-xs text-error">(+50%)</span>
            </div>
            <span className="text-error">${calculateEmergencyFee()}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Service Fee</span>
          <span className="text-foreground">${calculateServiceFee()}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">${calculateTax()}</span>
        </div>
      </div>
      {/* Total */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <span className="text-xl font-bold text-primary">${calculateTotal()}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Final price may vary based on actual work completed
        </p>
      </div>
      {/* Payment Terms */}
      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={14} className="text-primary mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Payment Terms</p>
            <ul className="space-y-1">
              <li>• Payment due upon service completion</li>
              <li>• Additional charges may apply for extra work</li>
              <li>• Cancellation within 2 hours incurs 25% fee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceEstimation;