import React from 'react';
import { AlertTriangle, Info, Shield, ExternalLink, FileText, Scale } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const DisclaimerPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer - Aarly</title>
        <meta name="description" content="Important disclaimers and limitations regarding Aarly's funding discovery platform and services." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full mb-6">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Disclaimer</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Important information about the limitations and scope of Aarly's services.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Last updated: January 2025
            </div>
          </div>

          {/* Content */}
          <div className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl rounded-3xl p-8 md:p-12 space-y-8">
            
            {/* General Disclaimer */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-900">General Disclaimer</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>The information contained on Aarly's platform is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the platform.</p>
                <p>Any reliance you place on such information is therefore strictly at your own risk.</p>
              </div>
            </section>

            {/* Funding Outcomes */}
            <section>
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h2 className="text-2xl font-bold text-yellow-800">No Guarantee of Funding</h2>
                </div>
                <div className="space-y-4 text-yellow-700">
                  <p className="font-semibold">IMPORTANT: Aarly does not guarantee that you will receive funding or investment.</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We provide information and connections, but funding decisions are entirely at the discretion of investors, VCs, accelerators, and grant providers</li>
                    <li>Success in fundraising depends on numerous factors including but not limited to: business model, market conditions, team experience, timing, and investor preferences</li>
                    <li>Past performance or success stories do not guarantee future results</li>
                    <li>Each funding opportunity has its own criteria, requirements, and selection process</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Accuracy */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-blue-900">Information Accuracy</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>While we strive to maintain accurate and up-to-date information about investors, funding opportunities, and market conditions:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Information may become outdated due to changing market conditions</li>
                  <li>Investor preferences, contact details, and investment criteria may change without notice</li>
                  <li>Government schemes and grant programs may be modified or discontinued</li>
                  <li>We recommend verifying all information independently before making any decisions</li>
                </ul>
                <p>We are not responsible for any decisions made based on outdated or inaccurate information.</p>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <ExternalLink className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-blue-900">Third-Party Services and Links</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Our platform may contain links to third-party websites, services, or resources. Please note:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We do not control or endorse third-party websites or services</li>
                  <li>We are not responsible for the content, privacy policies, or practices of third parties</li>
                  <li>Any transactions or interactions with third parties are solely between you and the third party</li>
                  <li>We do not guarantee the reliability, accuracy, or quality of third-party services</li>
                </ul>
              </div>
            </section>

            {/* Investment Advice */}
            <section>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-red-800">Not Investment or Legal Advice</h2>
                </div>
                <div className="space-y-4 text-red-700">
                  <p className="font-semibold">Aarly does not provide investment, legal, tax, or financial advice.</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>All information is for educational and informational purposes only</li>
                    <li>You should consult with qualified professionals before making any investment or business decisions</li>
                    <li>We do not recommend specific investments or funding sources</li>
                    <li>Each situation is unique and requires individual assessment</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Platform Availability */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-blue-900">Platform Availability</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We strive to maintain continuous platform availability, but:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The platform may be temporarily unavailable due to maintenance, updates, or technical issues</li>
                  <li>We do not guarantee uninterrupted access to our services</li>
                  <li>Features and functionality may change without prior notice</li>
                  <li>We reserve the right to modify or discontinue services at any time</li>
                </ul>
              </div>
            </section>

            {/* User Responsibility */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-blue-900">User Responsibility</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>As a user of our platform, you are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Conducting your own due diligence on all funding opportunities</li>
                  <li>Verifying the legitimacy and credentials of investors and funding sources</li>
                  <li>Understanding the terms and conditions of any funding agreements</li>
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Protecting your confidential information and intellectual property</li>
                  <li>Making informed decisions based on your own research and professional advice</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-gray-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Limitation of Liability</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>To the maximum extent permitted by law, Aarly and its team members shall not be liable for any:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Direct, indirect, incidental, or consequential damages</li>
                    <li>Loss of profits, revenue, or business opportunities</li>
                    <li>Loss of data or information</li>
                    <li>Business interruption or downtime</li>
                    <li>Decisions made based on platform information</li>
                  </ul>
                  <p className="font-semibold">Your use of our platform is at your own risk and discretion.</p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-blue-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-900">Questions About This Disclaimer</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>If you have any questions about this disclaimer or need clarification on any points, please contact us:</p>
                <div className="space-y-2">
                  <p>Email: legal@aarly.co</p>
                  <p>Phone: +91 98765 43210</p>
                  <p>Address: Bangalore, Karnataka, India</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default DisclaimerPage;