import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';


const SearchHeader = ({ searchQuery, onSearchChange, onLocationClick, currentLocation }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      {/* Location Bar */}
      <div className="bg-muted border-b border-border">
        <div className="px-4 py-2">
          <button
            onClick={onLocationClick}
            className="flex items-center space-x-2 text-sm hover:text-primary transition-micro"
          >
            <Icon name="MapPin" size={14} className="text-primary" />
            <span className="font-medium truncate">{currentLocation}</span>
            <Icon name="ChevronDown" size={14} />
          </button>
        </div>
      </div>
      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Icon name="Search" size={18} className="text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search for plumbers, electricians, carpenters..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-10 pr-4 h-12 text-base"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-micro"
            >
              <Icon name="X" size={16} className="text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Quick Search Suggestions */}
        {isSearchFocused && (
          <div className="absolute left-4 right-4 top-full mt-1 bg-popover border border-border rounded-lg shadow-modal z-60">
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2 px-2">Popular searches</div>
              {['Emergency plumber', 'Electrician near me', 'Carpenter services', 'HVAC repair']?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSearchChange(suggestion)}
                  className="w-full text-left px-2 py-2 text-sm hover:bg-muted rounded transition-micro flex items-center space-x-2"
                >
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;