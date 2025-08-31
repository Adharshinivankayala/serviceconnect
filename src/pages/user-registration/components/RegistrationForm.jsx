import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validatePassword = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Update password strength
    if (name === 'password') {
      setPasswordStrength(validatePassword(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-error';
    if (passwordStrength <= 2) return 'bg-warning';
    if (passwordStrength <= 3) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="User" size={20} className="text-primary" />
          <span>Personal Information</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={formData?.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            error={errors?.firstName}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData?.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          description="We'll use this to send booking confirmations"
          error={errors?.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData?.phone}
          onChange={handleInputChange}
          placeholder="+1 (555) 123-4567"
          description="For emergency contact and booking updates"
          error={errors?.phone}
          required
        />
      </div>
      {/* Password Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Lock" size={20} className="text-primary" />
          <span>Account Security</span>
        </h3>

        <div className="space-y-3">
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="Create a strong password"
            error={errors?.password}
            required
          />

          {/* Password Strength Indicator */}
          {formData?.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Password strength:</span>
                <span className={`font-medium ${
                  passwordStrength <= 1 ? 'text-error' :
                  passwordStrength <= 2 ? 'text-warning' :
                  passwordStrength <= 3 ? 'text-accent' : 'text-success'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground">
                Use 8+ characters with uppercase, lowercase, numbers, and symbols
              </div>
            </div>
          )}

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            error={errors?.confirmPassword}
            required
          />
        </div>
      </div>
      {/* Terms and Preferences */}
      <div className="space-y-4">
        <div className="space-y-3">
          <Checkbox
            label="I agree to the Terms of Service and Privacy Policy"
            description="Required to create your account"
            name="agreeToTerms"
            checked={formData?.agreeToTerms}
            onChange={handleInputChange}
            error={errors?.agreeToTerms}
            required
          />

          <Checkbox
            label="Subscribe to service updates and tips"
            description="Get helpful home maintenance tips and service provider recommendations"
            name="subscribeNewsletter"
            checked={formData?.subscribeNewsletter}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
        className="mt-8"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;