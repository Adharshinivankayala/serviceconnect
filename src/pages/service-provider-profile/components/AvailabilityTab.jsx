import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AvailabilityTab = ({ provider, onBookSlot }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [viewMode, setViewMode] = useState('week'); // week, month

  // Generate calendar dates
  const generateCalendarDates = () => {
    const today = new Date();
    const dates = [];
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date?.setDate(today?.getDate() + i);
      dates?.push(date);
    }
    
    return dates;
  };

  const calendarDates = generateCalendarDates();

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isDateSelected = (date) => {
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const isDateAvailable = (date) => {
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const getAvailableSlotsForDate = (date) => {
    const dateKey = date?.toISOString()?.split('T')?.[0];
    return provider?.availability?.schedule?.[dateKey] || [];
  };

  const getSlotStatus = (slot) => {
    if (!slot?.available) return 'unavailable';
    if (slot?.emergency) return 'emergency';
    if (slot?.popular) return 'popular';
    return 'available';
  };

  const getSlotStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-background border-border text-foreground hover:bg-primary hover:text-primary-foreground';
      case 'popular':
        return 'bg-warning/10 border-warning text-warning hover:bg-warning hover:text-white';
      case 'emergency':
        return 'bg-error/10 border-error text-error hover:bg-error hover:text-white';
      case 'unavailable':
        return 'bg-muted border-muted text-muted-foreground cursor-not-allowed';
      default:
        return 'bg-background border-border text-foreground';
    }
  };

  return (
    <div className="px-4 lg:px-6 py-6 space-y-6">
      {/* Emergency Availability Banner */}
      {provider?.emergencyService && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-error mb-1">24/7 Emergency Service</h3>
              <p className="text-sm text-error/80 mb-3">
                Available for urgent repairs outside regular hours. Additional charges may apply.
              </p>
              <Button
                variant="destructive"
                size="sm"
                iconName="Phone"
                iconPosition="left"
                onClick={() => window.open(`tel:${provider?.contact?.emergencyPhone}`, '_self')}
              >
                Call Emergency Line
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Calendar Navigation */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-primary" />
            <span>Select Date</span>
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {calendarDates?.map((date, index) => {
            const isSelected = isDateSelected(date);
            const isAvailable = isDateAvailable(date);
            const hasSlots = getAvailableSlotsForDate(date)?.length > 0;
            
            return (
              <button
                key={index}
                onClick={() => isAvailable && setSelectedDate(date)}
                disabled={!isAvailable}
                className={`flex-shrink-0 p-3 rounded-lg border text-center min-w-[80px] transition-standard ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary'
                    : isAvailable
                    ? hasSlots
                      ? 'bg-background border-border text-foreground hover:bg-muted'
                      : 'bg-muted border-muted text-muted-foreground' :'bg-muted border-muted text-muted-foreground cursor-not-allowed opacity-50'
                }`}
              >
                <div className="text-xs font-medium">
                  {date?.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg font-semibold">
                  {date?.getDate()}
                </div>
                <div className="text-xs">
                  {date?.toLocaleDateString('en-US', { month: 'short' })}
                </div>
                {hasSlots && (
                  <div className="w-1 h-1 bg-primary rounded-full mx-auto mt-1"></div>
                )}
              </button>
            );
          })}
        </div>
      </section>
      {/* Time Slots */}
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <span>Available Times - {formatDate(selectedDate)}</span>
        </h3>

        {getAvailableSlotsForDate(selectedDate)?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">No availability</h4>
            <p className="text-muted-foreground">
              No time slots available for this date. Please select another date.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {getAvailableSlotsForDate(selectedDate)?.map((slot, index) => {
              const status = getSlotStatus(slot);
              const isSelected = selectedTimeSlot === `${selectedDate?.toISOString()?.split('T')?.[0]}-${slot?.time}`;
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (slot?.available) {
                      setSelectedTimeSlot(`${selectedDate?.toISOString()?.split('T')?.[0]}-${slot?.time}`);
                    }
                  }}
                  disabled={!slot?.available}
                  className={`p-3 rounded-lg border text-center transition-standard ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : getSlotStatusColor(status)
                  }`}
                >
                  <div className="font-medium">{formatTime(slot?.time)}</div>
                  {slot?.duration && (
                    <div className="text-xs opacity-80 mt-1">{slot?.duration}</div>
                  )}
                  {slot?.emergency && (
                    <div className="text-xs mt-1 flex items-center justify-center space-x-1">
                      <Icon name="Zap" size={10} />
                      <span>Emergency</span>
                    </div>
                  )}
                  {slot?.popular && (
                    <div className="text-xs mt-1 flex items-center justify-center space-x-1">
                      <Icon name="TrendingUp" size={10} />
                      <span>Popular</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>
      {/* Booking Summary */}
      {selectedTimeSlot && (
        <section className="bg-muted/50 rounded-lg p-4 border border-border">
          <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Selected Time Slot</span>
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium text-foreground">{formatDate(selectedDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium text-foreground">
                {formatTime(selectedTimeSlot?.split('-')?.[1])}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provider:</span>
              <span className="font-medium text-foreground">{provider?.name}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={() => onBookSlot(selectedDate, selectedTimeSlot?.split('-')?.[1])}
              iconName="Calendar"
              iconPosition="left"
            >
              Book This Time Slot
            </Button>
          </div>
        </section>
      )}
      {/* Booking Policies */}
      <section className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span>Booking Policies</span>
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon name="Clock" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Cancellation allowed up to 2 hours before appointment</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="DollarSign" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Payment required at time of booking</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Shield" size={14} className="mt-0.5 flex-shrink-0" />
            <span>All work comes with satisfaction guarantee</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Phone" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Provider will call 15 minutes before arrival</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AvailabilityTab;