import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProviderHero = ({ provider, onBookNow, onShare, onFavorite, isFavorite }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'busy':
        return 'text-warning bg-warning/10';
      case 'offline':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getAvailabilityIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'busy':
        return 'Clock';
      case 'offline':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
          {/* Provider Image */}
          <div className="flex-shrink-0 mb-4 lg:mb-0">
            <div className="relative w-24 h-24 lg:w-32 lg:h-32 mx-auto lg:mx-0">
              <div className="w-full h-full rounded-full overflow-hidden bg-muted">
                <Image
                  src={provider?.profileImage}
                  alt={`${provider?.name} profile`}
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoading(false)}
                />
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="User" size={32} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              
              {/* Verification Badge */}
              {provider?.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-card">
                  <Icon name="CheckCircle" size={16} className="text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Provider Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-3">
              <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                {provider?.name}
              </h1>
              <p className="text-muted-foreground mb-2">{provider?.businessName}</p>
              
              {/* Verification Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-3">
                {provider?.badges?.map((badge, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    <Icon name={badge?.icon} size={12} />
                    <span>{badge?.label}</span>
                  </span>
                ))}
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={`${
                          i < Math.floor(provider?.rating)
                            ? 'text-warning fill-current' :'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">{provider?.rating}</span>
                  <span className="text-muted-foreground">({provider?.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Availability Status */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getAvailabilityColor(provider?.availability?.status)}`}>
                  <Icon name={getAvailabilityIcon(provider?.availability?.status)} size={12} />
                  <span className="capitalize">{provider?.availability?.status}</span>
                </div>
                {provider?.availability?.nextAvailable && (
                  <span className="text-xs text-muted-foreground">
                    Next available: {provider?.availability?.nextAvailable}
                  </span>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{provider?.location?.distance} away</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{provider?.responseTime} response</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Briefcase" size={14} />
                  <span>{provider?.experienceYears}+ years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 mt-4 lg:mt-0">
            <div className="flex flex-col space-y-2 lg:space-y-3">
              <Button
                variant="default"
                size="lg"
                onClick={onBookNow}
                iconName="Calendar"
                iconPosition="left"
                fullWidth
                className="lg:w-auto lg:min-w-[140px]"
              >
                Book Now
              </Button>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => window.open(`tel:${provider?.contact?.phone}`, '_self')}
                  iconName="Phone"
                  className="flex-1 lg:flex-none"
                >
                  Call
                </Button>
                
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => window.open(`sms:${provider?.contact?.phone}`, '_self')}
                  iconName="MessageSquare"
                  className="flex-1 lg:flex-none"
                >
                  Text
                </Button>
                
                <Button
                  variant="ghost"
                  size="default"
                  onClick={onFavorite}
                  iconName={isFavorite ? "Heart" : "Heart"}
                  className={`${isFavorite ? 'text-error' : 'text-muted-foreground'}`}
                />
                
                <Button
                  variant="ghost"
                  size="default"
                  onClick={onShare}
                  iconName="Share"
                  className="text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Service Banner */}
        {provider?.emergencyService && (
          <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2 text-error">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-medium">24/7 Emergency Service Available</span>
            </div>
            <p className="text-xs text-error/80 mt-1">
              Immediate response for urgent repairs and emergencies
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderHero;