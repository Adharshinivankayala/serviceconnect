import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ServiceProviderCard = ({ provider, onFavoriteToggle, onQuickBook }) => {
  const {
    id,
    name,
    photo,
    services,
    rating,
    reviewCount,
    isAvailable,
    distance,
    priceRange,
    isEmergencyAvailable,
    isVerified,
    isFavorite,
    responseTime,
    completedJobs
  } = provider;

  const getAvailabilityStatus = () => {
    if (isEmergencyAvailable) return { text: 'Emergency Available', color: 'text-error', bg: 'bg-error/10' };
    if (isAvailable) return { text: 'Available Now', color: 'text-success', bg: 'bg-success/10' };
    return { text: 'Busy', color: 'text-warning', bg: 'bg-warning/10' };
  };

  const status = getAvailabilityStatus();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? 'text-amber-400 fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card hover:shadow-hover transition-standard overflow-hidden">
      {/* Provider Image & Status */}
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={photo}
            alt={`${name} - Service Provider`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${status?.bg} ${status?.color}`}>
          <div className="flex items-center space-x-1">
            <div className={`w-1.5 h-1.5 rounded-full ${status?.color === 'text-success' ? 'bg-success' : status?.color === 'text-error' ? 'bg-error' : 'bg-warning'}`}></div>
            <span>{status?.text}</span>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onFavoriteToggle(id)}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-micro"
        >
          <Icon
            name="Heart"
            size={16}
            className={isFavorite ? 'text-error fill-current' : 'text-muted-foreground'}
          />
        </button>

        {/* Verification Badge */}
        {isVerified && (
          <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="CheckCircle" size={12} />
            <span>Verified</span>
          </div>
        )}
      </div>
      {/* Provider Info */}
      <div className="p-4">
        {/* Name & Rating */}
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <Link
              to={`/service-provider-profile?id=${id}`}
              className="text-lg font-semibold text-foreground hover:text-primary transition-micro line-clamp-1"
            >
              {name}
            </Link>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                {renderStars(rating)}
              </div>
              <span className="text-sm font-medium text-foreground">{rating}</span>
              <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {services?.slice(0, 3)?.map((service, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
              >
                {service}
              </span>
            ))}
            {services?.length > 3 && (
              <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                +{services?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-muted-foreground">
              <Icon name="MapPin" size={12} />
              <span>{distance}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Distance</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>{responseTime}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Response</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-muted-foreground">
              <Icon name="CheckCircle2" size={12} />
              <span>{completedJobs}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Jobs Done</div>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-foreground">{priceRange}</div>
            <div className="text-xs text-muted-foreground">Starting price</div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link to={`/service-provider-profile?id=${id}`}>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </Link>
            <Button
              variant="default"
              size="sm"
              onClick={() => onQuickBook(provider)}
              disabled={!isAvailable && !isEmergencyAvailable}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderCard;