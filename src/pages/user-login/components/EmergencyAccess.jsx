import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmergencyAccess = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const emergencyServices = [
    {
      id: 'plumbing',
      name: 'Emergency Plumbing',
      icon: 'Wrench',
      description: 'Burst pipes, leaks, blockages'
    },
    {
      id: 'electrical',
      name: 'Emergency Electrical',
      icon: 'Zap',
      description: 'Power outages, electrical hazards'
    },
    {
      id: 'locksmith',
      name: 'Emergency Locksmith',
      icon: 'Key',
      description: 'Locked out, broken locks'
    },
    {
      id: 'hvac',
      name: 'Emergency HVAC',
      icon: 'Thermometer',
      description: 'Heating/cooling failures'
    }
  ];

  const handleEmergencyAccess = (serviceType = null) => {
    const params = new URLSearchParams({
      emergency: 'true',
      guest: 'true',
      timestamp: Date.now()
    });
    
    if (serviceType) {
      params?.set('service', serviceType);
    }
    
    navigate(`/service-provider-search-discovery?${params?.toString()}`);
  };

  return (
    <div className="bg-error/5 border border-error/20 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-error/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="AlertTriangle" size={16} className="text-error" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-error mb-1">Emergency Service Needed?</h3>
          <p className="text-xs text-error/80 mb-3">
            Access emergency services without creating an account
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleEmergencyAccess()}
              iconName="Search"
              iconPosition="left"
            >
              Find Emergency Help
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              className="border-error/30 text-error hover:bg-error/5"
            >
              Service Types
            </Button>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-error/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {emergencyServices?.map((service) => (
              <button
                key={service?.id}
                onClick={() => handleEmergencyAccess(service?.id)}
                className="flex items-center space-x-3 p-3 bg-background border border-error/20 rounded-lg hover:bg-error/5 transition-micro text-left"
              >
                <div className="w-8 h-8 bg-error/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={service?.icon} size={16} className="text-error" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground">{service?.name}</h4>
                  <p className="text-xs text-muted-foreground">{service?.description}</p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={14} className="text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs text-warning/80">
                Emergency access provides limited browsing. Create an account for full booking features and better service matching.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyAccess;