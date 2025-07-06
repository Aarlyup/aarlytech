import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Newspaper, 
  MessageCircle, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Reply,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';

interface InvestorMatch {
  _id: string;
  name: string;
  stage: string;
  industry: string;
  traction: string;
  description: string;
  checkSize: string;
  location: string;
  website?: string;
  email?: string;
  linkedin?: string;
}

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
    publicId: string;
  };
  category: string;
  isPublished: boolean;
  publishedAt: string;
  author: {
    name: string;
    email: string;
  };
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high';
  replies: Array<{
    message: string;
    sentAt: string;
    sentBy: {
      name: string;
      email: string;
    };
  }>;
  createdAt: string;
}

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'investor-match' | 'news' | 'contacts'>('investor-match');
  const [loading, setLoading] = useState(false);

  // Investor Match State
  const [investorMatches, setInvestorMatches] = useState<InvestorMatch[]>([]);
  const [showInvestorForm, setShowInvestorForm] = useState(false);
  const [editingInvestor, setEditingInvestor] = useState<InvestorMatch | null>(null);

  // News State
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  // Contact State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // This check will be done on the backend, but we can add a basic check here
    const adminEmails = ['admin@aarly.co', 'founder@aarly.co']; // This should come from backend
    if (!adminEmails.includes(user.email.toLowerCase())) {
      navigate('/dashboard');
      return;
    }

    loadData();
  }, [user, navigate, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'investor-match') {
        await loadInvestorMatches();
      } else if (activeTab === 'news') {
        await loadNews();
      } else if (activeTab === 'contacts') {
        await loadContacts();
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadInvestorMatches = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/investor-matches`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setInvestorMatches(data.data);
      }
    } catch (error) {
      console.error('Error loading investor matches:', error);
    }
  };

  const loadNews = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/news`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setNews(data.data);
      }
    } catch (error) {
      console.error('Error loading news:', error);
    }
  };

  const loadContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/contacts`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const handleReplyToContact = async (contactId: string) => {
    if (!replyMessage.trim()) return;

    try {
      const response = await fetch(`${API_URL}/admin/contacts/reply/${contactId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message: replyMessage }),
      });

      const data = await response.json();
      if (data.success) {
        setReplyMessage('');
        setSelectedContact(null);
        await loadContacts();
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('investor-match')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'investor-match'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="w-5 h-5 inline mr-2" />
                Investor Match
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'news'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Newspaper className="w-5 h-5 inline mr-2" />
                Fin'Newz
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contacts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageCircle className="w-5 h-5 inline mr-2" />
                Contacts
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Investor Match Tab */}
          {activeTab === 'investor-match' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Investor Matches</h2>
                <Button onClick={() => setShowInvestorForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Investor
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {investorMatches.map((investor) => (
                    <div key={investor._id} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">{investor.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600 mb-4">
                        <p><span className="font-medium">Stage:</span> {investor.stage}</p>
                        <p><span className="font-medium">Industry:</span> {investor.industry}</p>
                        <p><span className="font-medium">Traction:</span> {investor.traction}</p>
                        <p><span className="font-medium">Check Size:</span> {investor.checkSize}</p>
                        <p><span className="font-medium">Location:</span> {investor.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingInvestor(investor)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Fin'Newz Management</h2>
                <Button onClick={() => setShowNewsForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add News
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4 flex gap-4">
                      <img
                        src={item.image.url}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.isPublished ? 'Published' : 'Draft'}
                          </span>
                          <span>{item.category}</span>
                          <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingNews(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Contact Messages</h2>

              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{contact.name}</h3>
                          <p className="text-gray-600">{contact.email}</p>
                          <p className="text-sm text-gray-500">{contact.subject}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(contact.status)}`}>
                            {contact.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(contact.priority)}`}>
                            {contact.priority}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{contact.message}</p>
                      
                      {contact.replies.length > 0 && (
                        <div className="bg-gray-50 rounded p-3 mb-4">
                          <h4 className="font-medium text-sm mb-2">Replies:</h4>
                          {contact.replies.map((reply, index) => (
                            <div key={index} className="text-sm mb-2">
                              <p className="text-gray-700">{reply.message}</p>
                              <p className="text-gray-500 text-xs">
                                By {reply.sentBy.name} on {new Date(reply.sentAt).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedContact(contact)}
                        >
                          <Reply className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                        {contact.status !== 'closed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Close
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reply Modal */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                Reply to {selectedContact.name}
              </h3>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply..."
                className="w-full h-32 p-3 border rounded-lg resize-none"
              />
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => handleReplyToContact(selectedContact._id)}
                  disabled={!replyMessage.trim()}
                >
                  Send Reply
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedContact(null);
                    setReplyMessage('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;