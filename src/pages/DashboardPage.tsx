import React from 'react';
import { User, Briefcase, DollarSign, Building2, Rocket, Award, ArrowRight, FileText, Mail, Lightbulb, TrendingUp, Calendar, Users, MessageCircle, Star, CheckCircle, ChevronRight, ChevronLeft, Slack, Activity, Smile, Sparkles } from 'lucide-react';

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
const currentStep = 2;

const tips = [
  'Follow up with investors within 48 hours.',
  'Update your LinkedIn before outreach.',
  'Check new grants for your sector.',
  'Keep your pitch deck to 10 slides.',
  'Personalize every investor email.',
];

const community = [
  { icon: <Slack className="text-indigo-600" size={22} />, label: 'Join our Slack', link: '#' },
  { icon: <MessageCircle className="text-green-600" size={22} />, label: 'Ask a Mentor', link: '#' },
  { icon: <Smile className="text-yellow-500" size={22} />, label: 'Share Your Win', link: '#' },
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

const DashboardPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-10 space-y-12 animate-fade-in" data-aos="fade-in">
    {/* Quick Actions Panel */}
    <div className="flex flex-wrap gap-4 mb-8" data-aos="fade-up" data-aos-delay="100">
      {quickActions.map((action, idx) => (
        <a key={idx} href={action.link} className="flex items-center gap-2 bg-white shadow rounded-xl px-5 py-3 font-medium text-gray-800 hover:bg-blue-50 transition-all border border-gray-100 group animate-pulse hover:animate-none">
          <span className="transition-transform group-hover:scale-110 group-hover:animate-pulse">{action.icon}</span> {action.label}
        </a>
      ))}
    </div>

    {/* Greeting Block */}
    <div className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl rounded-3xl p-10 mb-6 flex flex-col items-center gap-4" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)'}} data-aos="fade-down" data-aos-delay="200">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-blue-900 flex items-center gap-2">Hi there <span className="animate-bounce">👋</span> Welcome to Aarly — your early-stage startup support system.</h2>
      <p className="text-gray-700 mb-4 text-lg">Here you can manage your saved investors, explore funding blocks, and access tools to build your startup right.</p>
      <a href="/funding/vc" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all group">
        <span className="transition-transform group-hover:scale-110 group-hover:animate-pulse">Browse All Funding Options</span> <ArrowRight size={18} className="transition-transform group-hover:scale-110 group-hover:animate-pulse" />
      </a>
    </div>

    {/* Progress Steps */}
    <div className="mb-10" data-aos="fade-up" data-aos-delay="250">
      <div className="flex items-center justify-center gap-2 mb-2">
        {progressSteps.map((step, idx) => (
          <React.Fragment key={step}>
            <div className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold text-sm shadow-sm border transition-all duration-200 ${idx <= currentStep ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-200'}`}>{step}</div>
            {idx < progressSteps.length - 1 && <ChevronRight size={20} className="text-blue-300" />}
          </React.Fragment>
        ))}
      </div>
      <div className="w-full max-w-xl mx-auto h-2 bg-blue-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse" style={{width: `${((currentStep+1)/progressSteps.length)*100}%`}}></div>
      </div>
    </div>

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

    {/* Upcoming Deadlines & Events */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
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
      {/* Progress Tracker */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-blue-900">Founder Progress Tracker</h3>
        <div className="flex flex-col gap-3">
          {progressSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 transition-all duration-200">
              <div className={`h-7 w-7 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${idx < currentStep ? 'bg-green-100 border-green-400' : idx === currentStep ? 'bg-blue-100 border-blue-500 shadow-lg shadow-blue-200 animate-pulse' : 'bg-gray-100 border-gray-300'}`}>
                {idx < currentStep ? <CheckCircle className="text-green-500 transition-all duration-200" size={18} /> : idx === currentStep ? <ChevronRight className="text-blue-500 animate-bounce" size={18} /> : <ChevronLeft className="text-gray-400" size={18} />}
              </div>
              <span className={`text-base transition-all duration-200 ${idx < currentStep ? 'text-green-700' : idx === currentStep ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Personalized Tips & Community */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4 text-blue-900">Personalized Tips</h3>
        <ul className="space-y-2">
          {tips.map((tip, idx) => (
            <li key={idx} className="bg-blue-50 rounded-lg px-4 py-2 text-blue-800 text-sm flex items-center gap-2 group transition-all hover:shadow-md hover:bg-blue-100">
              <Lightbulb size={16} className="group-hover:animate-pulse transition-transform" /> {tip}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4 text-blue-900">Community & Support</h3>
        <div className="flex flex-wrap gap-3">
          {community.map((c, idx) => (
            <a key={idx} href={c.link} className="flex items-center gap-2 bg-white shadow rounded-lg px-4 py-2 text-gray-800 hover:bg-blue-50 border border-gray-100 font-medium transition-transform hover:scale-105 hover:shadow-lg">
              {c.icon} {c.label}
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* Recent Activity & Founder Spotlights */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4 text-blue-900">Recent Activity</h3>
        <ul className="space-y-2">
          {recentActivity.map((a, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-700 bg-white rounded-lg px-4 py-2 border border-gray-100 group transition-all fade-in-up" style={{animationDelay: `${idx * 80}ms`}}>
              <span className="transition-transform group-hover:scale-110 group-hover:animate-pulse">{a.icon}</span> {a.text}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4 text-blue-900">Founder Spotlights</h3>
        <div className="space-y-4">
          {successStories.map((s, idx) => (
            <div key={idx} className="bg-gradient-to-br from-yellow-50 via-white to-blue-50 rounded-xl shadow p-5 flex flex-col gap-2 border border-gray-100">
              <div className="flex items-center gap-3">
                <Smile className="text-yellow-500" size={24} />
                <span className="font-semibold text-blue-900 text-lg">{s.name}</span>
              </div>
              <div className="italic text-gray-700">“{s.quote}”</div>
              <div className="text-sm text-gray-500">— {s.founder}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPage; 