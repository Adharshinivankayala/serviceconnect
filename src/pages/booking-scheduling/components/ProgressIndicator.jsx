import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    return step?.icon;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          
          return (
            <React.Fragment key={step?.id}>
              <div className="flex flex-col items-center space-y-2">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-standard
                  ${status === 'completed' ? 'bg-success text-success-foreground' : ''}
                  ${status === 'current' ? 'bg-primary text-primary-foreground' : ''}
                  ${status === 'upcoming' ? 'bg-muted text-muted-foreground' : ''}
                `}>
                  <Icon name={getStepIcon(step, status)} size={20} />
                </div>
                
                <div className="text-center">
                  <p className={`text-xs font-medium ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed' ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {step?.description}
                  </p>
                </div>
              </div>
              {index < steps?.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-2 transition-standard
                  ${index < currentStep ? 'bg-success' : 'bg-border'}
                `} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Mobile: Current step info */}
      <div className="sm:hidden mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Step {currentStep + 1} of {totalSteps}: {steps?.[currentStep]?.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {steps?.[currentStep]?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;