import React from 'react';
import { Target, Users, Award, TrendingUp, Heart, Rocket, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Abhinav Dwivedy",
      role: "Founder & CEO",
      bio: "Serial entrepreneur with 8+ years in startup ecosystem. Previously founded two successful ventures.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Priya Sharma",
      role: "Head of Product",
      bio: "Former product manager at leading fintech companies. Expert in user experience and platform design.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Rahul Gupta",
      role: "Head of Partnerships",
      bio: "15+ years in venture capital and startup investments. Deep network across Indian startup ecosystem.",
      image: "/api/placeholder/150/150"
    }
  ];

  const milestones = [
    { year: "2023", event: "Aarly founded with vision to democratize startup funding" },
    { year: "2024", event: "Launched with 100+ investors and 50+ government schemes" },
    { year: "2024", event: "Reached 1,000+ startups using our platform" },
    { year: "2025", event: "Expanded to 300+ funding sources and launched investor matching" }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Accessibility",
      description: "Making funding opportunities accessible to every entrepreneur, regardless of background or connections."
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Transparency",
      description: "Providing clear, honest information about investors and funding processes without hidden agendas."
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Community",
      description: "Building a supportive ecosystem where entrepreneurs can learn, connect, and grow together."
    },
    {
      icon: <Rocket className="w-8 h-8 text-purple-500" />,
      title: "Innovation",
      description: "Continuously improving our platform to better serve the evolving needs of the startup community."
    }
  ];

  const stats = [
    { number: "300+", label: "Funding Sources", icon: <Award className="w-6 h-6 text-blue-600" /> },
    { number: "₹120Cr+", label: "Funding Facilitated", icon: <TrendingUp className="w-6 h-6 text-green-600" /> },
    { number: "2,500+", label: "Startups Helped", icon: <Users className="w-6 h-6 text-purple-600" /> },
    { number: "95%", label: "User Satisfaction", icon: <Star className="w-6 h-6 text-yellow-600" /> }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Aarly</title>
        <meta name="description" content="Learn about Aarly's mission to democratize startup funding and help entrepreneurs find the right investors and grants." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-8">
              <Rocket className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-blue-900 mb-6">About Aarly</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize startup funding by making investor connections and funding opportunities accessible to every entrepreneur in India and beyond.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-lg rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-blue-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To bridge the gap between ambitious entrepreneurs and the right funding opportunities by providing a comprehensive, transparent, and accessible platform that empowers startups to find their perfect funding match.
              </p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl font-bold text-blue-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the go-to platform for startup funding in India, where every entrepreneur has equal access to funding opportunities and the tools they need to build successful, impactful businesses.
              </p>
            </div>
          </div>

          {/* Our Story */}
          <div className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl rounded-3xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                Aarly was born from a simple yet powerful observation: too many brilliant entrepreneurs struggle to find the right funding not because their ideas lack merit, but because they lack access to the right networks and information.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our founder, having experienced the challenges of fundraising firsthand, realized that the startup ecosystem needed a platform that could democratize access to funding opportunities. Traditional methods of finding investors often relied on personal networks, warm introductions, and insider knowledge – creating barriers for many deserving entrepreneurs.
              </p>
              <p className="text-lg leading-relaxed">
                Today, Aarly serves as the bridge between ambitious startups and the funding ecosystem, providing not just a database of investors, but a comprehensive toolkit for successful fundraising. We've helped facilitate over ₹120 crores in funding and continue to grow our impact every day.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do and shape how we serve the startup community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-lg rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900">{value.title}</h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Passionate individuals working together to transform the startup funding landscape.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-lg rounded-2xl p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Journey</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Key milestones in our mission to democratize startup funding.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-lg rounded-2xl p-6">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                        <p className="text-gray-700">{milestone.event}</p>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Funding Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of entrepreneurs who have found their perfect funding match through Aarly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-lg transition-all">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;