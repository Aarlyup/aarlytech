import React from 'react';
import { Target, Users, Award, TrendingUp, Heart, Rocket, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Aarav Mehta",
      role: "Lead Designer",
      bio: "Creative visionary with a passion for building beautiful, user-friendly products.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Sneha Kapoor",
      role: "Growth Strategist",
      bio: "Expert in scaling startups and driving user engagement through data-driven strategies.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Rohan Singh",
      role: "Tech Lead",
      bio: "Full-stack developer with a knack for solving complex problems and leading agile teams.",
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
          <div className="text-center mb-10 sm:mb-14 md:mb-16 px-2 sm:px-0">
            <img
              src="/Screenshot 2025-06-29 140116.png"
              alt="Aarly Rocket"
              className="mx-auto mb-6 sm:mb-8 w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg rounded-full border-4 border-blue-100 bg-white"
              style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%)' }}
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 sm:mb-6 tracking-tight drop-shadow-sm">About Aarly</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium px-2">We're on a mission to democratize startup funding by making investor connections and funding opportunities accessible to every entrepreneur in India and beyond.</p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">
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
          <div className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl rounded-3xl p-5 sm:p-8 md:p-12 mb-10 md:mb-16">
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
          <div className="mb-10 md:mb-16">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2 sm:mb-4">Our Core Values</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">These principles guide everything we do and shape how we serve the startup community.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
          <div className="mb-10 md:mb-16">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2 sm:mb-4">Meet Our Team</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Passionate individuals working together to transform the startup funding landscape.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
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

          {/* CTA Section */}
          <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-14 text-center shadow-2xl mt-10 md:mt-20 overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] rounded-2xl md:rounded-3xl pointer-events-none" />
            <div className="relative z-10 w-full flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight text-white drop-shadow-lg">Ready to Start Your Funding Journey?</h2>
              <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-10 opacity-95 font-medium text-white drop-shadow-sm">Join thousands of entrepreneurs who have found their perfect funding match through Aarly.</p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-xl">
                <Link to="/auth" className="flex-1 min-w-[180px]">
                  <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg transition-all duration-200 text-base sm:text-lg border-2 border-white focus:ring-4 focus:ring-blue-200 flex items-center justify-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact" className="flex-1 min-w-[180px]">
                  <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg transition-all duration-200 text-base sm:text-lg border-2 border-white focus:ring-4 focus:ring-blue-200 flex items-center justify-center gap-2">
                    <span>Contact Us</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;