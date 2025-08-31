import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const RegistrationHeader = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  return (
    <header className="bg-background border-b border-border">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground hidden sm:block">
              ServiceConnect
            </span>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-muted transition-micro">
                <span className="text-lg">
                  {languages?.find(lang => lang?.code === currentLanguage)?.flag}
                </span>
                <span className="text-sm font-medium text-foreground hidden sm:block">
                  {languages?.find(lang => lang?.code === currentLanguage)?.name}
                </span>
                <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
              </button>

              {/* Language Dropdown */}
              <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-md shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {languages?.map((lang) => (
                    <button
                      key={lang?.code}
                      onClick={() => handleLanguageChange(lang?.code)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-muted transition-micro ${
                        currentLanguage === lang?.code ? 'bg-muted text-primary' : 'text-popover-foreground'
                      }`}
                    >
                      <span>{lang?.flag}</span>
                      <span>{lang?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground hidden sm:inline">
                Already have an account?
              </span>
              <Link
                to="/user-login"
                className="text-primary hover:text-primary/80 font-medium transition-micro"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Progress Indicator */}
      <div className="px-4 lg:px-6 pb-4">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="UserPlus" size={16} className="text-primary" />
          <span className="text-muted-foreground">Step 1 of 3:</span>
          <span className="font-medium text-foreground">Create Account</span>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-2 w-full bg-muted rounded-full h-1">
          <div className="bg-primary h-1 rounded-full w-1/3 transition-all duration-300"></div>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHeader;