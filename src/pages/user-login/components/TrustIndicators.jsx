import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'We never share your personal information'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by thousands of users'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-sm font-medium text-foreground mb-2">Your Security Matters</h3>
        <p className="text-xs text-muted-foreground">
          We use industry-standard security measures to protect your account
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">{feature?.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{feature?.description}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-4 pt-2">
        <div className="flex items-center space-x-1 text-xs text-success">
          <Icon name="Shield" size={12} />
          <span>SSL Certificate</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-success">
          <Icon name="Lock" size={12} />
          <span>256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;