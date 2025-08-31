import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateTimeSelector = ({ selectedDate, selectedTime, onDateChange, onTimeChange, isEmergency }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState({});

  // Mock availability data
  useEffect(() => {
    const mockAvailability = {};
    const today = new Date();
    
    // Generate availability for next 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date?.setDate(today?.getDate() + i);
      const dateKey = date?.toISOString()?.split('T')?.[0];
      
      // Mock time slots with different pricing
      const slots = [];
      const baseHours = [8, 9, 10, 11, 13, 14, 15, 16, 17];
      
      baseHours?.forEach(hour => {
        if (Math.random() > 0.3) { // 70% availability
          const isPeak = hour >= 17 || (hour >= 8 && hour <= 10);
          slots?.push({
            time: `${hour?.toString()?.padStart(2, '0')}:00`,
            available: true,
            price: isPeak ? 120 : 100,
            isPeak
          });
        }
        
        if (Math.random() > 0.4) { // 60% availability for half hours
          const isPeak = hour >= 17 || (hour >= 8 && hour <= 10);
          slots?.push({
            time: `${hour?.toString()?.padStart(2, '0')}:30`,
            available: true,
            price: isPeak ? 120 : 100,
            isPeak
          });
        }
      });
      
      mockAvailability[dateKey] = slots;
    }
    
    setAvailableSlots(mockAvailability);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    
    if (date < today) return false;
    
    const dateKey = date?.toISOString()?.split('T')?.[0];
    return availableSlots?.[dateKey] && availableSlots?.[dateKey]?.length > 0;
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      onDateChange(date);
      onTimeChange(null); // Reset time selection
    }
  };

  const getAvailableTimesForDate = () => {
    if (!selectedDate) return [];
    const dateKey = selectedDate?.toISOString()?.split('T')?.[0];
    return availableSlots?.[dateKey] || [];
  };

  const formatMonth = (date) => {
    return date?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Calendar" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Select Date & Time</h2>
        {isEmergency && (
          <span className="px-2 py-1 bg-error/10 text-error text-xs font-medium rounded-full">
            Emergency Priority
          </span>
        )}
      </div>
      {/* Calendar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-foreground">{formatMonth(currentMonth)}</h3>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigateMonth(-1)}
              iconName="ChevronLeft"
            />
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigateMonth(1)}
              iconName="ChevronRight"
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays?.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days?.map((date, index) => (
            <button
              key={index}
              onClick={() => date && handleDateSelect(date)}
              disabled={!date || !isDateAvailable(date)}
              className={`
                aspect-square p-2 text-sm rounded-md transition-standard
                ${!date ? 'invisible' : ''}
                ${!isDateAvailable(date) && date ? 'text-muted-foreground cursor-not-allowed' : ''}
                ${isDateAvailable(date) && !isDateSelected(date) ? 'text-foreground hover:bg-muted' : ''}
                ${isDateSelected(date) ? 'bg-primary text-primary-foreground' : ''}
              `}
            >
              {date?.getDate()}
            </button>
          ))}
        </div>
      </div>
      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">
            Available Times for {selectedDate?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {getAvailableTimesForDate()?.map((slot) => (
              <button
                key={slot?.time}
                onClick={() => onTimeChange(slot)}
                className={`
                  p-3 rounded-lg border transition-standard text-sm
                  ${selectedTime?.time === slot?.time 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-border bg-background hover:bg-muted'
                  }
                `}
              >
                <div className="font-medium">{slot?.time}</div>
                <div className={`text-xs ${selectedTime?.time === slot?.time ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  ${slot?.price}
                  {slot?.isPeak && (
                    <span className="ml-1">
                      <Icon name="TrendingUp" size={10} className="inline" />
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {getAvailableTimesForDate()?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Calendar" size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No available time slots for this date</p>
            </div>
          )}

          {/* Pricing Legend */}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Peak Hours (+$20)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span>Standard Rate</span>
                </div>
              </div>
              {isEmergency && (
                <span className="text-error font-medium">+50% Emergency Fee</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;