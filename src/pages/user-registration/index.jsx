import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import LocationSetup from './components/LocationSetup';
import SocialRegistration from './components/SocialRegistration';
import TrustSignals from './components/TrustSignals';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    personalInfo: null,
    locationInfo: null,
    registrationMethod: 'email'
  });

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Mock API call - in real app, send to backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setRegistrationData(prev => ({
        ...prev,
        personalInfo: formData
      }));
      
      setCurrentStep(2);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSet = async (locationData) => {
    setIsLoading(true);
    
    try {
      // Mock API call - in real app, save location to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRegistrationData(prev => ({
        ...prev,
        locationInfo: locationData
      }));
      
      // Complete registration and redirect
      localStorage.setItem('userRegistrationComplete', 'true');
      localStorage.setItem('userLocation', locationData?.city + ', ' + locationData?.state);
      
      navigate('/service-provider-search-discovery');
    } catch (error) {
      console.error('Location setup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (socialData) => {
    setIsLoading(true);
    
    try {
      // Mock social registration - in real app, handle OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setRegistrationData(prev => ({
        ...prev,
        personalInfo: socialData,
        registrationMethod: socialData?.provider
      }));
      
      setCurrentStep(2);
    } catch (error) {
      console.error('Social registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RegistrationHeader />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Registration Content */}
            <div className="lg:col-span-2">
              <div className="max-w-2xl mx-auto">
                {/* Welcome Section */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-4">
                    Welcome to ServiceConnect
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Connect with verified local service providers in your area. 
                    Get help when you need it most.
                  </p>
                </div>

                {/* Registration Steps */}
                <div className="bg-card border border-border rounded-lg shadow-card">
                  {currentStep === 1 && (
                    <div className="p-6 lg:p-8">
                      {/* Social Registration Options */}
                      <div className="mb-8">
                        <SocialRegistration 
                          onSocialRegister={handleSocialRegister}
                          isLoading={isLoading}
                        />
                      </div>

                      {/* Email Registration Form */}
                      <RegistrationForm 
                        onSubmit={handleFormSubmit}
                        isLoading={isLoading}
                      />
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="p-6 lg:p-8">
                      {/* Back Button */}
                      <div className="mb-6">
                        <Button
                          variant="ghost"
                          onClick={handleBackStep}
                          iconName="ArrowLeft"
                          iconPosition="left"
                          size="sm"
                        >
                          Back to Account Details
                        </Button>
                      </div>

                      {/* Location Setup */}
                      <LocationSetup 
                        onLocationSet={handleLocationSet}
                        isLoading={isLoading}
                      />
                    </div>
                  )}
                </div>

                {/* Help Section */}
                <div className="mt-8 text-center">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Icon name="HelpCircle" size={20} className="text-primary" />
                      <h3 className="font-medium text-foreground">Need Help?</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our support team is available 24/7 to assist you with registration
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <a 
                        href="tel:+1-555-123-4567" 
                        className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-micro"
                      >
                        <Icon name="Phone" size={14} />
                        <span>(555) 123-4567</span>
                      </a>
                      <span className="text-muted-foreground">•</span>
                      <a 
                        href="mailto:support@serviceconnect.com" 
                        className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-micro"
                      >
                        <Icon name="Mail" size={14} />
                        <span>support@serviceconnect.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Signals Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-muted-foreground">
              <span>© {new Date()?.getFullYear()} ServiceConnect</span>
              <span>•</span>
              <a href="/privacy" className="hover:text-primary transition-micro">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="/terms" className="hover:text-primary transition-micro">
                Terms of Service
              </a>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-muted-foreground">Secure Registration</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserRegistration;