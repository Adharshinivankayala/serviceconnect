import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingTabs = ({ activeTab, onTabChange, bookingCounts }) => {
  const tabs = [
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: 'Clock',
      count: bookingCounts?.upcoming || 0
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      icon: 'Zap',
      count: bookingCounts?.inProgress || 0
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: 'CheckCircle',
      count: bookingCounts?.completed || 0
    },
    {
      id: 'cancelled',
      label: 'Cancelled',
      icon: 'XCircle',
      count: bookingCounts?.cancelled || 0
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Desktop: Horizontal Tabs */}
      <div className="hidden lg:flex">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex-1 px-6 py-4 flex items-center justify-center space-x-2 text-sm font-medium transition-standard border-b-2 ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
            {tab?.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Mobile: Scrollable Tabs */}
      <div className="lg:hidden overflow-x-auto">
        <div className="flex min-w-max">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`px-4 py-3 flex items-center space-x-2 text-sm font-medium transition-standard border-b-2 whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span>{tab?.label}</span>
              {tab?.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingTabs;