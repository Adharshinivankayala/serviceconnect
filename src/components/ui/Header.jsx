import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Search', path: '/service-provider-search-discovery', icon: 'Search' },
    { label: 'Bookings', path: '/booking-management', icon: 'Calendar' },
    { label: 'Schedule', path: '/booking-scheduling', icon: 'Clock' },
    { label: 'Profile', path: '/service-provider-profile', icon: 'User' }
  ];

  const secondaryItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Support', path: '/support', icon: 'MessageCircle' }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleEmergencyAccess = () => {
    // Emergency booking flow
    window.location.href = '/booking-scheduling?emergency=true';
  };

  return (
    <header className="sticky top-0 z-140 bg-card border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground hidden sm:block">
            ServiceConnect
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-standard hover:bg-muted ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Emergency Access Button */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEmergencyAccess}
            iconName="AlertTriangle"
            iconPosition="left"
            className="hidden sm:flex"
          >
            Emergency
          </Button>

          {/* Location Indicator */}
          <div className="hidden md:flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>Current Location</span>
          </div>

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              iconName="MoreHorizontal"
              className="lg:flex"
            />
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-modal z-160">
                <div className="py-1">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                  <div className="border-t border-border my-1"></div>
                  <Link
                    to="/user-login"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            iconName="Menu"
            className="lg:hidden"
          />
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-standard ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            <div className="border-t border-border my-2"></div>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEmergencyAccess}
              iconName="AlertTriangle"
              iconPosition="left"
              fullWidth
              className="mb-2"
            >
              Emergency Service
            </Button>
            
            {secondaryItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-micro"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;