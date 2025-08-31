import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import TrustIndicators from './components/TrustIndicators';
import WelcomeTestimonials from './components/WelcomeTestimonials';
import EmergencyAccess from './components/EmergencyAccess';

const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for demo
  const mockCredentials = {
    email: 'user@serviceconnect.com',
    phone: '+1-555-0123',
    password: 'password123'
  };

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('userLanguage') || 'en';
    setLanguage(savedLanguage);

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('userToken');
    if (isLoggedIn) {
      const redirectTo = location?.state?.from?.pathname || '/service-provider-search-discovery';
      navigate(redirectTo);
    }
  }, [navigate, location]);

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validate credentials
      const isValidEmail = formData?.emailOrPhone === mockCredentials?.email;
      const isValidPhone = formData?.emailOrPhone === mockCredentials?.phone;
      const isValidPassword = formData?.password === mockCredentials?.password;

      if ((isValidEmail || isValidPhone) && isValidPassword) {
        // Mock successful login
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser = {
          id: 'user-001',
          name: 'John Smith',
          email: mockCredentials?.email,
          phone: mockCredentials?.phone,
          location: 'Seattle, WA',
          joinDate: '2024-01-15'
        };

        localStorage.setItem('userToken', mockToken);
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        if (formData?.rememberMe) {
          localStorage.setItem('rememberUser', 'true');
        }

        // Redirect to intended page or dashboard
        const redirectTo = location?.state?.from?.pathname || '/service-provider-search-discovery';
        navigate(redirectTo);
      } else {
        setError(`Invalid credentials. Use email: ${mockCredentials?.email} or phone: ${mockCredentials?.phone} with password: ${mockCredentials?.password}`);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');

    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful social login
      const mockToken = `mock-${provider}-token-` + Date.now();
      const mockUser = {
        id: `${provider}-user-001`,
        name: provider === 'google' ? 'Jane Doe' : 'Mike Johnson',
        email: provider === 'google' ? 'jane@gmail.com' : 'mike@facebook.com',
        provider: provider,
        location: 'Seattle, WA',
        joinDate: new Date()?.toISOString()?.split('T')?.[0]
      };

      localStorage.setItem('userToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(mockUser));

      const redirectTo = location?.state?.from?.pathname || '/service-provider-search-discovery';
      navigate(redirectTo);
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('userLanguage', newLanguage);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-card">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">ServiceConnect</span>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-2 py-1 text-xs font-medium rounded transition-micro ${
                  language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('es')}
                className={`px-2 py-1 text-xs font-medium rounded transition-micro ${
                  language === 'es' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                ES
              </button>
            </div>

            {/* Help Link */}
            <Link
              to="/help"
              className="text-sm text-muted-foreground hover:text-primary transition-micro flex items-center space-x-1"
            >
              <Icon name="HelpCircle" size={16} />
              <span className="hidden sm:inline">Help</span>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Left Column - Login Form (Mobile First) */}
            <div className="order-1 lg:order-1">
              <div className="max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left mb-8">
                  <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                    Sign in to your account
                  </h1>
                  <p className="text-muted-foreground">
                    Access your dashboard and connect with local service providers
                  </p>
                </div>

                {/* Login Form */}
                <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-card mb-6">
                  <LoginForm
                    onSubmit={handleLogin}
                    loading={loading}
                    error={error}
                  />
                </div>

                {/* Social Login */}
                <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-card mb-6">
                  <SocialLogin
                    onSocialLogin={handleSocialLogin}
                    loading={loading}
                  />
                </div>

                {/* Emergency Access */}
                <div className="mb-6">
                  <EmergencyAccess />
                </div>

                {/* Sign Up Link */}
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link
                      to="/user-registration"
                      className="font-medium text-primary hover:text-primary/80 transition-micro"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>

                {/* Trust Indicators - Mobile */}
                <div className="lg:hidden mt-8">
                  <TrustIndicators />
                </div>
              </div>
            </div>

            {/* Right Column - Welcome & Testimonials (Desktop) */}
            <div className="order-2 lg:order-2 hidden lg:block">
              <div className="sticky top-24">
                <WelcomeTestimonials />
                
                {/* Desktop Trust Indicators */}
                <div className="mt-8">
                  <TrustIndicators />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {new Date()?.getFullYear()} ServiceConnect</span>
              <span>•</span>
              <Link to="/privacy" className="hover:text-primary transition-micro">Privacy</Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-primary transition-micro">Terms</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-xs text-success">
                <Icon name="Shield" size={12} />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-success">
                <Icon name="Lock" size={12} />
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLogin;