import React from 'react';
import { Shield, Eye, Lock, Database, Users, Mail, Phone, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Aarly</title>
        <meta name="description" content="Learn how Aarly protects your privacy and handles your personal information." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Last updated: January 2025
            </div>
          </div>

          {/* Content */}
          <div className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl rounded-3xl p-8 md:p-12 space-y-8">
            
            {/* Information We Collect */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-900">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create an account or profile</li>
                  <li>Use our funding discovery services</li>
                  <li>Contact us for support</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in surveys or feedback</li>
                </ul>
                <p>This may include your name, email address, company information, and funding preferences.</p>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-blue-900">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and improve our funding discovery services</li>
                  <li>Match you with relevant investors and funding opportunities</li>
                  <li>Send you updates about new funding sources</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-blue-900">Information Sharing</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-blue-900">Data Security</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                <p>However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-blue-900">Your Rights</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data portability</li>
                  <li>Lodge a complaint with supervisory authorities</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-blue-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-900">Contact Us</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Email: privacy@aarly.co</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Phone: +91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Address: Bangalore, Karnataka, India</span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;