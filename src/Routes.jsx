import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import BookingManagement from './pages/booking-management';
import UserRegistration from './pages/user-registration';
import ServiceProviderProfile from './pages/service-provider-profile';
import BookingScheduling from './pages/booking-scheduling';
import ServiceProviderSearchDiscovery from './pages/service-provider-search-discovery';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BookingManagement />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/booking-management" element={<BookingManagement />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/service-provider-profile" element={<ServiceProviderProfile />} />
        <Route path="/booking-scheduling" element={<BookingScheduling />} />
        <Route path="/service-provider-search-discovery" element={<ServiceProviderSearchDiscovery />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
