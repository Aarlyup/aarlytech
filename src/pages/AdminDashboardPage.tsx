import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
  AlertCircle,
  X,
  Upload
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
  const [activeTab, setActiveTab] = useState<'investor-match' | 'news' | 'contacts'>('investor-match');
  const [loading, setLoading] = useState(false);

  // Investor Match State
  const [investorMatches, setInvestorMatches] = useState<InvestorMatch[]>([]);
  const [showInvestorForm, setShowInvestorForm] = useState(false);
  const [editingInvestor, setEditingInvestor] = useState<InvestorMatch | null>(null);
  const [investorForm, setInvestorForm] = useState({
    name: '',
    stage: '',
    industry: '',
    traction: '',
    description: '',
    checkSize: '',
    location: '',
    website: '',
    email: '',
    linkedin: ''
  });

  // News State
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    description: '',
    category: 'Funding',
    isPublished: true
  });
  const [newsImage, setNewsImage] = useState<File | null>(null);

  // Contact State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Load data when component mounts or tab changes
  useEffect(() => {
    loadData();
  }, [activeTab]);

  // Reset forms when editing changes
  useEffect(() => {
    if (editingInvestor) {
      setInvestorForm({
        name: editingInvestor.name || '',
        stage: editingInvestor.stage || '',
        industry: editingInvestor.industry || '',
        traction: editingInvestor.traction || '',
        description: editingInvestor.description || '',
        checkSize: editingInvestor.checkSize || '',
        location: editingInvestor.location || '',
        website: editingInvestor.website || '',
        email: editingInvestor.email || '',
        linkedin: editingInvestor.linkedin || ''
      });
    } else {
      setInvestorForm({
        name: '',
        stage: '',
        industry: '',
        traction: '',
        description: '',
        checkSize: '',
        location: '',
        website: '',
        email: '',
        linkedin: ''
      });
    }
  }, [editingInvestor]);

  useEffect(() => {
    if (editingNews) {
      setNewsForm({
        title: editingNews.title || '',
        description: editingNews.description || '',
        category: editingNews.category || 'Funding',
        isPublished: editingNews.isPublished ?? true
      });
    } else {
      setNewsForm({
        title: '',
        description: '',
        category: 'Funding',
        isPublished: true
      });
    }
    setNewsImage(null);
  }, [editingNews]);

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

  // Investor Match Functions
  const handleInvestorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingInvestor 
        ? `${API_URL}/admin/investor-matches/${editingInvestor._id}`
        : `${API_URL}/admin/investor-matches`;
      
      const method = editingInvestor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(investorForm),
      });

      const data = await response.json();
      if (data.success) {
        await loadInvestorMatches();
        setShowInvestorForm(false);
        setEditingInvestor(null);
      } else {
        alert(data.message || 'Failed to save investor match');
      }
    } catch (error) {
      console.error('Error saving investor match:', error);
      alert('Failed to save investor match');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInvestor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this investor match?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/investor-matches/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        await loadInvestorMatches();
      } else {
        alert(data.message || 'Failed to delete investor match');
      }
    } catch (error) {
      console.error('Error deleting investor match:', error);
      alert('Failed to delete investor match');
    } finally {
      setLoading(false);
    }
  };

  // News Functions
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsImage && !editingNews) {
      alert('Please select an image');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', newsForm.title);
      formData.append('description', newsForm.description);
      formData.append('category', newsForm.category);
      formData.append('isPublished', newsForm.isPublished.toString());
      
      if (newsImage) {
        formData.append('image', newsImage);
      }

      const url = editingNews 
        ? `${API_URL}/admin/news/${editingNews._id}`
        : `${API_URL}/admin/news`;
      
      const method = editingNews ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        await loadNews();
        setShowNewsForm(false);
        setEditingNews(null);
      } else {
        alert(data.message || 'Failed to save news');
      }
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Failed to save news');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/news/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        await loadNews();
      } else {
        alert(data.message || 'Failed to delete news');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Failed to delete news');
    } finally {
      setLoading(false);
    }
  };

  // Contact Functions
  const handleReplyToContact = async (contactId: string) => {
    if (!replyMessage.trim()) return;

    setLoading(true);
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
      } else {
        alert(data.message || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact message?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/contacts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        await loadContacts();
      } else {
        alert(data.message || 'Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    } finally {
      setLoading(false);
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
                          onClick={() => {
                            setEditingInvestor(investor);
                            setShowInvestorForm(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteInvestor(investor._id)}
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingNews(item);
                            setShowNewsForm(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteNews(item._id)}
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteContact(contact._id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Investor Form Modal */}
        {showInvestorForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {editingInvestor ? 'Edit Investor Match' : 'Add New Investor Match'}
                </h3>
                <button
                  onClick={() => {
                    setShowInvestorForm(false);
                    setEditingInvestor(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleInvestorSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={investorForm.name}
                      onChange={(e) => setInvestorForm({...investorForm, name: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                    <select
                      value={investorForm.stage}
                      onChange={(e) => setInvestorForm({...investorForm, stage: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">Select Stage</option>
                      <option value="Pre-Seed">Pre-Seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Series A">Series A</option>
                      <option value="Series B">Series B</option>
                      <option value="Series C+">Series C+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <input
                      type="text"
                      value={investorForm.industry}
                      onChange={(e) => setInvestorForm({...investorForm, industry: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Traction</label>
                    <select
                      value={investorForm.traction}
                      onChange={(e) => setInvestorForm({...investorForm, traction: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">Select Traction</option>
                      <option value="Idea">Idea</option>
                      <option value="MVP">MVP</option>
                      <option value="Users">Users</option>
                      <option value="Revenue">Revenue</option>
                      <option value="Profitable">Profitable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check Size</label>
                    <input
                      type="text"
                      value={investorForm.checkSize}
                      onChange={(e) => setInvestorForm({...investorForm, checkSize: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={investorForm.location}
                      onChange={(e) => setInvestorForm({...investorForm, location: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      value={investorForm.website}
                      onChange={(e) => setInvestorForm({...investorForm, website: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={investorForm.email}
                      onChange={(e) => setInvestorForm({...investorForm, email: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    <input
                      type="url"
                      value={investorForm.linkedin}
                      onChange={(e) => setInvestorForm({...investorForm, linkedin: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={investorForm.description}
                    onChange={(e) => setInvestorForm({...investorForm, description: e.target.value})}
                    className="w-full p-2 border rounded-lg h-24"
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowInvestorForm(false);
                      setEditingInvestor(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : editingInvestor ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* News Form Modal */}
        {showNewsForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {editingNews ? 'Edit News' : 'Add New News'}
                </h3>
                <button
                  onClick={() => {
                    setShowNewsForm(false);
                    setEditingNews(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleNewsSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({...newsForm, category: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Funding">Funding</option>
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Market">Market</option>
                    <option value="Policy">Policy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewsImage(e.target.files?.[0] || null)}
                    className="w-full p-2 border rounded-lg"
                    required={!editingNews}
                  />
                  {editingNews && (
                    <p className="text-sm text-gray-500 mt-1">Leave empty to keep current image</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newsForm.description}
                    onChange={(e) => setNewsForm({...newsForm, description: e.target.value})}
                    className="w-full p-2 border rounded-lg h-32"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={newsForm.isPublished}
                    onChange={(e) => setNewsForm({...newsForm, isPublished: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                    Publish immediately
                  </label>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowNewsForm(false);
                      setEditingNews(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : editingNews ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                  disabled={!replyMessage.trim() || loading}
                >
                  {loading ? 'Sending...' : 'Send Reply'}
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
