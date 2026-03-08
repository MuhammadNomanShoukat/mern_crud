import React, { useState } from "react";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../store/auth";
import "../styles/service.css";

const Service = () => {
  const { services } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  // Comprehensive service images mapping based on common service types
  const serviceImageMap = {
    // Web Development
    'web development': '/images/web-dev.svg',
    'web dev': '/images/web-dev.svg',
    'frontend': '/images/web-dev.svg',
    'backend': '/images/web-dev.svg',
    'full stack': '/images/web-dev.svg',
    'fullstack': '/images/web-dev.svg',
    'react': '/images/web-dev.svg',
    'node': '/images/web-dev.svg',
    'nodejs': '/images/web-dev.svg',
    'javascript': '/images/web-dev.svg',
    'html': '/images/web-dev.svg',
    'css': '/images/web-dev.svg',
    'programming': '/images/web-dev.svg',
    'coding': '/images/web-dev.svg',
    
    // Web Design
    'web design': '/images/web-design.svg',
    'webdesign': '/images/web-design.svg',
    'ui/ux': '/images/web-design.svg',
    'ui ux': '/images/web-design.svg',
    'ui': '/images/web-design.svg',
    'ux': '/images/web-design.svg',
    'design': '/images/web-design.svg',
    'graphic design': '/images/web-design.svg',
    'graphic': '/images/web-design.svg',
    'figma': '/images/web-design.svg',
    'photoshop': '/images/web-design.svg',
    'illustrator': '/images/web-design.svg',
    
    // Mobile App Development
    'mobile app': '/images/mobile-app.svg',
    'mobile': '/images/mobile-app.svg',
    'app development': '/images/mobile-app.svg',
    'ios': '/images/mobile-app.svg',
    'android': '/images/mobile-app.svg',
    'react native': '/images/mobile-app.svg',
    'flutter': '/images/mobile-app.svg',
    'swift': '/images/mobile-app.svg',
    'kotlin': '/images/mobile-app.svg',
    'phone': '/images/mobile-app.svg',
    
    // DevOps & Cloud
    'devops': '/images/devops.svg',
    'deployment': '/images/devops.svg',
    'docker': '/images/devops.svg',
    'kubernetes': '/images/devops.svg',
    'k8s': '/images/devops.svg',
    'ci/cd': '/images/devops.svg',
    'ci cd': '/images/devops.svg',
    'aws': '/images/devops.svg',
    'azure': '/images/devops.svg',
    'gcp': '/images/devops.svg',
    'cloud': '/images/devops.svg',
    'server': '/images/devops.svg',
    'infrastructure': '/images/devops.svg',
    
    // Database
    'database': '/images/database.svg',
    'db': '/images/database.svg',
    'mongodb': '/images/database.svg',
    'mongo': '/images/database.svg',
    'mysql': '/images/database.svg',
    'postgresql': '/images/database.svg',
    'postgres': '/images/database.svg',
    'sql': '/images/database.svg',
    'data': '/images/database.svg',
    'storage': '/images/database.svg',
    
    // E-commerce & Online Business
    'ecommerce': '/images/ecommerce.svg',
    'e-commerce': '/images/ecommerce.svg',
    'e commerce': '/images/ecommerce.svg',
    'online store': '/images/ecommerce.svg',
    'online shop': '/images/ecommerce.svg',
    'shopping': '/images/ecommerce.svg',
    'storefront': '/images/ecommerce.svg',
    'retail': '/images/ecommerce.svg',
    'marketplace': '/images/ecommerce.svg',
    'woocommerce': '/images/ecommerce.svg',
    'shopify': '/images/ecommerce.svg',
    'magento': '/images/ecommerce.svg',
    'payment': '/images/ecommerce.svg',
    'checkout': '/images/ecommerce.svg',
    'cart': '/images/ecommerce.svg',
    
    // Machine Learning & AI
    'machine learning': '/images/machine-learning.svg',
    'ml': '/images/machine-learning.svg',
    'artificial intelligence': '/images/machine-learning.svg',
    'ai': '/images/machine-learning.svg',
    'deep learning': '/images/machine-learning.svg',
    'neural network': '/images/machine-learning.svg',
    'neural': '/images/machine-learning.svg',
    'data science': '/images/machine-learning.svg',
    'predictive': '/images/machine-learning.svg',
    'analytics': '/images/machine-learning.svg',
    'algorithm': '/images/machine-learning.svg',
    'modeling': '/images/machine-learning.svg',
    'tensorflow': '/images/machine-learning.svg',
    'pytorch': '/images/machine-learning.svg',
    'scikit': '/images/machine-learning.svg',
    
    // Consulting & Business
    'consulting': '/images/consulting.svg',
    'consultation': '/images/consulting.svg',
    'consultant': '/images/consulting.svg',
    'advisory': '/images/consulting.svg',
    'advice': '/images/consulting.svg',
    'business': '/images/consulting.svg',
    'strategy': '/images/consulting.svg',
    'planning': '/images/consulting.svg',
    'analysis': '/images/consulting.svg',
    'support': '/images/consulting.svg',
    'help': '/images/consulting.svg',
  };

  const getServiceImage = (serviceTitle, description) => {
    const searchText = `${serviceTitle || ''} ${description || ''}`.toLowerCase();
    
    // Search for matching keywords
    for (const [keyword, imagePath] of Object.entries(serviceImageMap)) {
      if (searchText.includes(keyword)) {
        return imagePath;
      }
    }
    
    // Fallback to default
    return '/images/service-default.svg';
  };

  // Temporary mock data for testing - remove this when real data is available
  const mockServices = [
    { service: "Web Development", description: "Full-stack web development using React and Node.js", price: "5000", provider: "Tech Solutions" },
    { service: "Mobile App Development", description: "Native iOS and Android app development", price: "8000", provider: "App Masters" },
    { service: "UI/UX Design", description: "User interface and experience design with Figma", price: "3000", provider: "Design Studio" },
    { service: "DevOps Consulting", description: "Cloud infrastructure and deployment solutions", price: "4000", provider: "Cloud Experts" },
    { service: "Database Design", description: "MongoDB and SQL database architecture", price: "2500", provider: "Data Systems" },
    { service: "Business Consulting", description: "Strategic business planning and analysis", price: "6000", provider: "Biz Advisors" },
    { service: "Machine Learning", description: "AI and machine learning solutions with TensorFlow and PyTorch", price: "10000", provider: "AI Solutions" },
    { service: "E-commerce Development", description: "Complete online store setup with payment integration", price: "7500", provider: "Shop Solutions" }
  ];

  // Use mock data if no services are loaded yet
  const displayServices = services && services.length > 0 ? services : mockServices;

  return (
    <>
      <section className="section-services">
        <div className="services-header">
          <div className="container">
            <h1 className="main-heading">Our Services</h1>
            <p className="services-subtitle">
              Explore our comprehensive range of professional services tailored to meet your needs
            </p>
          </div>
        </div>

        {displayServices && displayServices.length > 0 ? (
          <div className="container services-container">
            {/* Debug Info */}
            <div className="debug-info" style={{background: '#f0f0f0', padding: '1rem', marginBottom: '2rem', borderRadius: '8px', fontSize: '0.9rem'}}>
              <h4>Debug Info (Remove in production):</h4>
              <p><strong>Using:</strong> {services && services.length > 0 ? 'Real API Data' : 'Mock Data'}</p>
              <p><strong>Services Count:</strong> {displayServices.length}</p>
              <div style={{marginTop: '0.5rem'}}>
                <strong>Service Images:</strong>
                <ul style={{margin: '0.5rem 0', paddingLeft: '1.5rem'}}>
                  {displayServices.map((service, index) => (
                    <li key={index}>
                      {service.service}: {getServiceImage(service.service, service.description).split('/').pop()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Tabs Navigation */}
            <div className="services-tabs">
              <div className="tabs-navigation">
                {displayServices.map((service, index) => (
                  <button
                    key={`tab-${index}`}
                    className={`tab-button ${activeTab === index ? 'active' : ''}`}
                    onClick={() => setActiveTab(index)}
                    type="button"
                  >
                    <span className="tab-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="tab-title">{service.service}</span>
                  </button>
                ))}
              </div>

              {/* Tabs Content */}
              <div className="tabs-content">
                {displayServices.map((service, index) => (
                  <div
                    key={`panel-${index}`}
                    className={`tab-panel ${activeTab === index ? 'active' : ''}`}
                  >
                    <div className="service-detail-grid">
                      <div className="service-image">
                        <img
                          src={getServiceImage(service.service, service.description)}
                          alt={service.service}
                          width="400"
                          height="400"
                          onError={(e) => {
                            console.error(`Failed to load image for ${service.service}:`, e.target.src);
                            e.target.src = '/images/service-default.svg';
                          }}
                        />
                        <div className="image-debug" style={{position: 'absolute', top: '5px', right: '5px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 5px', fontSize: '10px', borderRadius: '3px'}}>
                          {getServiceImage(service.service, service.description).split('/').pop()}
                        </div>
                      </div>

                      <div className="service-info">
                        <h2 className="service-title">{service.service}</h2>
                        <p className="service-description">{service.description}</p>

                        <div className="service-details-grid">
                          <div className="detail-item">
                            <span className="detail-label">Provider:</span>
                            <span className="detail-value">{service.provider}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Price:</span>
                            <span className="detail-value price">${service.price}</span>
                          </div>
                        </div>

                        <button className="btn-learn-more">Get Started</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Grid View */}
            <div className="services-grid-view">
              <h3 className="grid-heading">All Services Overview</h3>
              <div className="services-grid">
                {displayServices.map((service, index) => (
                  <div
                    key={`card-${index}`}
                    className="service-card"
                    onClick={() => setActiveTab(index)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveTab(index);
                      }
                    }}
                  >
                    <div className="card-image">
                      <img
                        src={getServiceImage(service.service, service.description)}
                        alt={service.service}
                        width="300"
                        height="200"
                        onError={(e) => {
                          console.error(`Failed to load image for ${service.service}:`, e.target.src);
                          e.target.src = '/images/service-default.svg';
                        }}
                      />
                      <div className="image-debug" style={{position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '1px 3px', fontSize: '8px', borderRadius: '2px'}}>
                        {getServiceImage(service.service, service.description).split('/').pop()}
                      </div>
                    </div>
                    <div className="card-content">
                      <h3>{service.service}</h3>
                      <p className="card-provider">by {service.provider}</p>
                      <div className="card-footer">
                        <span className="card-price">${service.price}</span>
                        <button className="card-btn" onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab(index);
                        }}>View</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="container no-services">
            <p>No services available at the moment. Showing sample data for demonstration.</p>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Service;
