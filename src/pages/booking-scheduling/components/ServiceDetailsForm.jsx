import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ServiceDetailsForm = ({ selectedServices, onServicesChange, specialInstructions, onInstructionsChange }) => {
  const [availableServices] = useState([
    // Plumbing Services
    {
      id: 'plumbing-basic',
      name: 'Basic Plumbing Repair',
      category: 'Plumbing',
      basePrice: 85,
      duration: 60,
      description: 'Leak repairs, faucet installation, basic pipe work'
    },
    {
      id: 'plumbing-emergency',
      name: 'Emergency Plumbing',
      category: 'Plumbing',
      basePrice: 150,
      duration: 90,
      description: 'Burst pipes, major leaks, urgent repairs'
    },
    {
      id: 'plumbing-drain',
      name: 'Drain Cleaning',
      category: 'Plumbing',
      basePrice: 120,
      duration: 75,
      description: 'Unclog drains, sewer line cleaning, hydro jetting'
    },
    {
      id: 'plumbing-waterheater',
      name: 'Water Heater Service',
      category: 'Plumbing',
      basePrice: 200,
      duration: 120,
      description: 'Water heater repair, installation, maintenance'
    },
    
    // Electrical Services
    {
      id: 'electrical-basic',
      name: 'Basic Electrical Work',
      category: 'Electrical',
      basePrice: 95,
      duration: 75,
      description: 'Outlet installation, switch repairs, basic wiring'
    },
    {
      id: 'electrical-emergency',
      name: 'Emergency Electrical',
      category: 'Electrical',
      basePrice: 175,
      duration: 120,
      description: 'Power outages, electrical hazards, urgent fixes'
    },
    {
      id: 'electrical-panel',
      name: 'Electrical Panel Service',
      category: 'Electrical',
      basePrice: 250,
      duration: 180,
      description: 'Panel upgrades, circuit breaker replacement'
    },
    {
      id: 'electrical-lighting',
      name: 'Lighting Installation',
      category: 'Electrical',
      basePrice: 110,
      duration: 90,
      description: 'Ceiling fans, light fixtures, outdoor lighting'
    },
    
    // HVAC Services
    {
      id: 'hvac-repair',
      name: 'HVAC Repair',
      category: 'HVAC',
      basePrice: 120,
      duration: 90,
      description: 'AC/heating system repairs and diagnostics'
    },
    {
      id: 'hvac-maintenance',
      name: 'HVAC Maintenance',
      category: 'HVAC',
      basePrice: 85,
      duration: 60,
      description: 'System tune-up, filter replacement, cleaning'
    },
    {
      id: 'hvac-installation',
      name: 'HVAC Installation',
      category: 'HVAC',
      basePrice: 300,
      duration: 240,
      description: 'New system installation, ductwork'
    },
    {
      id: 'hvac-emergency',
      name: 'Emergency HVAC',
      category: 'HVAC',
      basePrice: 180,
      duration: 120,
      description: 'Urgent heating/cooling system failures'
    },
    
    // Carpentry Services
    {
      id: 'carpentry-basic',
      name: 'Basic Carpentry',
      category: 'Carpentry',
      basePrice: 75,
      duration: 90,
      description: 'Door installation, cabinet repair, basic woodwork'
    },
    {
      id: 'carpentry-flooring',
      name: 'Flooring Services',
      category: 'Carpentry',
      basePrice: 95,
      duration: 120,
      description: 'Hardwood repair, laminate installation, floor refinishing'
    },
    {
      id: 'carpentry-furniture',
      name: 'Furniture Assembly',
      category: 'Carpentry',
      basePrice: 60,
      duration: 60,
      description: 'Furniture assembly, shelf installation, mounting'
    },
    {
      id: 'carpentry-crown',
      name: 'Trim & Crown Molding',
      category: 'Carpentry',
      basePrice: 110,
      duration: 150,
      description: 'Crown molding, baseboards, window trim installation'
    },
    
    // Locksmith Services
    {
      id: 'locksmith-lockout',
      name: 'Lockout Service',
      category: 'Locksmith',
      basePrice: 65,
      duration: 30,
      description: 'Home lockout, car lockout, emergency entry'
    },
    {
      id: 'locksmith-rekey',
      name: 'Lock Rekey/Change',
      category: 'Locksmith',
      basePrice: 85,
      duration: 45,
      description: 'Lock rekeying, deadbolt installation, lock replacement'
    },
    {
      id: 'locksmith-security',
      name: 'Security System Install',
      category: 'Locksmith',
      basePrice: 150,
      duration: 120,
      description: 'Smart locks, security cameras, alarm systems'
    },
    {
      id: 'locksmith-safe',
      name: 'Safe Services',
      category: 'Locksmith',
      basePrice: 120,
      duration: 90,
      description: 'Safe opening, combination change, safe installation'
    },
    
    // Appliance Repair Services
    {
      id: 'appliance-washer',
      name: 'Washer/Dryer Repair',
      category: 'Appliance Repair',
      basePrice: 90,
      duration: 75,
      description: 'Washing machine, dryer repair and maintenance'
    },
    {
      id: 'appliance-refrigerator',
      name: 'Refrigerator Repair',
      category: 'Appliance Repair',
      basePrice: 100,
      duration: 90,
      description: 'Refrigerator, freezer repair and diagnostics'
    },
    {
      id: 'appliance-dishwasher',
      name: 'Dishwasher Repair',
      category: 'Appliance Repair',
      basePrice: 85,
      duration: 60,
      description: 'Dishwasher repair, installation, maintenance'
    },
    {
      id: 'appliance-oven',
      name: 'Oven/Stove Repair',
      category: 'Appliance Repair',
      basePrice: 95,
      duration: 75,
      description: 'Oven, stove, cooktop repair and service'
    },
    
    // Handyman Services
    {
      id: 'handyman-general',
      name: 'General Handyman',
      category: 'Handyman',
      basePrice: 70,
      duration: 60,
      description: 'General repairs, maintenance, odd jobs'
    },
    {
      id: 'handyman-painting',
      name: 'Interior Painting',
      category: 'Handyman',
      basePrice: 80,
      duration: 120,
      description: 'Room painting, touch-ups, drywall repair'
    },
    {
      id: 'handyman-drywall',
      name: 'Drywall Repair',
      category: 'Handyman',
      basePrice: 75,
      duration: 90,
      description: 'Hole repair, texture matching, patching'
    },
    {
      id: 'handyman-pressure',
      name: 'Pressure Washing',
      category: 'Handyman',
      basePrice: 90,
      duration: 120,
      description: 'Exterior cleaning, deck washing, driveway cleaning'
    },
    
    // Garage Door Services
    {
      id: 'garage-repair',
      name: 'Garage Door Repair',
      category: 'Garage Door',
      basePrice: 110,
      duration: 75,
      description: 'Spring replacement, opener repair, track alignment'
    },
    {
      id: 'garage-installation',
      name: 'Garage Door Installation',
      category: 'Garage Door',
      basePrice: 200,
      duration: 180,
      description: 'New door installation, opener installation'
    },
    {
      id: 'garage-maintenance',
      name: 'Garage Door Maintenance',
      category: 'Garage Door',
      basePrice: 65,
      duration: 45,
      description: 'Lubrication, safety inspection, adjustment'
    },
    
    // Window Services
    {
      id: 'window-repair',
      name: 'Window Repair',
      category: 'Window Services',
      basePrice: 85,
      duration: 75,
      description: 'Glass replacement, frame repair, weatherstripping'
    },
    {
      id: 'window-cleaning',
      name: 'Window Cleaning',
      category: 'Window Services',
      basePrice: 60,
      duration: 90,
      description: 'Interior/exterior cleaning, screen cleaning'
    },
    {
      id: 'window-installation',
      name: 'Window Installation',
      category: 'Window Services',
      basePrice: 150,
      duration: 120,
      description: 'New window installation, replacement windows'
    }
  ]);

  // Group services by category for better organization
  const servicesByCategory = availableServices?.reduce((acc, service) => {
    const category = service?.category;
    if (!acc?.[category]) {
      acc[category] = [];
    }
    acc?.[category]?.push(service);
    return acc;
  }, {});

  const serviceOptions = Object?.entries(servicesByCategory)?.flatMap(([category, services]) => [
    // Category header (disabled option)
    {
      value: `header-${category?.toLowerCase()?.replace(/\s+/g, '-')}`,
      label: `── ${category} ──`,
      disabled: true,
      isHeader: true
    },
    // Services in this category
    ...services?.map(service => ({
      value: service?.id,
      label: `${service?.name} - $${service?.basePrice}`,
      description: service?.description,
      category: service?.category
    }))
  ]);

  const handleServiceAdd = (serviceId) => {
    const service = availableServices?.find(s => s?.id === serviceId);
    if (service && !selectedServices?.find(s => s?.id === serviceId)) {
      onServicesChange([...selectedServices, { ...service, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (serviceId, quantity) => {
    const updatedServices = selectedServices?.map(service =>
      service?.id === serviceId ? { ...service, quantity: Math.max(1, quantity) } : service
    );
    onServicesChange(updatedServices);
  };

  const handleServiceRemove = (serviceId) => {
    onServicesChange(selectedServices?.filter(service => service?.id !== serviceId));
  };

  const getTotalPrice = () => {
    return selectedServices?.reduce((total, service) => total + (service?.basePrice * service?.quantity), 0);
  };

  const getTotalDuration = () => {
    return selectedServices?.reduce((total, service) => total + (service?.duration * service?.quantity), 0);
  };

  // Group selected services by category for better display
  const selectedServicesByCategory = selectedServices?.reduce((acc, service) => {
    const category = service?.category;
    if (!acc?.[category]) {
      acc[category] = [];
    }
    acc?.[category]?.push(service);
    return acc;
  }, {});

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Wrench" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Service Details</h2>
      </div>
      
      {/* Add Service Section */}
      <div className="mb-6">
        <Select
          label="Add Service"
          placeholder="Select a service to add"
          options={serviceOptions}
          value=""
          onChange={(value) => handleServiceAdd(value)}
          searchable
          className="mb-4"
        />
        <p className="text-xs text-muted-foreground">
          Choose from {availableServices?.length} available services across {Object?.keys(servicesByCategory)?.length} categories
        </p>
      </div>
      
      {/* Selected Services */}
      {selectedServices?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Selected Services</h3>
          <div className="space-y-4">
            {Object?.entries(selectedServicesByCategory)?.map(([category, services]) => (
              <div key={category}>
                <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                  {category}
                </div>
                <div className="space-y-3">
                  {services?.map((service) => (
                    <div key={service?.id} className="bg-muted rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{service?.name}</h4>
                          <p className="text-sm text-muted-foreground">{service?.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Icon name="Clock" size={12} />
                              <span>{service?.duration} min</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="DollarSign" size={12} />
                              <span>${service?.basePrice}</span>
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleServiceRemove(service?.id)}
                          iconName="X"
                          className="text-muted-foreground hover:text-error"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Quantity:</span>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleQuantityChange(service?.id, service?.quantity - 1)}
                              iconName="Minus"
                              disabled={service?.quantity <= 1}
                            />
                            <span className="w-8 text-center text-sm font-medium">{service?.quantity}</span>
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleQuantityChange(service?.id, service?.quantity + 1)}
                              iconName="Plus"
                            />
                          </div>
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          ${service?.basePrice * service?.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Service Summary */}
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">
                  Total Duration: {Math.floor(getTotalDuration() / 60)}h {getTotalDuration() % 60}m
                </span>
                <span className="text-muted-foreground">
                  Services: {selectedServices?.length}
                </span>
                <span className="text-muted-foreground">
                  Categories: {Object?.keys(selectedServicesByCategory)?.length}
                </span>
              </div>
              <span className="font-semibold text-primary">
                Subtotal: ${getTotalPrice()}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Special Instructions
        </label>
        <textarea
          value={specialInstructions}
          onChange={(e) => onInstructionsChange(e?.target?.value)}
          placeholder="Any specific requirements, access instructions, or details about the problem..."
          className="w-full h-24 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Help your service provider prepare by providing relevant details
        </p>
      </div>
    </div>
  );
};

export default ServiceDetailsForm;