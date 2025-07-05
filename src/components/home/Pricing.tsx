import React from 'react';
import { Check } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    name: '',
    description: 'Everything you need to get started',
    price: '₹0',
    duration: '',
    features: [
      'Unlimited investor profiles',
      'Full access to all grants & schemes',
      'Advanced filtering options',
      'Direct contact information',
      'Save and organize funding options',
      'Email notifications for new matches',
    ],
    buttonText: 'Explore Now',
    buttonVariant: 'primary',
    highlighted: true,
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20 bg-gray-50 scroll-mt-20 mb-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We believe in making funding accessible to everyone.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100 relative"
              data-aos="fade-up"
            >
              <div className="absolute top-0 inset-x-0 px-4 py-1 bg-blue-600 text-white text-center text-xs font-semibold">
                Best Deal Ever!
              </div>
              
              <div className="p-8 pt-10">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.duration && <span className="text-gray-500 text-sm">/{plan.duration}</span>}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/auth">
                  <Button
                    variant={plan.buttonVariant as any}
                    className="w-full justify-center"
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;