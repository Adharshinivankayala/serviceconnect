import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LocationHeader from '../../components/ui/LocationHeader';
import BookingStatusIndicator from '../../components/ui/BookingStatusIndicator';
import EmergencyAccessButton from '../../components/ui/EmergencyAccessButton';
import TrustSignalFooter from '../../components/ui/TrustSignalFooter';
import BookingCard from './components/BookingCard';
import BookingFilters from './components/BookingFilters';
import BookingTabs from './components/BookingTabs';
import EmptyState from './components/EmptyState';
import BookingModal from './components/BookingModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BookingManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filters, setFilters] = useState({
    search: '',
    serviceType: '',
    fromDate: '',
    toDate: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'date-desc'
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    booking: null
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock booking data
  const mockBookings = [
    {
      id: 'BK-2025-001',
      service: {
        name: 'Emergency Plumbing Repair',
        description: 'Fix leaking kitchen sink and replace faulty faucet'
      },
      provider: {
        id: 'PRV-001',
        name: 'Seattle Pro Plumbing',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 4.8,
        completedJobs: 247,
        phone: '(206) 555-0123'
      },
      status: 'upcoming',
      scheduledTime: '2025-08-31T15:30:00',
      address: '123 Main St, Seattle, WA 98101',
      price: 185,
      notes: 'Please call when you arrive. Gate code is 1234.',
      createdAt: '2025-08-29T10:00:00'
    },
    {
      id: 'BK-2025-002',
      service: {
        name: 'Electrical Outlet Installation',
        description: 'Install 3 new outlets in home office'
      },
      provider: {
        id: 'PRV-002',
        name: 'PowerUp Electric',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        rating: 4.9,
        completedJobs: 189,
        phone: '(206) 555-0456'
      },
      status: 'in-progress',
      scheduledTime: '2025-08-31T09:00:00',
      estimatedCompletion: '2025-08-31T12:00:00',
      address: '456 Oak Ave, Seattle, WA 98102',
      price: 320,
      createdAt: '2025-08-28T14:30:00'
    },
    {
      id: 'BK-2025-003',
      service: {
        name: 'HVAC System Maintenance',
        description: 'Annual maintenance and filter replacement'
      },
      provider: {
        id: 'PRV-003',
        name: 'Climate Control Experts',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
        rating: 4.7,
        completedJobs: 156,
        phone: '(206) 555-0789'
      },
      status: 'completed',
      scheduledTime: '2025-08-29T14:00:00',
      completedAt: '2025-08-29T16:30:00',
      address: '789 Pine St, Seattle, WA 98103',
      price: 150,
      rated: false,
      createdAt: '2025-08-27T11:15:00'
    },
    {
      id: 'BK-2025-004',
      service: {
        name: 'Kitchen Cabinet Repair',
        description: 'Fix broken cabinet door hinges'
      },
      provider: {
        id: 'PRV-004',
        name: 'Handy Home Solutions',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
        rating: 4.6,
        completedJobs: 203,
        phone: '(206) 555-0321'
      },
      status: 'cancelled',
      scheduledTime: '2025-08-30T10:00:00',
      address: '321 Cedar Blvd, Seattle, WA 98104',
      price: 95,
      cancelledAt: '2025-08-29T08:00:00',
      cancelReason: 'Provider unavailable due to emergency',
      createdAt: '2025-08-26T16:45:00'
    },
    {
      id: 'BK-2025-005',
      service: {
        name: 'Deep House Cleaning',
        description: 'Complete house cleaning service'
      },
      provider: {
        id: 'PRV-005',
        name: 'Sparkle Clean Services',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        rating: 4.9,
        completedJobs: 312,
        phone: '(206) 555-0654'
      },
      status: 'completed',
      scheduledTime: '2025-08-28T09:00:00',
      completedAt: '2025-08-28T14:00:00',
      address: '654 Maple Dr, Seattle, WA 98105',
      price: 280,
      rated: true,
      rating: 5,
      review: 'Excellent service! Very thorough and professional.',
      createdAt: '2025-08-25T13:20:00'
    }
  ];

  // Filter and sort bookings
  const filteredBookings = useMemo(() => {
    let filtered = mockBookings?.filter(booking => {
      // Tab filter
      const statusMap = {
        'upcoming': 'upcoming',
        'in-progress': 'in-progress',
        'completed': 'completed',
        'cancelled': 'cancelled'
      };
      
      if (booking?.status !== statusMap?.[activeTab]) return false;

      // Search filter
      if (filters?.search) {
        const searchTerm = filters?.search?.toLowerCase();
        const searchableText = `${booking?.service?.name} ${booking?.provider?.name} ${booking?.address}`?.toLowerCase();
        if (!searchableText?.includes(searchTerm)) return false;
      }

      // Service type filter
      if (filters?.serviceType) {
        const serviceType = booking?.service?.name?.toLowerCase();
        if (!serviceType?.includes(filters?.serviceType?.toLowerCase())) return false;
      }

      // Date range filter
      if (filters?.fromDate) {
        const bookingDate = new Date(booking.scheduledTime)?.toISOString()?.split('T')?.[0];
        if (bookingDate < filters?.fromDate) return false;
      }
      
      if (filters?.toDate) {
        const bookingDate = new Date(booking.scheduledTime)?.toISOString()?.split('T')?.[0];
        if (bookingDate > filters?.toDate) return false;
      }

      // Price range filter
      if (filters?.minPrice && booking?.price < parseInt(filters?.minPrice)) return false;
      if (filters?.maxPrice && booking?.price > parseInt(filters?.maxPrice)) return false;

      return true;
    });

    // Sort bookings
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'date-asc':
          return new Date(a.scheduledTime) - new Date(b.scheduledTime);
        case 'date-desc':
          return new Date(b.scheduledTime) - new Date(a.scheduledTime);
        case 'price-asc':
          return a?.price - b?.price;
        case 'price-desc':
          return b?.price - a?.price;
        case 'rating-desc':
          return b?.provider?.rating - a?.provider?.rating;
        default:
          return new Date(b.scheduledTime) - new Date(a.scheduledTime);
      }
    });

    return filtered;
  }, [mockBookings, activeTab, filters]);

  // Calculate booking counts for tabs
  const bookingCounts = useMemo(() => {
    return {
      upcoming: mockBookings?.filter(b => b?.status === 'upcoming')?.length,
      inProgress: mockBookings?.filter(b => b?.status === 'in-progress')?.length,
      completed: mockBookings?.filter(b => b?.status === 'completed')?.length,
      cancelled: mockBookings?.filter(b => b?.status === 'cancelled')?.length
    };
  }, [mockBookings]);

  // Check if filters are active
  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== '' && value !== null && value !== undefined && value !== 'date-desc'
  );

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      serviceType: '',
      fromDate: '',
      toDate: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'date-desc'
    });
  };

  const handleModalAction = async (formData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    switch (modalState?.type) {
      case 'cancel': console.log('Cancelling booking:', modalState?.booking?.id, formData);
        break;
      case 'reschedule': console.log('Rescheduling booking:', modalState?.booking?.id, formData);
        break;
      case 'contact': console.log('Contacting provider:', modalState?.booking?.provider?.name, formData);
        break;
      case 'rate': console.log('Rating service:', modalState?.booking?.id, formData);
        break;
    }
  };

  const openModal = (type, booking) => {
    setModalState({
      isOpen: true,
      type,
      booking
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      booking: null
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <LocationHeader />
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center space-x-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={24} className="text-primary" />
            </div>
            <span className="text-muted-foreground">Loading your bookings...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <LocationHeader />
      <BookingStatusIndicator />
      <main className="flex-1 px-4 lg:px-6 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
              <Button
                variant="default"
                onClick={() => navigate('/service-provider-search-discovery')}
                iconName="Plus"
                iconPosition="left"
                className="hidden sm:flex"
              >
                New Booking
              </Button>
            </div>
            <p className="text-muted-foreground">
              Manage your service appointments and track their progress
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <BookingTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              bookingCounts={bookingCounts}
            />
          </div>

          {/* Filters */}
          <div className="mb-6">
            <BookingFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Results Summary */}
          {filteredBookings?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredBookings?.length} booking{filteredBookings?.length !== 1 ? 's' : ''}
                {hasActiveFilters && ' (filtered)'}
              </p>
            </div>
          )}

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings?.length > 0 ? (
              filteredBookings?.map((booking) => (
                <BookingCard
                  key={booking?.id}
                  booking={booking}
                  onCancel={(booking) => openModal('cancel', booking)}
                  onReschedule={(booking) => openModal('reschedule', booking)}
                  onContact={(booking) => openModal('contact', booking)}
                  onRate={(booking) => openModal('rate', booking)}
                  onStatusUpdate={() => {}} // Add this required prop
                />
              ))
            ) : (
              <EmptyState
                activeTab={activeTab}
                hasFilters={hasActiveFilters}
                onClearFilters={handleClearFilters}
              />
            )}
          </div>

          {/* Mobile: New Booking FAB */}
          <div className="sm:hidden">
            <button
              onClick={() => navigate('/service-provider-search-discovery')}
              className="fixed bottom-20 left-4 z-200 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-modal hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:scale-105"
              aria-label="New Booking"
            >
              <Icon name="Plus" size={24} />
            </button>
          </div>
        </div>
      </main>
      {/* Modal */}
      <BookingModal
        isOpen={modalState?.isOpen}
        onClose={closeModal}
        type={modalState?.type}
        booking={modalState?.booking}
        onConfirm={handleModalAction}
      />
      <EmergencyAccessButton />
      <TrustSignalFooter />
    </div>
  );
};

export default BookingManagement;