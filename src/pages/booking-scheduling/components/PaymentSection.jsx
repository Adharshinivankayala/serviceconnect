import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentSection = ({ selectedPaymentMethod, onPaymentMethodChange, billingAddress, onBillingAddressChange }) => {
  const [savedCards] = useState([
    {
      id: 'card-1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2027',
      isDefault: true
    },
    {
      id: 'card-2',
      type: 'mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false
    }
  ]);

  const [newCard, setNewCard] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    name: ''
  });

  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1)?.toString()?.padStart(2, '0'),
    label: (i + 1)?.toString()?.padStart(2, '0')
  }));

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date()?.getFullYear() + i;
    return { value: year?.toString(), label: year?.toString() };
  });

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const handleCardSelection = (cardId) => {
    onPaymentMethodChange({ type: 'saved', cardId });
    setShowNewCardForm(false);
  };

  const handleNewCardSubmit = () => {
    if (newCard?.number && newCard?.expiryMonth && newCard?.expiryYear && newCard?.cvv && newCard?.name) {
      onPaymentMethodChange({ type: 'new', card: newCard, saveCard });
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e?.target?.value);
    setNewCard({ ...newCard, number: formatted });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="CreditCard" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Payment Method</h2>
      </div>
      {/* Saved Payment Methods */}
      {savedCards?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Saved Payment Methods</h3>
          <div className="space-y-2">
            {savedCards?.map((card) => (
              <button
                key={card?.id}
                onClick={() => handleCardSelection(card?.id)}
                className={`w-full p-3 rounded-lg border transition-standard text-left ${
                  selectedPaymentMethod?.type === 'saved' && selectedPaymentMethod?.cardId === card?.id ?'border-primary bg-primary/5' :'border-border hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name={getCardIcon(card?.type)} size={20} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        •••• •••• •••• {card?.last4}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Expires {card?.expiryMonth}/{card?.expiryYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {card?.isDefault && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Default
                      </span>
                    )}
                    {selectedPaymentMethod?.type === 'saved' && selectedPaymentMethod?.cardId === card?.id && (
                      <Icon name="CheckCircle" size={16} className="text-primary" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Add New Card */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Add New Payment Method</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNewCardForm(!showNewCardForm)}
            iconName={showNewCardForm ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showNewCardForm ? 'Hide' : 'Show'} Form
          </Button>
        </div>

        {showNewCardForm && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <Input
              label="Card Number"
              type="text"
              value={newCard?.number}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />

            <Input
              label="Cardholder Name"
              type="text"
              value={newCard?.name}
              onChange={(e) => setNewCard({ ...newCard, name: e?.target?.value })}
              placeholder="John Doe"
              required
            />

            <div className="grid grid-cols-3 gap-3">
              <Select
                label="Month"
                options={monthOptions}
                value={newCard?.expiryMonth}
                onChange={(value) => setNewCard({ ...newCard, expiryMonth: value })}
                placeholder="MM"
                required
              />
              <Select
                label="Year"
                options={yearOptions}
                value={newCard?.expiryYear}
                onChange={(value) => setNewCard({ ...newCard, expiryYear: value })}
                placeholder="YYYY"
                required
              />
              <Input
                label="CVV"
                type="text"
                value={newCard?.cvv}
                onChange={(e) => setNewCard({ ...newCard, cvv: e?.target?.value?.replace(/\D/g, '')?.slice(0, 4) })}
                placeholder="123"
                maxLength={4}
                required
              />
            </div>

            <Checkbox
              label="Save this card for future payments"
              checked={saveCard}
              onChange={(e) => setSaveCard(e?.target?.checked)}
            />

            <Button
              variant="default"
              onClick={handleNewCardSubmit}
              iconName="Plus"
              iconPosition="left"
              disabled={!newCard?.number || !newCard?.name || !newCard?.expiryMonth || !newCard?.expiryYear || !newCard?.cvv}
            >
              Add Payment Method
            </Button>
          </div>
        )}
      </div>
      {/* Billing Address */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Billing Address</h3>
        
        <Checkbox
          label="Same as service address"
          checked={sameAsBilling}
          onChange={(e) => setSameAsBilling(e?.target?.checked)}
          className="mb-4"
        />

        {!sameAsBilling && (
          <div className="space-y-4">
            <Input
              label="Street Address"
              type="text"
              value={billingAddress?.street}
              onChange={(e) => onBillingAddressChange({ ...billingAddress, street: e?.target?.value })}
              placeholder="123 Main Street"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="City"
                type="text"
                value={billingAddress?.city}
                onChange={(e) => onBillingAddressChange({ ...billingAddress, city: e?.target?.value })}
                placeholder="Seattle"
                required
              />
              <Input
                label="State"
                type="text"
                value={billingAddress?.state}
                onChange={(e) => onBillingAddressChange({ ...billingAddress, state: e?.target?.value })}
                placeholder="WA"
                required
              />
            </div>

            <Input
              label="ZIP Code"
              type="text"
              value={billingAddress?.zip}
              onChange={(e) => onBillingAddressChange({ ...billingAddress, zip: e?.target?.value?.replace(/\D/g, '')?.slice(0, 5) })}
              placeholder="98101"
              maxLength={5}
              required
            />
          </div>
        )}
      </div>
      {/* Security Notice */}
      <div className="mt-6 p-3 bg-success/5 border border-success/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-success mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-foreground mb-1">Secure Payment</p>
            <p className="text-muted-foreground">
              Your payment information is encrypted and secure. We never store your full card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;