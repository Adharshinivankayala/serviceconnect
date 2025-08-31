import React from 'react';

const LoadingSkeletons = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg shadow-card overflow-hidden animate-pulse">
          {/* Image Skeleton */}
          <div className="aspect-[4/3] bg-muted"></div>
          
          {/* Content Skeleton */}
          <div className="p-4">
            {/* Name & Rating */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="w-3 h-3 bg-muted rounded"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-6 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-14"></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="text-center">
                  <div className="h-4 bg-muted rounded w-12 mx-auto mb-1"></div>
                  <div className="h-3 bg-muted rounded w-16 mx-auto"></div>
                </div>
              ))}
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between">
              <div>
                <div className="h-6 bg-muted rounded w-20 mb-1"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 bg-muted rounded w-20"></div>
                <div className="h-8 bg-muted rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeletons;