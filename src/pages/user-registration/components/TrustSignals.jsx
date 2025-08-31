import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: 'UserCheck',
      title: 'Verified Providers',
      description: 'All service providers are background checked'
    },
    {
      icon: 'Star',
      title: 'Rated & Reviewed',
      description: 'Real customer feedback and ratings'
    },
    {
      icon: 'Clock',
      title: '24/7 Support',
      description: 'Always here when you need help'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Seattle, WA',
      rating: 5,
      text: `Moving to Seattle was stressful, but ServiceConnect made finding a reliable plumber so easy. The provider arrived on time and fixed my kitchen leak perfectly.`,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      service: 'Plumbing'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Portland, OR',
      rating: 5,
      text: `As a newcomer, I didn't know any local electricians. Found an amazing one through ServiceConnect who installed my home office setup professionally.`,avatar: 'https://randomuser.me/api/portraits/men/32.jpg',service: 'Electrical'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',location: 'Denver, CO',
      rating: 5,
      text: `The verification process gave me confidence. The carpenter I hired was licensed, insured, and did excellent work on my kitchen cabinets.`,
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',service: 'Carpentry'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const currentReview = testimonials?.[currentTestimonial];

  return (
    <div className="space-y-8">
      {/* Trust Features */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground text-center">
          Why Choose ServiceConnect?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trustFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">{feature?.title}</h4>
                <p className="text-sm text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Customer Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground text-center">
          What Our Customers Say
        </h3>

        <div className="bg-card border border-border rounded-lg p-6 relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-micro"
            aria-label="Previous testimonial"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-micro"
            aria-label="Next testimonial"
          >
            <Icon name="ChevronRight" size={16} />
          </button>

          {/* Testimonial Content */}
          <div className="px-8">
            <div className="flex items-center space-x-1 mb-3 justify-center">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={`${i < currentReview?.rating ? 'text-accent fill-current' : 'text-muted-foreground'}`}
                />
              ))}
            </div>

            <blockquote className="text-center mb-4">
              <p className="text-foreground italic">"{currentReview?.text}"</p>
            </blockquote>

            <div className="flex items-center justify-center space-x-3">
              <img
                src={currentReview?.avatar}
                alt={currentReview?.name}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              <div className="text-center">
                <p className="font-medium text-foreground">{currentReview?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {currentReview?.location} • {currentReview?.service}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-micro ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 py-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Lock" size={16} className="text-success" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Privacy Protected</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Award" size={16} className="text-success" />
          <span>BBB A+ Rated</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;