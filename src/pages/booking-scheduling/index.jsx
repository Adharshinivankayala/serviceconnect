import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ServiceDetailsForm from './components/ServiceDetailsForm';
import DateTimeSelector from './components/DateTimeSelector';
import LocationConfirmation from './components/LocationConfirmation';
import PriceEstimation from './components/PriceEstimation';
import PaymentSection from './components/PaymentSection';
import BookingSummary from './components/BookingSummary';
import EmergencyToggle from './components/EmergencyToggle';
import ProgressIndicator from './components/ProgressIndicator';

const BookingScheduling = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEmergencyFromUrl = searchParams?.get('emergency') === 'true';

  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [address, setAddress] = useState('1234 Pine Street, Seattle, WA 98101');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [accessInstructions, setAccessInstructions] = useState('');
  const [isEmergency, setIsEmergency] = useState(isEmergencyFromUrl);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const steps = [
    {
      id: 'services',
      title: 'Services',
      description: 'Select services',
      icon: 'Wrench'
    },
    {
      id: 'datetime',
      title: 'Date & Time',
      description: 'Choose schedule',
      icon: 'Calendar'
    },
    {
      id: 'location',
      title: 'Location',
      description: 'Confirm address',
      icon: 'MapPin'
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Payment method',
      icon: 'CreditCard'
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Confirm booking',
      icon: 'FileText'
    }
  ];

  // Load saved location on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setAddress(savedLocation);
    }
  }, []);

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate booking ID
      const newBookingId = `BK-${Date.now()}`;
      setBookingId(newBookingId);
      
      // Save booking to localStorage (mock database)
      const booking = {
        id: newBookingId,
        services: selectedServices,
        date: selectedDate,
        time: selectedTime,
        address,
        specialInstructions,
        accessInstructions,
        isEmergency,
        paymentMethod: selectedPaymentMethod,
        status: 'confirmed',
        createdAt: new Date()?.toISOString(),
        provider: {
          name: 'Seattle Pro Plumbing',
          phone: '(206) 555-0123',
          email: 'contact@seattleproplumbing.com'
        }
      };
      
      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      existingBookings?.push(booking);
      localStorage.setItem('userBookings', JSON.stringify(existingBookings));
      
      // Update active bookings
      const activeBookings = JSON.parse(localStorage.getItem('activeBookings') || '[]');
      activeBookings?.push({
        id: newBookingId,
        service: selectedServices?.[0]?.name || 'Service',
        provider: 'Seattle Pro Plumbing',
        status: 'confirmed',
        scheduledTime: new Date(selectedDate)?.toISOString(),
        estimatedArrival: new Date(selectedDate)?.toISOString(),
        address
      });
      localStorage.setItem('activeBookings', JSON.stringify(activeBookings));
      
      setShowConfirmation(true);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: // Services
        return selectedServices?.length > 0;
      case 1: // Date & Time
        return selectedDate && selectedTime;
      case 2: // Location
        return address?.trim()?.length > 0;
      case 3: // Payment
        return selectedPaymentMethod !== null;
      default:
        return true;
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Your service has been scheduled successfully.
            </p>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID:</span>
                  <span className="font-mono font-medium">{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Date:</span>
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })} at {selectedTime?.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="font-medium">Seattle Pro Plumbing</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                variant="default"
                onClick={() => navigate('/booking-management')}
                iconName="Calendar"
                iconPosition="left"
                fullWidth
              >
                View My Bookings
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/service-provider-search-discovery')}
                iconName="Search"
                iconPosition="left"
                fullWidth
              >
                Book Another Service
              </Button>
            </div>
            
            <div className="mt-6 p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="text-xs text-left">
                  <p className="font-medium text-foreground mb-1">What's Next?</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• You'll receive a confirmation email shortly</li>
                    <li>• The provider will contact you 30 minutes before arrival</li>
                    <li>• Track your booking status in the Bookings section</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/service-provider-search-discovery')}
                iconName="ArrowLeft"
              />
              <div>
                <h1 className="text-xl font-semibold text-foreground">Book Service</h1>
                <p className="text-sm text-muted-foreground">
                  Schedule your appointment with Seattle Pro Plumbing
                </p>
              </div>
            </div>
            
            {isEmergency && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-error/10 text-error rounded-full">
                <Icon name="AlertTriangle" size={16} />
                <span className="text-sm font-medium">Emergency Service</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={steps?.length}
          steps={steps}
        />

        {/* Emergency Toggle */}
        <EmergencyToggle
          isEmergency={isEmergency}
          onToggle={setIsEmergency}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step Content */}
            {currentStep === 0 && (
              <ServiceDetailsForm
                selectedServices={selectedServices}
                onServicesChange={setSelectedServices}
                specialInstructions={specialInstructions}
                onInstructionsChange={setSpecialInstructions}
              />
            )}

            {currentStep === 1 && (
              <DateTimeSelector
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateChange={setSelectedDate}
                onTimeChange={setSelectedTime}
                isEmergency={isEmergency}
              />
            )}

            {currentStep === 2 && (
              <LocationConfirmation
                address={address}
                onAddressChange={setAddress}
                accessInstructions={accessInstructions}
                onAccessInstructionsChange={setAccessInstructions}
              />
            )}

            {currentStep === 3 && (
              <PaymentSection
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={setSelectedPaymentMethod}
                billingAddress={billingAddress}
                onBillingAddressChange={setBillingAddress}
              />
            )}

            {currentStep === 4 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Icon name="FileText" size={20} className="text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Review & Confirm</h2>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Services Selected</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      {selectedServices?.map(service => (
                        <li key={service?.id}>• {service?.name} (Qty: {service?.quantity})</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Appointment</h3>
                    <p className="text-muted-foreground">
                      {selectedDate?.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })} at {selectedTime?.time}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">{address}</p>
                  </div>
                  
                  {selectedPaymentMethod && (
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Payment</h3>
                      <p className="text-muted-foreground">
                        {selectedPaymentMethod?.type === 'saved' ?'Saved payment method selected' :'New payment method added'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                iconName="ChevronLeft"
                iconPosition="left"
                disabled={currentStep === 0}
              >
                Previous
              </Button>

              {currentStep < steps?.length - 1 ? (
                <Button
                  variant="default"
                  onClick={handleNextStep}
                  iconName="ChevronRight"
                  iconPosition="right"
                  disabled={!canProceedToNext()}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleConfirmBooking}
                  loading={isLoading}
                  iconName="CheckCircle"
                  iconPosition="left"
                  disabled={!canProceedToNext()}
                >
                  {isLoading ? 'Processing...' : 'Confirm Booking'}
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PriceEstimation
              selectedServices={selectedServices}
              selectedTime={selectedTime}
              isEmergency={isEmergency}
              address={address}
            />

            <BookingSummary
              selectedServices={selectedServices}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              address={address}
              isEmergency={isEmergency}
              specialInstructions={specialInstructions}
              accessInstructions={accessInstructions}
              onConfirmBooking={handleConfirmBooking}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingScheduling;