import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from './components/layout/HomeLayout';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import IncubatorDetailPage from './pages/IncubatorDetailPage';
import IncubatorsPage from './pages/IncubatorsPage';
import AcceleratorsPage from './pages/AcceleratorsPage';
import AcceleratorDetailPage from './pages/AcceleratorDetailPage';
import MicroVCsPage from './pages/MicroVCsPage';
import MicroVCDetailPage from './pages/MicroVCDetailPage';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './components/layout/DashboardLayout';
import FundingLayout from './components/layout/FundingLayout';
import DashboardPage from './pages/DashboardPage';
import VCFundingPage from './pages/funding/VCFundingPage';
import MicroVCFundingPage from './pages/funding/MicroVCFundingPage';
import IncubatorFundingPage from './pages/funding/IncubatorFundingPage';
import AcceleratorFundingPage from './pages/funding/AcceleratorFundingPage';
import AngelFundingPage from './pages/funding/AngelFundingPage';
import GrantsFundingPage from './pages/funding/GrantsFundingPage';
import FinNewzPage from './pages/FinNewzPage';
import InvestorMatchPage from './pages/InvestorMatchPage';
import AdminSignInPage from './pages/AdminSignInPage';
import AdminPanelPage from './pages/AdminPanelPage';
import ContentComingSoonPage from './pages/ContentComingSoonPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import DisclaimerPage from './pages/DisclaimerPage';

const NotFound = () => (
  <div style={{ padding: 40, textAlign: 'center' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="p-10 rounded-2xl shadow-xl bg-gradient-to-br from-blue-100 via-white to-indigo-100 border-0">
      <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">{title}</h1>
      <p className="text-lg text-gray-700 text-center">🚀 Coming Soon!<br/>This section will be available soon.</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <AuthPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'terms-of-service', element: <TermsOfServicePage /> },
      { path: 'disclaimer', element: <DisclaimerPage /> },
    ]
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'incubators', element: <IncubatorsPage /> },
      { path: 'incubators/:id', element: <IncubatorDetailPage /> },
      { path: 'accelerators', element: <AcceleratorsPage /> },
      { path: 'accelerators/:id', element: <AcceleratorDetailPage /> },
      { path: 'microvcs', element: <MicroVCsPage /> },
      { path: 'microvcs/:id', element: <MicroVCDetailPage /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout><DashboardPage /></DashboardLayout>,
  },
  {
    path: '/funding',
    element: <FundingLayout><Placeholder title="Funding" /></FundingLayout>,
    children: [
      { path: 'vc', element: <MicroVCsPage /> },
      { path: 'microvc', element: <MicroVCsPage /> },
      { path: 'incubator', element: <IncubatorsPage /> },
      { path: 'accelerator', element: <AcceleratorsPage /> },
      { path: 'angel', element: <MicroVCsPage /> },
      { path: 'grants', element: <IncubatorsPage /> },
    ]
  },
  {
    path: '/finnewz',
    element: <DashboardLayout><FinNewzPage /></DashboardLayout>,
  },
  {
    path: '/investor-match',
    element: <DashboardLayout><InvestorMatchPage /></DashboardLayout>,
  },
  {
    path: '/content',
    element: <DashboardLayout><ContentComingSoonPage /></DashboardLayout>,
  },
  // {
  //   path: '/admin-signin',
  //   element: <AdminSignInPage />,
  // },
  // {
  //   path: '/admin',
  //   element: <AdminPanelPage />,
  // },
]);
