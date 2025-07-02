import React from 'react';
import { FileText, AlertTriangle, Scale, Users, Shield, Gavel } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Aarly</title>
        <meta name="description" content="Read Aarly's terms of service and understand your rights and responsibilities when using our platform." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using Aarly's funding discovery platform.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Last updated: January 2025
            </div>
          </div>

          {/* Content */}
          <div className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl rounded-3xl p-8 md:p-12 space-y-8">
            
            {/* Acceptance of Terms */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-900">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>By accessing and using Aarly's platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                <p>These terms apply to all visitors, users, and others who access or use the service.</p>
              </div>
            </section>

            {/* Description of Service */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-blue-900">Description of Service</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Aarly provides a funding discovery platform that helps startups and entrepreneurs find relevant investors, grants, and funding opportunities. Our services include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Database of investors, VCs, micro-VCs, accelerators, and incubators</li>
                  <li>Government grants and schemes information</li>
                  <li>Investor matching services</li>
                  <li>Resources and templates for fundraising</li>
                  <li>News and updates about the funding ecosystem</li>
                </ul>
              </div>
            </section>

            {/* User Responsibilities */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-blue-900">User Responsibilities</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>As a user of our platform, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and truthful information</li>
                  <li>Use the platform for legitimate business purposes only</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not engage in any fraudulent or misleading activities</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </section>

            {/* Disclaimers */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-blue-900">Important Disclaimers</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="font-semibold text-yellow-800 mb-2">Funding Outcomes</p>
                  <p className="text-yellow-700">Aarly does not guarantee funding success. We provide information and connections, but funding decisions are entirely at the discretion of investors and grant providers.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-blue-800 mb-2">Information Accuracy</p>
                  <p className="text-blue-700">While we strive to maintain accurate information, we cannot guarantee the completeness or accuracy of all data on our platform.</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-800 mb-2">Third-Party Services</p>
                  <p className="text-red-700">We are not responsible for the actions, content, or services of third-party investors, accelerators, or other entities listed on our platform.</p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Gavel className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-blue-900">Limitation of Liability</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>To the maximum extent permitted by law, Aarly shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
                <p>Our total liability to you for all claims arising from or relating to the service shall not exceed the amount you paid us in the twelve months preceding the claim.</p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-blue-900">Intellectual Property</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>The service and its original content, features, and functionality are and will remain the exclusive property of Aarly and its licensors. The service is protected by copyright, trademark, and other laws.</p>
                <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our service without prior written consent.</p>
              </div>
            </section>

            {/* Termination */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-blue-900">Termination</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                <p>You may terminate your account at any time by contacting us or through your account settings.</p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-blue-900">Changes to Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.</p>
                <p>Your continued use of the service after any such changes constitutes your acceptance of the new Terms.</p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-blue-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-900">Contact Us</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
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

export default TermsOfServicePage;