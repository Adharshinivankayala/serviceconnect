import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookingModal = ({ isOpen, onClose, type, booking, onConfirm }) => {
  const [formData, setFormData] = useState({
    reason: '',
    newDate: '',
    newTime: '',
    rating: 0,
    review: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    
    try {
      await onConfirm(formData);
      onClose();
      setFormData({
        reason: '',
        newDate: '',
        newTime: '',
        rating: 0,
        review: '',
        message: ''
      });
    } catch (error) {
      console.error('Modal action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderModalContent = () => {
    switch (type) {
      case 'cancel':
        return (
          <>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="XCircle" size={20} className="text-error" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Cancel Booking</h2>
                <p className="text-sm text-muted-foreground">
                  {booking?.service?.name} with {booking?.provider?.name}
                </p>
              </div>
            </div>
            <div className="bg-warning/10 border border-warning/20 rounded-md p-3 mb-4">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning mb-1">Cancellation Policy</p>
                  <p className="text-muted-foreground">
                    Free cancellation up to 2 hours before scheduled time. 
                    Later cancellations may incur a $25 fee.
                  </p>
                </div>
              </div>
            </div>
            <Input
              label="Reason for cancellation (optional)"
              type="text"
              placeholder="Please let us know why you're cancelling..."
              value={formData?.reason}
              onChange={(e) => handleInputChange('reason', e?.target?.value)}
              className="mb-4"
            />
          </>
        );

      case 'reschedule':
        return (
          <>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Reschedule Booking</h2>
                <p className="text-sm text-muted-foreground">
                  {booking?.service?.name} with {booking?.provider?.name}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Input
                label="New Date"
                type="date"
                value={formData?.newDate}
                onChange={(e) => handleInputChange('newDate', e?.target?.value)}
                required
              />
              <Input
                label="New Time"
                type="time"
                value={formData?.newTime}
                onChange={(e) => handleInputChange('newTime', e?.target?.value)}
                required
              />
            </div>
            <Input
              label="Reason for rescheduling (optional)"
              type="text"
              placeholder="Let the provider know why you're rescheduling..."
              value={formData?.reason}
              onChange={(e) => handleInputChange('reason', e?.target?.value)}
            />
          </>
        );

      case 'contact':
        return (
          <>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="MessageCircle" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Contact Provider</h2>
                <p className="text-sm text-muted-foreground">
                  Send a message to {booking?.provider?.name}
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-md p-3 mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-foreground">{booking?.provider?.phone}</span>
              </div>
            </div>
            <Input
              label="Message"
              type="text"
              placeholder="Type your message here..."
              value={formData?.message}
              onChange={(e) => handleInputChange('message', e?.target?.value)}
              required
            />
          </>
        );

      case 'rate':
        return (
          <>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                <Icon name="Star" size={20} className="text-warning" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Rate Service</h2>
                <p className="text-sm text-muted-foreground">
                  How was your experience with {booking?.provider?.name}?
                </p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleInputChange('rating', star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Icon
                      name="Star"
                      size={24}
                      className={`${
                        star <= formData?.rating
                          ? 'text-warning fill-current' :'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Review (optional)"
              type="text"
              placeholder="Share your experience to help other customers..."
              value={formData?.review}
              onChange={(e) => handleInputChange('review', e?.target?.value)}
            />
          </>
        );

      default:
        return null;
    }
  };

  const getActionButtons = () => {
    switch (type) {
      case 'cancel':
        return (
          <>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={handleSubmit}
              loading={isLoading}
              iconName="XCircle"
              iconPosition="left"
            >
              Cancel Booking
            </Button>
          </>
        );
      case 'reschedule':
        return (
          <>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              loading={isLoading}
              disabled={!formData?.newDate || !formData?.newTime}
              iconName="Calendar"
              iconPosition="left"
            >
              Reschedule
            </Button>
          </>
        );
      case 'contact':
        return (
          <>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              loading={isLoading}
              disabled={!formData?.message?.trim()}
              iconName="Send"
              iconPosition="left"
            >
              Send Message
            </Button>
          </>
        );
      case 'rate':
        return (
          <>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Skip
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              loading={isLoading}
              disabled={formData?.rating === 0}
              iconName="Star"
              iconPosition="left"
            >
              Submit Rating
            </Button>
          </>
        );
      default:
        return (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {renderModalContent()}
          
          <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
            {getActionButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;