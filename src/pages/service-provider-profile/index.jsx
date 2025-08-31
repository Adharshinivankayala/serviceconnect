import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import ProviderHero from './components/ProviderHero';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import ReviewsTab from './components/ReviewsTab';
import AvailabilityTab from './components/AvailabilityTab';
import BookingPanel from './components/BookingPanel';

const ServiceProviderProfile = () => {
  const navigate = useNavigate();
  const { providerId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock provider data
  const mockProvider = {
    id: 'provider-001',
    name: 'Mike Rodriguez',
    businessName: 'Seattle Pro Plumbing',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    isVerified: true,
    rating: 4.8,
    reviewCount: 127,
    experienceYears: 12,
    completedJobs: 1247,
    successRate: 98,
    responseTime: '< 30 min',
    emergencyService: true,
    badges: [
      { icon: 'Shield', label: 'Verified' },
      { icon: 'Award', label: 'Top Rated' },
      { icon: 'CheckCircle', label: 'Licensed' },
      { icon: 'Heart', label: 'Insured' }
    ],
    availability: {
      status: 'available',
      nextAvailable: 'Today 2:00 PM',
      schedule: {
        '2025-08-31': [
          { time: '09:00', duration: '2 hours', available: true, popular: true },
          { time: '11:00', duration: '2 hours', available: true },
          { time: '14:00', duration: '2 hours', available: true, emergency: true },
          { time: '16:00', duration: '2 hours', available: false }
        ],
        '2025-09-01': [
          { time: '08:00', duration: '2 hours', available: true },
          { time: '10:00', duration: '2 hours', available: true, popular: true },
          { time: '13:00', duration: '2 hours', available: true },
          { time: '15:00', duration: '2 hours', available: true }
        ]
      }
    },
    location: {
      city: 'Seattle, WA',
      distance: '2.3 miles',
      lat: 47.6062,
      lng: -122.3321
    },
    services: [
      {
        id: 'plumbing-repair',
        name: 'Emergency Plumbing Repair',
        icon: 'Wrench',
        description: 'Burst pipes, leaks, clogs, and other urgent plumbing issues',
        priceRange: '$85 - $150/hr',
        duration: '1-3 hours',
        rating: 4.9
      },
      {
        id: 'drain-cleaning',
        name: 'Drain Cleaning',
        icon: 'Droplets',
        description: 'Professional drain cleaning and unclogging services',
        priceRange: '$120 - $200',
        duration: '1-2 hours',
        rating: 4.8
      },
      {
        id: 'water-heater',
        name: 'Water Heater Service',
        icon: 'Thermometer',
        description: 'Installation, repair, and maintenance of water heaters',
        priceRange: '$150 - $300/hr',
        duration: '2-4 hours',
        rating: 4.7
      },
      {
        id: 'pipe-installation',
        name: 'Pipe Installation',
        icon: 'PipeIcon',
        description: 'New pipe installation and replacement services',
        priceRange: '$200 - $400',
        duration: '3-6 hours',
        rating: 4.8
      }
    ],
    about: `Professional plumber with over 12 years of experience serving the Seattle area. Specializing in emergency repairs, water heater services, and complete plumbing installations. Licensed, bonded, and insured with a commitment to quality workmanship and customer satisfaction.\n\nAvailable 24/7 for emergency services with rapid response times. All work comes with a satisfaction guarantee and competitive pricing.`,
    workGallery: [
      {
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop',
        title: 'Kitchen Pipe Repair',
        service: 'Emergency Repair'
      },
      {
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        title: 'Water Heater Installation',
        service: 'Installation'
      },
      {
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop',
        title: 'Bathroom Renovation',
        service: 'Renovation'
      },
      {
        image: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=400&h=400&fit=crop',
        title: 'Drain Cleaning',
        service: 'Maintenance'
      }
    ],
    serviceArea: {
      radius: 25,
      neighborhoods: ['Downtown', 'Capitol Hill', 'Ballard', 'Fremont', 'Queen Anne', 'Belltown']
    },
    contact: {
      phone: '(206) 555-0123',
      emergencyPhone: '(206) 555-0911',
      email: 'mike@seattleproplumbing.com',
      website: 'www.seattleproplumbing.com',
      address: '1234 Pine St, Seattle, WA 98101'
    },
    reviews: [
      {
        customer: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
        },
        rating: 5,
        date: '2025-08-28',
        service: 'Emergency Plumbing Repair',
        comment: `Mike was fantastic! Had a burst pipe emergency at 11 PM and he was at my house within 30 minutes. Professional, efficient, and reasonably priced. Fixed the issue quickly and cleaned up after himself. Highly recommend!`,
        verified: true,
        helpfulCount: 12,
        photos: [
          'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop'
        ],
        providerResponse: {
          date: '2025-08-29',
          message: `Thank you Sarah! I'm glad I could help resolve your emergency quickly. Customer satisfaction is my top priority, and I'm always available for urgent repairs.`
        }
      },
      {
        customer: {
          name: 'David Chen',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        },
        rating: 5,
        date: '2025-08-25',
        service: 'Water Heater Installation',
        comment: `Excellent service from start to finish. Mike provided a detailed quote, showed up on time, and completed the water heater installation professionally. Great communication throughout the process.`,
        verified: true,
        helpfulCount: 8
      },
      {
        customer: {
          name: 'Jennifer Martinez',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
        },
        rating: 4,
        date: '2025-08-20',
        service: 'Drain Cleaning',
        comment: `Good service overall. Mike was knowledgeable and fixed our clogged drain efficiently. Only minor issue was he arrived about 15 minutes late, but he called ahead to let us know.`,
        verified: true,
        helpfulCount: 5
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'reviews', label: 'Reviews', icon: 'Star', badge: provider?.reviewCount },
    { id: 'availability', label: 'Availability', icon: 'Calendar' }
  ];

  useEffect(() => {
    // Simulate loading provider data
    const loadProvider = async () => {
      setLoading(true);
      // In real app, fetch provider data based on providerId
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProvider(mockProvider);
      
      // Check if provider is in favorites
      const favorites = JSON.parse(localStorage.getItem('favoriteProviders') || '[]');
      setIsFavorite(favorites?.includes(mockProvider?.id));
      
      setLoading(false);
    };

    loadProvider();
  }, [providerId]);

  const handleBookNow = (bookingData = {}) => {
    // Store provider and booking context
    localStorage.setItem('selectedProvider', JSON.stringify(provider));
    localStorage.setItem('bookingContext', JSON.stringify(bookingData));
    
    // Navigate to booking scheduling
    navigate('/booking-scheduling', {
      state: {
        provider,
        bookingData
      }
    });
  };

  const handleBookService = (service) => {
    handleBookNow({ service: service?.id, serviceDetails: service });
  };

  const handleBookSlot = (date, time) => {
    handleBookNow({
      selectedDate: date,
      selectedTime: time,
      provider: provider?.id
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: `${provider?.name} - ${provider?.businessName}`,
      text: `Check out this highly rated service provider on ServiceConnect`,
      url: window.location?.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      // You could show a toast notification here
    }
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteProviders') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites?.filter(id => id !== provider?.id);
      localStorage.setItem('favoriteProviders', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites?.push(provider?.id);
      localStorage.setItem('favoriteProviders', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab provider={provider} onBookService={handleBookService} />;
      case 'reviews':
        return <ReviewsTab provider={provider} />;
      case 'availability':
        return <AvailabilityTab provider={provider} onBookSlot={handleBookSlot} />;
      default:
        return <OverviewTab provider={provider} onBookService={handleBookService} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Icon name="Loader2" size={24} className="animate-spin text-primary" />
            <span className="text-muted-foreground">Loading provider profile...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Icon name="AlertCircle" size={48} className="text-error" />
          <h2 className="text-xl font-semibold text-foreground">Provider Not Found</h2>
          <p className="text-muted-foreground text-center">
            The service provider you're looking for doesn't exist or has been removed.
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/service-provider-search-discovery')}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="bg-card border-b border-border">
        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link
              to="/service-provider-search-discovery"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-micro"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="text-sm font-medium">Back to Search</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                iconName="Share"
                className="text-muted-foreground hover:text-primary"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                iconName="Heart"
                className={`${isFavorite ? 'text-error' : 'text-muted-foreground hover:text-error'}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex lg:space-x-6 lg:px-6 lg:py-6">
        {/* Main Content */}
        <div className="flex-1 lg:max-w-4xl">
          {/* Provider Hero */}
          <ProviderHero
            provider={provider}
            onBookNow={handleBookNow}
            onShare={handleShare}
            onFavorite={handleFavorite}
            isFavorite={isFavorite}
          />

          {/* Tab Navigation */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={tabs}
          />

          {/* Tab Content */}
          <div className="bg-card">
            {renderTabContent()}
          </div>
        </div>

        {/* Desktop Booking Panel */}
        <div className="hidden lg:block lg:w-80">
          <BookingPanel
            provider={provider}
            onBookNow={handleBookNow}
            isSticky={true}
          />
        </div>
      </div>
      {/* Mobile Booking Panel */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-140 bg-card border-t border-border p-4">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => window.open(`tel:${provider?.contact?.phone}`, '_self')}
            iconName="Phone"
            className="flex-1"
          >
            Call
          </Button>
          <Button
            variant="default"
            onClick={handleBookNow}
            iconName="Calendar"
            iconPosition="left"
            className="flex-2"
          >
            Book Now
          </Button>
        </div>
      </div>
      {/* Mobile spacing for fixed bottom panel */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default ServiceProviderProfile;