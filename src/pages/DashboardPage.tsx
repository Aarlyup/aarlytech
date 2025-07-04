import React, { useEffect, useState } from 'react';
import { User, Briefcase, DollarSign, Building2, Rocket, Award, ArrowRight, FileText, Mail, Lightbulb, TrendingUp, Calendar, Users, MessageCircle, Star, CheckCircle, ChevronRight, ChevronLeft, Slack, Activity, Smile, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const fundingCategories = [
  {
    key: 'angels',
    label: 'Angel Investors',
    icon: <User className="text-pink-500" size={28} />,
    color: 'from-pink-100 to-pink-50',
    mock: [
      { name: 'Amit Singh', location: 'Delhi, India', sector: 'Fintech', stage: 'Seed', check: '₹10L–₹50L' },
      { name: 'Priya Mehra', location: 'Mumbai, India', sector: 'SaaS', stage: 'Pre-seed', check: '₹5L–₹20L' },
    ],
  },
  {
    key: 'vcs',
    label: 'VCs',
    icon: <Briefcase className="text-blue-500" size={28} />,
    color: 'from-blue-100 to-blue-50',
    mock: [
      { name: 'Blume Ventures', location: 'Bengaluru', sector: 'SaaS, D2C', stage: 'Seed', check: '₹1Cr–₹7Cr' },
    ],
  },
  {
    key: 'microvcs',
    label: 'Micro VCs',
    icon: <DollarSign className="text-green-500" size={28} />,
    color: 'from-green-100 to-green-50',
    mock: [
      { name: 'Java Capital', location: 'Chennai', sector: 'Deeptech', stage: 'Pre-seed', check: '₹25L–₹1Cr' },
    ],
  },
  {
    key: 'incubators',
    label: 'Incubators',
    icon: <Building2 className="text-purple-500" size={28} />,
    color: 'from-purple-100 to-purple-50',
    mock: [],
  },
  {
    key: 'accelerators',
    label: 'Accelerators',
    icon: <Rocket className="text-orange-500" size={28} />,
    color: 'from-orange-100 to-orange-50',
    mock: [
      { name: '100X.VC', location: 'Mumbai', sector: 'Agnostic', stage: 'MVP', check: '₹25L for 5%' },
    ],
  },
  {
    key: 'grants',
    label: 'Govt Grants',
    icon: <Award className="text-indigo-500" size={28} />,
    color: 'from-indigo-100 to-indigo-50',
    mock: [],
  },
];

const resources = [
  {
    icon: <FileText className="text-blue-600" size={24} />,
    title: 'Pitch Deck Templates',
    desc: '10-slide YC format, 1-pager Idea Canvas',
    link: '#',
  },
  {
    icon: <Mail className="text-green-600" size={24} />,
    title: 'Investor Outreach Templates',
    desc: 'Cold Email, LinkedIn DM Scripts',
    link: '#',
  },
  {
    icon: <Lightbulb className="text-yellow-500" size={24} />,
    title: 'Investment Philosophy Insights',
    desc: 'How Blume Thinks, What Angels Care About',
    link: '#',
  },
  {
    icon: <TrendingUp className="text-purple-600" size={24} />,
    title: 'Bonus Content',
    desc: 'Top College Decks, Grant Guide, Founder Ladder',
    link: '#',
  },
];

const quickActions = [
  { icon: <Star className="text-yellow-500" size={22} />, label: 'Add New Funding Source', link: '#' },
  { icon: <Users className="text-blue-500" size={22} />, label: 'Request Warm Intro', link: '#' },
  { icon: <MessageCircle className="text-green-500" size={22} />, label: 'Book 1:1 Mentor Call', link: '#' },
  { icon: <FileText className="text-purple-500" size={22} />, label: 'Download All Resources', link: '#' },
];

const deadlines = [
  { title: 'Startup India Seed Fund', date: 'Jul 10, 2024', type: 'Grant', link: '#' },
  { title: 'Aarly Demo Day', date: 'Jul 15, 2024', type: 'Event', link: '#' },
  { title: 'MSME Innovation Scheme', date: 'Jul 20, 2024', type: 'Grant', link: '#' },
];

const progressSteps = [
  'Build MVP',
  'Validate with Users',
  'Prepare Deck',
  'Outreach',
  'Pitch',
  'Close Funding',
];

const tips = [
  'Follow up with investors within 48 hours.',
  'Update your LinkedIn before outreach.',
  'Check new grants for your sector.',
  'Keep your pitch deck to 10 slides.',
  'Personalize every investor email.',
];

const community = [
  { icon: <MessageCircle className="text-green-600" size={22} />, label: 'Ask a Mentor', link: '#' },
  { icon: <Sparkles className="text-blue-500" size={22} />, label: 'Refer', link: '#' },
];

const recentActivity = [
  { icon: <Activity className="text-blue-600" size={18} />, text: 'Saved Blume Ventures' },
  { icon: <Activity className="text-green-600" size={18} />, text: 'Downloaded Pitch Deck Template' },
  { icon: <Activity className="text-purple-600" size={18} />, text: 'Applied to SISFS Grant' },
];

const successStories = [
  { logo: '', name: 'Finly', quote: 'Raised ₹2Cr via Aarly!', founder: 'Rohit S.' },
  { logo: '', name: 'Healthify', quote: 'Secured 3 grants in 2 months.', founder: 'Ananya P.' },
];

function useIsMd() {
  const [isMd, setIsMd] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const onResize = () => setIsMd(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMd;
}

const AnimatedProgressBar: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const isMd = useIsMd();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % progressSteps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);
  // Responsive: horizontal on md+, vertical on mobile
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-center md:gap-4">
      {/* Steps */}
      <div className="flex md:flex-row flex-col md:items-center md:gap-2 gap-3 md:mb-0 mb-4 w-full md:w-auto">
        {progressSteps.map((step, idx) => (
          <React.Fragment key={step}>
            <div className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-base shadow-sm border transition-all duration-300 flex items-center justify-center min-w-[100px] md:min-w-[120px] text-center
              ${idx < current ? 'bg-blue-600 text-white border-blue-600' : idx === current ? 'bg-blue-100 text-blue-700 border-blue-400 scale-105 shadow-lg' : 'bg-white text-blue-600 border-blue-200'}`}>{step}</div>
            {idx < progressSteps.length - 1 && (
              <span className="text-blue-300 text-2xl md:mx-0 mx-auto">{isMd ? '›' : '↓'}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Your Startup Dashboard | Aarly</title>
        <meta name="description" content="Manage your startup journey, track funding, and access personalized resources on your Aarly dashboard." />
        <link rel="canonical" href="https://aarly.co/dashboard" />
        <meta property="og:title" content="Your Startup Dashboard | Aarly" />
        <meta property="og:description" content="Manage your startup journey, track funding, and access personalized resources on your Aarly dashboard." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aarly.co/dashboard" />
        <meta property="og:image" content="/Screenshot 2025-06-29 140116.png" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12 animate-fade-in" data-aos="fade-in">
        {/* Greeting Block */}
        <div className="relative bg-white/80 border border-blue-100 shadow-2xl rounded-[2.5rem] p-8 sm:p-12 mb-8 flex flex-col items-center gap-6 overflow-hidden backdrop-blur-xl" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 0 60px 0 #3b82f680'}} data-aos="fade-down" data-aos-delay="200">
          <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(circle at 30% 20%, #e0e7ff 0%, #fff0 70%)'}}></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 text-blue-900 flex items-center gap-3 drop-shadow-sm z-10">
            <span>Hi there</span>
            <span className="text-3xl sm:text-4xl md:text-5xl animate-wiggle inline-block">👋</span>
            <span className="hidden sm:inline">Welcome to Aarly — your early-stage startup support system.</span>
            <span className="sm:hidden">Welcome to Aarly</span>
          </h2>
          <p className="text-gray-700 mb-2 text-base sm:text-lg z-10 text-center max-w-2xl">Here you can manage your saved investors, explore funding blocks, and access tools to build your startup right.</p>
          <a href="/funding/vc" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-2xl shadow-lg transition-all text-lg z-10 focus:ring-4 focus:ring-blue-200 group">
            <span className="transition-transform group-hover:scale-110 group-hover:animate-pulse">Browse All Funding Options</span> <ArrowRight size={20} className="transition-transform group-hover:scale-110 group-hover:animate-pulse" />
          </a>
        </div>

        {/* Animated Progress Steps */}
        <AnimatedProgressBar />

        {/* Saved Funding Options */}
        <div data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-xl font-bold mb-6 text-blue-900">Your Saved Funding Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fundingCategories.map(cat => (
              <div key={cat.key} className={`group rounded-2xl shadow bg-gradient-to-br ${cat.color} p-6 flex flex-col transition-transform hover:scale-105 hover:shadow-2xl`} data-aos="zoom-in" data-aos-delay="350">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white shadow border border-gray-100 transition-transform group-hover:scale-110 group-hover:animate-pulse">{cat.icon}</div>
                  <span className="text-lg font-bold text-gray-900 transition-transform group-hover:scale-105 group-hover:animate-pulse">{cat.label}</span>
                </div>
                <div className="flex-1">
                  {cat.mock.length > 0 ? (
                    <div className="space-y-3">
                      {cat.mock.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col gap-1 border border-gray-100 transition-transform hover:scale-105 hover:shadow-xl" data-aos="fade-up" data-aos-delay={400+idx*50}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-blue-700 text-base">{item.name}</span>
                            <span className="text-xs text-gray-500">{item.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                            <span className="bg-blue-50 px-2 py-0.5 rounded">{cat.label.replace('Angel Investors', 'Angel')}</span>
                            <span className="bg-green-50 px-2 py-0.5 rounded">{item.sector}</span>
                            <span className="bg-purple-50 px-2 py-0.5 rounded">{item.stage}</span>
                            <span className="bg-yellow-50 px-2 py-0.5 rounded">{item.check}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 italic mb-2">You haven't saved any {cat.label} yet.</div>
                  )}
                </div>
                <a href={`/funding/${cat.key === 'vcs' ? 'vc' : cat.key}`} className="mt-4 inline-flex items-center gap-1 text-blue-700 hover:underline font-medium group">
                  <span className="transition-transform group-hover:scale-110 group-hover:animate-pulse">View All</span> <ArrowRight size={16} className="transition-transform group-hover:scale-110 group-hover:animate-pulse" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Templates & Resources Block */}
        <div data-aos="fade-up" data-aos-delay="400">
          <h3 className="text-xl font-bold mb-6 text-blue-900">Templates & Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((res, idx) => (
              <a key={idx} href={res.link} className="group rounded-2xl bg-white shadow p-6 flex flex-col items-start gap-3 border border-gray-100 hover:shadow-lg transition-all transition-transform hover:scale-105" data-aos="zoom-in" data-aos-delay={450+idx*50}>
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 mb-2 transition-transform group-hover:scale-110 group-hover:animate-pulse">
                  {res.icon}
                </div>
                <div className="font-semibold text-blue-900 text-lg transition-transform group-hover:scale-105 group-hover:animate-pulse">{res.title}</div>
                <div className="text-gray-600 text-sm">{res.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines & Events + Actions Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-blue-900">Upcoming Deadlines & Events</h3>
            <ul className="space-y-3 relative">
              {deadlines.map((d, idx) => (
                <li key={idx} className="relative bg-white rounded-xl shadow p-4 flex items-center gap-4 border border-gray-100 group transition-all duration-200 fade-in-up" style={{animationDelay: `${idx * 80}ms`}}>
                  {/* Timeline dot and line */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-blue-400 border-2 border-white shadow-lg mb-1"></span>
                    {idx < deadlines.length - 1 && <span className="w-0.5 h-8 bg-blue-100"></span>}
                  </span>
                  <Calendar className="text-blue-500" size={24} />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{d.title}</div>
                    <div className="text-xs text-gray-500">{d.date} • {d.type}</div>
                  </div>
                  <a href={d.link} className="text-blue-600 hover:underline text-sm flex items-center gap-1 group/details transition-all">
                    Details
                    <span className="inline-block transform translate-x-0 group-hover/details:translate-x-1 transition-transform duration-200"><ArrowRight size={14} /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Ask a Mentor & Refer Actions - improved card */}
          <div className="flex flex-col items-center md:items-stretch justify-center h-full">
            <div className="bg-white/90 border border-blue-100 shadow-xl rounded-2xl p-6 flex flex-col gap-6 w-full max-w-xs mx-auto md:mx-0">
              {community.map((c, idx) => (
                <a key={idx} href={c.link} className="flex items-center gap-2 bg-white shadow-sm rounded-lg px-6 py-4 text-gray-800 hover:bg-blue-50 border border-gray-100 font-semibold text-lg transition-transform hover:scale-105 hover:shadow-lg w-full">
                  {c.icon} {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage; 