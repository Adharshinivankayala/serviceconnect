import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors?.[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.emailOrPhone?.trim()) {
      errors.emailOrPhone = 'Email or phone number is required';
    } else if (formData?.emailOrPhone?.includes('@')) {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex?.test(formData?.emailOrPhone)) {
        errors.emailOrPhone = 'Please enter a valid email address';
      }
    } else {
      // Phone validation
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex?.test(formData?.emailOrPhone)) {
        errors.emailOrPhone = 'Please enter a valid phone number';
      }
    }

    if (!formData?.password) {
      errors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-error">Login Failed</p>
            <p className="text-sm text-error/80 mt-1">{error}</p>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <Input
          label="Email or Phone Number"
          type="text"
          placeholder="Enter your email or phone"
          value={formData?.emailOrPhone}
          onChange={(e) => handleInputChange('emailOrPhone', e?.target?.value)}
          error={validationErrors?.emailOrPhone}
          required
          disabled={loading}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={validationErrors?.password}
          required
          disabled={loading}
        />
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData?.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
          disabled={loading}
        />

        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-micro"
          disabled={loading}
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={loading}
        iconName="LogIn"
        iconPosition="left"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;