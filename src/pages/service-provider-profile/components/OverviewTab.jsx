import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OverviewTab = ({ provider, onBookService }) => {
  return (
    <div className="px-4 lg:px-6 py-6 space-y-8">
      {/* Services Offered */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Wrench" size={20} className="text-primary" />
          <span>Services Offered</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {provider?.services?.map((service, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name={service?.icon} size={18} className="text-primary" />
                  <h3 className="font-medium text-foreground">{service?.name}</h3>
                </div>
                <span className="text-sm font-medium text-primary">{service?.priceRange}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{service?.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{service?.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Star" size={12} />
                    <span>{service?.rating}</span>
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onBookService(service)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* About */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="User" size={20} className="text-primary" />
          <span>About</span>
        </h2>
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <p className="text-muted-foreground leading-relaxed mb-4">{provider?.about}</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Experience:</span>
              <p className="font-medium text-foreground">{provider?.experienceYears}+ years</p>
            </div>
            <div>
              <span className="text-muted-foreground">Response Time:</span>
              <p className="font-medium text-foreground">{provider?.responseTime}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Completed Jobs:</span>
              <p className="font-medium text-foreground">{provider?.completedJobs}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Success Rate:</span>
              <p className="font-medium text-foreground">{provider?.successRate}%</p>
            </div>
          </div>
        </div>
      </section>
      {/* Work Gallery */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Camera" size={20} className="text-primary" />
          <span>Recent Work</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {provider?.workGallery?.map((work, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={work?.image}
                  alt={work?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-lg flex items-end">
                <div className="p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-xs font-medium">{work?.title}</p>
                  <p className="text-xs opacity-80">{work?.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Service Area Map */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <span>Service Area</span>
        </h2>
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Serving within {provider?.serviceArea?.radius} miles of {provider?.location?.city}
            </p>
            <div className="flex flex-wrap gap-2">
              {provider?.serviceArea?.neighborhoods?.map((neighborhood, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {neighborhood}
                </span>
              ))}
            </div>
          </div>
          <div className="h-64 rounded-lg overflow-hidden bg-muted">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={`${provider?.name} Service Area`}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${provider?.location?.lat},${provider?.location?.lng}&z=12&output=embed`}
              className="border-0"
            />
          </div>
        </div>
      </section>
      {/* Contact Information */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Phone" size={20} className="text-primary" />
          <span>Contact Information</span>
        </h2>
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{provider?.contact?.phone}</p>
                  <p className="text-xs text-muted-foreground">Primary phone</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{provider?.contact?.email}</p>
                  <p className="text-xs text-muted-foreground">Business email</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">{provider?.contact?.address}</p>
                  <p className="text-xs text-muted-foreground">Business address</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Globe" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{provider?.contact?.website}</p>
                  <p className="text-xs text-muted-foreground">Website</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewTab;