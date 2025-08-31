import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ activeTab, hasFilters, onClearFilters }) => {
  const getEmptyStateContent = () => {
    if (hasFilters) {
      return {
        icon: 'Search',
        title: 'No bookings found',
        description: 'Try adjusting your filters or search terms to find what you\'re looking for.',
        action: {
          label: 'Clear Filters',
          onClick: onClearFilters,
          variant: 'outline'
        }
      };
    }

    switch (activeTab) {
      case 'upcoming':
        return {
          icon: 'Calendar',
          title: 'No upcoming bookings',
          description: 'You don\'t have any scheduled services. Book a service provider to get started.',
          action: {
            label: 'Find Services',
            to: '/service-provider-search-discovery',
            variant: 'default'
          }
        };
      case 'in-progress':
        return {
          icon: 'Clock',
          title: 'No active services',
          description: 'You don\'t have any services currently in progress.',
          action: null
        };
      case 'completed':
        return {
          icon: 'CheckCircle',
          title: 'No completed bookings',
          description: 'Your completed service history will appear here once you\'ve used our services.',
          action: {
            label: 'Book Your First Service',
            to: '/service-provider-search-discovery',
            variant: 'default'
          }
        };
      case 'cancelled':
        return {
          icon: 'XCircle',
          title: 'No cancelled bookings',
          description: 'You haven\'t cancelled any bookings. This is where cancelled services would appear.',
          action: null
        };
      default:
        return {
          icon: 'Calendar',
          title: 'No bookings yet',
          description: 'Start by booking your first service with a verified provider.',
          action: {
            label: 'Browse Services',
            to: '/service-provider-search-discovery',
            variant: 'default'
          }
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name={content?.icon} size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {content?.title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {content?.description}
      </p>
      {content?.action && (
        <>
          {content?.action?.to ? (
            <Link to={content?.action?.to}>
              <Button
                variant={content?.action?.variant}
                iconName="ArrowRight"
                iconPosition="right"
              >
                {content?.action?.label}
              </Button>
            </Link>
          ) : (
            <Button
              variant={content?.action?.variant}
              onClick={content?.action?.onClick}
              iconName="RotateCcw"
              iconPosition="left"
            >
              {content?.action?.label}
            </Button>
          )}
        </>
      )}
      {/* Additional helpful links */}
      <div className="mt-8 pt-8 border-t border-border w-full max-w-md">
        <p className="text-sm text-muted-foreground mb-4">Need help?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/help">
            <Button
              variant="ghost"
              size="sm"
              iconName="HelpCircle"
              iconPosition="left"
            >
              Help Center
            </Button>
          </Link>
          <Link to="/support">
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;