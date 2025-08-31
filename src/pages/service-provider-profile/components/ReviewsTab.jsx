import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewsTab = ({ provider }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filterOptions = [
    { value: 'all', label: 'All Reviews', count: provider?.reviewCount },
    { value: '5', label: '5 Stars', count: 45 },
    { value: '4', label: '4 Stars', count: 23 },
    { value: '3', label: '3 Stars', count: 8 },
    { value: '2', label: '2 Stars', count: 2 },
    { value: '1', label: '1 Star', count: 1 }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFilteredReviews = () => {
    let filtered = provider?.reviews;
    
    if (selectedFilter !== 'all') {
      filtered = filtered?.filter(review => review?.rating === parseInt(selectedFilter));
    }
    
    return filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b?.rating - a?.rating;
        case 'lowest':
          return a?.rating - b?.rating;
        default:
          return 0;
      }
    });
  };

  return (
    <div className="px-4 lg:px-6 py-6 space-y-6">
      {/* Rating Overview */}
      <section className="bg-muted/50 rounded-lg p-6 border border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-foreground">{provider?.rating}</span>
              <div className="flex items-center">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className={`${
                      i < Math.floor(provider?.rating)
                        ? 'text-warning fill-current' :'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground">
              Based on {provider?.reviewCount} reviews
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => {
              const count = filterOptions?.find(f => f?.value === rating?.toString())?.count || 0;
              const percentage = (count / provider?.reviewCount) * 100;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground w-8">{rating}</span>
                  <Icon name="Star" size={12} className="text-warning" />
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-warning transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Filters and Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setSelectedFilter(option?.value)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-standard ${
                selectedFilter === option?.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
              }`}
            >
              {option?.label} ({option?.count})
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <section className="space-y-4">
        {getFilteredReviews()?.map((review, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              {/* Customer Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={review?.customer?.avatar}
                    alt={review?.customer?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{review?.customer?.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={`${
                              i < review?.rating
                                ? 'text-warning fill-current' :'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review?.date)}
                      </span>
                    </div>
                  </div>
                  {review?.verified && (
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                      <Icon name="CheckCircle" size={12} />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Service: {review?.service}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">{review?.comment}</p>
                </div>

                {/* Review Photos */}
                {review?.photos && review?.photos?.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review?.photos?.map((photo, photoIndex) => (
                      <div key={photoIndex} className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={photo}
                          alt={`Review photo ${photoIndex + 1}`}
                          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Provider Response */}
                {review?.providerResponse && (
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg border-l-2 border-primary">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="MessageSquare" size={14} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Response from {provider?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(review?.providerResponse?.date)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review?.providerResponse?.message}
                    </p>
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                  <button className="flex items-center space-x-1 hover:text-primary transition-micro">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review?.helpfulCount})</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-primary transition-micro">
                    <Icon name="Flag" size={14} />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* Load More */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => {}}
          iconName="ChevronDown"
          iconPosition="right"
        >
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewsTab;