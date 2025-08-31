import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, onStatusUpdate, onCancel, onReschedule, onContact, onRate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'in-progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return 'Clock';
      case 'in-progress':
        return 'Zap';
      case 'completed':
        return 'CheckCircle';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Calendar';
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
      time: date?.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const getTimeUntil = (dateString) => {
    const now = new Date();
    const bookingTime = new Date(dateString);
    const diffMs = bookingTime - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMs < 0) return 'Past due';
    if (diffHours < 1) return 'Starting soon';
    if (diffHours < 24) return `In ${diffHours}h`;
    return `In ${diffDays}d`;
  };

  const { date, time } = formatDateTime(booking?.scheduledTime);

  return (
    <div className="bg-card border border-border rounded-lg shadow-card hover:shadow-hover transition-standard">
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <Image
              src={booking?.provider?.avatar}
              alt={booking?.provider?.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground truncate">
                {booking?.service?.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {booking?.provider?.name}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="text-xs text-muted-foreground">
                    {booking?.provider?.rating}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {booking?.provider?.completedJobs} jobs
                </span>
              </div>
            </div>
          </div>
          
          <div className={`px-2 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getStatusColor(booking?.status)}`}>
            <Icon name={getStatusIcon(booking?.status)} size={12} />
            <span className="capitalize">{booking?.status?.replace('-', ' ')}</span>
          </div>
        </div>

        {/* Booking Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>{time}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span className="truncate">{booking?.address}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="DollarSign" size={14} />
              <span>${booking?.price}</span>
            </div>
            {booking?.status === 'upcoming' && (
              <div className="text-xs text-primary font-medium">
                {getTimeUntil(booking?.scheduledTime)}
              </div>
            )}
          </div>
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Service Details</h4>
              <p className="text-sm text-muted-foreground">
                {booking?.service?.description}
              </p>
            </div>
            
            {booking?.notes && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Notes</h4>
                <p className="text-sm text-muted-foreground">{booking?.notes}</p>
              </div>
            )}
            
            {booking?.status === 'in-progress' && booking?.estimatedCompletion && (
              <div className="bg-warning/10 border border-warning/20 rounded-md p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-warning" />
                  <span className="text-sm font-medium text-warning">
                    Estimated completion: {formatDateTime(booking?.estimatedCompletion)?.time}
                  </span>
                </div>
              </div>
            )}
            
            {booking?.status === 'completed' && booking?.completedAt && (
              <div className="bg-success/10 border border-success/20 rounded-md p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span className="text-sm font-medium text-success">
                    Completed on {formatDateTime(booking?.completedAt)?.date} at {formatDateTime(booking?.completedAt)?.time}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {isExpanded ? 'Less' : 'Details'}
            </Button>
            
            <div className="flex items-center space-x-2">
              {booking?.status === 'upcoming' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onContact(booking)}
                    iconName="MessageCircle"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReschedule(booking)}
                    iconName="Calendar"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onCancel(booking)}
                    iconName="X"
                  />
                </>
              )}
              
              {booking?.status === 'in-progress' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onContact(booking)}
                    iconName="Phone"
                  />
                  <Link to={`/booking-tracking/${booking?.id}`}>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="MapPin"
                    >
                      Track
                    </Button>
                  </Link>
                </>
              )}
              
              {booking?.status === 'completed' && !booking?.rated && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onRate(booking)}
                  iconName="Star"
                >
                  Rate
                </Button>
              )}
              
              {booking?.status === 'completed' && (
                <Link to={`/booking-scheduling?rebookProvider=${booking?.provider?.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RotateCcw"
                  >
                    Rebook
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;