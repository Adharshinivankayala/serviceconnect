import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WelcomeTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Seattle, WA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: `Found an amazing plumber within minutes of moving to Seattle. The emergency service saved my weekend when my kitchen flooded!`,
      service: "Emergency Plumbing"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Portland, OR",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: `As a newcomer to Portland, ServiceConnect helped me find reliable electricians and handymen. All verified and professional!`,
      service: "Electrical Work"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Denver, CO",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: `The booking system is so easy to use. I scheduled my HVAC repair in advance and the technician arrived exactly on time.`,
      service: "HVAC Repair"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const currentData = testimonials?.[currentTestimonial];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Welcome Back to ServiceConnect
        </h2>
        <p className="text-muted-foreground">
          Connect with trusted local service providers in your area
        </p>
      </div>
      {/* Rotating Testimonial */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={currentData?.avatar}
              alt={currentData?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-medium text-foreground">{currentData?.name}</h4>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{currentData?.location}</span>
            </div>
            
            <div className="flex items-center space-x-1 mb-3">
              {[...Array(currentData?.rating)]?.map((_, i) => (
                <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
              ))}
              <span className="text-xs text-muted-foreground ml-2">{currentData?.service}</span>
            </div>
            
            <p className="text-sm text-foreground leading-relaxed">
              "{currentData?.text}"
            </p>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex items-center justify-center space-x-2 mt-4">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-standard ${
                index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Key Features */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="MapPin" size={20} className="text-primary" />
          </div>
          <h4 className="text-sm font-medium text-foreground mb-1">Local Providers</h4>
          <p className="text-xs text-muted-foreground">Find services in your neighborhood</p>
        </div>

        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Shield" size={20} className="text-success" />
          </div>
          <h4 className="text-sm font-medium text-foreground mb-1">Verified & Trusted</h4>
          <p className="text-xs text-muted-foreground">Background-checked professionals</p>
        </div>

        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Clock" size={20} className="text-warning" />
          </div>
          <h4 className="text-sm font-medium text-foreground mb-1">24/7 Emergency</h4>
          <p className="text-xs text-muted-foreground">Urgent services available anytime</p>
        </div>

        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Star" size={20} className="text-accent" />
          </div>
          <h4 className="text-sm font-medium text-foreground mb-1">Rated & Reviewed</h4>
          <p className="text-xs text-muted-foreground">Real feedback from customers</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeTestimonials;