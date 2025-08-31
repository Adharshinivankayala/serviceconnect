import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'bg-black hover:bg-gray-900 text-white'
    }
  ];

  const handleSocialLogin = (provider) => {
    // Mock social registration - in real app, integrate with OAuth providers
    const mockUserData = {
      provider: provider?.id,
      email: `user@${provider?.id}.com`,
      firstName: 'John',
      lastName: 'Doe',
      profileImage: `https://randomuser.me/api/portraits/men/32.jpg`
    };

    onSocialRegister(mockUserData);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Quick Registration
        </h3>
        <p className="text-sm text-muted-foreground">
          Sign up instantly with your existing account
        </p>
      </div>
      <div className="space-y-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            fullWidth
            onClick={() => handleSocialLogin(provider)}
            loading={isLoading}
            iconName={provider?.icon}
            iconPosition="left"
            className={`${provider?.color} transition-all duration-200 hover:scale-[1.02]`}
          >
            Continue with {provider?.name}
          </Button>
        ))}
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            or register with email
          </span>
        </div>
      </div>
      {/* Privacy Notice */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-foreground font-medium mb-1">
              Your privacy is protected
            </p>
            <p className="text-muted-foreground">
              We only access basic profile information to create your account. 
              Your data is never shared without permission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;