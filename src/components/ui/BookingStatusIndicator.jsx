import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const BookingStatusIndicator = () => {
  const [bookingStatus, setBookingStatus] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock booking data - in real app, this would come from context/API
  useEffect(() => {
    // Simulate checking for active bookings
    const mockBooking = {
      id: 'BK-2025-001',
      service: 'Emergency Plumbing',
      provider: 'Seattle Pro Plumbing',
      status: 'confirmed', // confirmed, in-progress, completed, cancelled
      scheduledTime: '2025-08-31T15:30:00',
      estimatedArrival: '2025-08-31T15:45:00',
      address: '123 Main St, Seattle, WA'
    };

    // Check localStorage for active bookings
    const activeBookings = JSON.parse(localStorage.getItem('activeBookings') || '[]');
    if (activeBookings?.length > 0) {
      setBookingStatus(activeBookings?.[0]);
    } else {
      // For demo purposes, set a mock booking
      setBookingStatus(mockBooking);
      localStorage.setItem('activeBookings', JSON.stringify([mockBooking]));
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-primary bg-primary/10';
      case 'in-progress':
        return 'text-warning bg-warning/10';
      case 'completed':
        return 'text-success bg-success/10';
      case 'cancelled':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'completed':
        return 'CheckCircle2';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Calendar';
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTimeUntilArrival = (arrivalTime) => {
    const now = new Date();
    const arrival = new Date(arrivalTime);
    const diffMs = arrival - now;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins <= 0) return 'Arriving now';
    if (diffMins < 60) return `${diffMins} min`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  };

  if (!bookingStatus) {
    return null;
  }

  return (
    <>
      {/* Desktop: Header status indicator */}
      <div className="hidden lg:block">
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-standard"
          >
            <div className={`w-2 h-2 rounded-full ${getStatusColor(bookingStatus?.status)?.split(' ')?.[1]}`}></div>
            <span className="text-sm font-medium">Active Booking</span>
            <Icon name="ChevronDown" size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>

          {isExpanded && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-160">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-sm">{bookingStatus?.service}</h3>
                    <p className="text-xs text-muted-foreground">{bookingStatus?.provider}</p>
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(bookingStatus?.status)}`}>
                    <Icon name={getStatusIcon(bookingStatus?.status)} size={12} />
                    <span className="capitalize">{bookingStatus?.status}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Scheduled:</span>
                    <span className="font-mono">{formatTime(bookingStatus?.scheduledTime)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ETA:</span>
                    <span className="font-mono text-primary">{getTimeUntilArrival(bookingStatus?.estimatedArrival)}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <Link
                    to="/booking-management"
                    className="text-xs text-primary hover:text-primary/80 font-medium"
                    onClick={() => setIsExpanded(false)}
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Mobile: Bottom navigation badge */}
      <div className="lg:hidden">
        <Link
          to="/booking-management"
          className="relative inline-block"
        >
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs text-primary-foreground font-bold">1</span>
          </div>
        </Link>
      </div>
      {/* Mobile: Expandable status bar */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-140 bg-card border-b border-border shadow-sm">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2 flex items-center justify-between hover:bg-muted/50 transition-micro"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(bookingStatus?.status)?.split(' ')?.[1]}`}></div>
            <div className="text-left">
              <p className="text-sm font-medium">{bookingStatus?.service}</p>
              <p className="text-xs text-muted-foreground">
                ETA: {getTimeUntilArrival(bookingStatus?.estimatedArrival)}
              </p>
            </div>
          </div>
          <Icon name="ChevronDown" size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {isExpanded && (
          <div className="px-4 pb-3 border-t border-border bg-muted/30">
            <div className="pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Provider:</span>
                <span>{bookingStatus?.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={`capitalize ${getStatusColor(bookingStatus?.status)?.split(' ')?.[0]}`}>
                  {bookingStatus?.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scheduled:</span>
                <span className="font-mono">{formatTime(bookingStatus?.scheduledTime)}</span>
              </div>
            </div>
            <Link
              to="/booking-management"
              className="inline-block mt-3 text-sm text-primary hover:text-primary/80 font-medium"
              onClick={() => setIsExpanded(false)}
            >
              Manage Booking →
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingStatusIndicator;