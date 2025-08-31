import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const EmergencyToggle = ({ isEmergency, onToggle }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isEmergency ? 'bg-error text-error-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name="AlertTriangle" size={24} />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">Emergency Service</h3>
            <Checkbox
              checked={isEmergency}
              onChange={(e) => onToggle(e?.target?.checked)}
              className="scale-125"
            />
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            Need immediate assistance? Emergency service provides priority scheduling and faster response times.
          </p>
          
          {isEmergency && (
            <div className="bg-error/5 border border-error/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-error mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-error mb-1">Emergency Service Active</p>
                  <ul className="text-muted-foreground space-y-1 text-xs">
                    <li>• Priority scheduling within 2 hours</li>
                    <li>• 50% premium fee applies to all services</li>
                    <li>• Direct provider contact available</li>
                    <li>• 24/7 support assistance</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {!isEmergency && (
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Standard Service</p>
                  <p className="text-muted-foreground text-xs">
                    Regular scheduling with standard pricing. Typical response within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyToggle;