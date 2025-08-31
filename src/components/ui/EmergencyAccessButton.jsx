import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const EmergencyAccessButton = ({ className = '' }) => {
  const [isPressed, setIsPressed] = useState(false);
  const navigate = useNavigate();

  const handleEmergencyAccess = () => {
    setIsPressed(true);
    
    // Add emergency parameters to booking flow
    const emergencyParams = new URLSearchParams({
      emergency: 'true',
      priority: 'urgent',
      timestamp: Date.now()
    });
    
    // Navigate to emergency booking with context
    navigate(`/booking-scheduling?${emergencyParams?.toString()}`);
    
    // Reset pressed state after navigation
    setTimeout(() => setIsPressed(false), 200);
  };

  return (
    <>
      {/* Desktop: Header integrated button */}
      <div className={`hidden lg:block ${className}`}>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleEmergencyAccess}
          iconName="AlertTriangle"
          iconPosition="left"
          className={`transition-all duration-200 ${
            isPressed ? 'scale-95' : 'hover:scale-105'
          } shadow-md hover:shadow-lg`}
        >
          Emergency
        </Button>
      </div>

      {/* Mobile: Floating Action Button */}
      <div className="lg:hidden">
        <button
          onClick={handleEmergencyAccess}
          className={`fixed bottom-20 right-4 z-200 w-14 h-14 bg-error text-error-foreground rounded-full shadow-modal hover:shadow-lg transition-all duration-200 flex items-center justify-center ${
            isPressed ? 'scale-95' : 'hover:scale-105'
          } ${className}`}
          aria-label="Emergency Service Access"
        >
          <Icon 
            name="AlertTriangle" 
            size={24} 
            className={`transition-transform duration-150 ${
              isPressed ? 'scale-110' : ''
            }`}
          />
        </button>
        
        {/* Emergency indicator pulse */}
        <div className="fixed bottom-20 right-4 z-150 w-14 h-14 bg-error rounded-full animate-ping opacity-20 pointer-events-none"></div>
      </div>

      {/* Emergency context overlay (shows briefly when pressed) */}
      {isPressed && (
        <div className="fixed inset-0 z-300 bg-black bg-opacity-20 flex items-center justify-center pointer-events-none">
          <div className="bg-card border border-border rounded-lg p-4 shadow-modal animate-in fade-in duration-200">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="font-medium">Connecting to emergency services...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyAccessButton;