import React from 'react';
import Icon from '../AppIcon';

const TrustSignalFooter = () => {
  const trustSignals = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is protected'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Providers',
      description: 'Background checked'
    },
    {
      icon: 'Star',
      title: 'Rated & Reviewed',
      description: 'Real customer feedback'
    },
    {
      icon: 'Clock',
      title: '24/7 Support',
      description: 'Always here to help'
    },
    {
      icon: 'DollarSign',
      title: 'Money Back',
      description: 'Satisfaction guaranteed'
    }
  ];

  const certifications = [
    { name: 'BBB A+', icon: 'Award' },
    { name: 'SSL', icon: 'Lock' },
    { name: 'Insured', icon: 'Shield' }
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Mobile: Compact trust signals */}
      <div className="lg:hidden px-4 py-4">
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          {trustSignals?.slice(0, 3)?.map((signal, index) => (
            <div key={index} className="flex items-center space-x-1">
              <Icon name={signal?.icon} size={12} className="text-primary" />
              <span>{signal?.title}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center space-x-4 mt-3 pt-3 border-t border-border">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-1 text-xs">
              <Icon name={cert?.icon} size={10} className="text-success" />
              <span className="font-medium">{cert?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Desktop: Expanded trust information */}
      <div className="hidden lg:block px-6 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Trust signals grid */}
          <div className="grid grid-cols-5 gap-6 mb-6">
            {trustSignals?.map((signal, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name={signal?.icon} size={20} className="text-primary" />
                </div>
                <h3 className="text-sm font-medium text-foreground mb-1">{signal?.title}</h3>
                <p className="text-xs text-muted-foreground">{signal?.description}</p>
              </div>
            ))}
          </div>

          {/* Detailed information */}
          <div className="border-t border-border pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              {/* Security & Privacy */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-primary" />
                  <span>Security & Privacy</span>
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span>256-bit SSL encryption</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span>PCI DSS compliant</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span>GDPR compliant</span>
                  </li>
                </ul>
              </div>

              {/* Provider Verification */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="UserCheck" size={16} className="text-primary" />
                  <span>Provider Standards</span>
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span>Background checks</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span>License verification</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span>Insurance validation</span>
                  </li>
                </ul>
              </div>

              {/* Customer Protection */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="Heart" size={16} className="text-primary" />
                  <span>Your Protection</span>
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span>Satisfaction guarantee</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span>Dispute resolution</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications and legal */}
          <div className="border-t border-border pt-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {certifications?.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Icon name={cert?.icon} size={16} className="text-success" />
                    <span className="font-medium">{cert?.name} Certified</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>© 2025 ServiceConnect</span>
                <span>•</span>
                <a href="/privacy" className="hover:text-primary transition-micro">Privacy Policy</a>
                <span>•</span>
                <a href="/terms" className="hover:text-primary transition-micro">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TrustSignalFooter;