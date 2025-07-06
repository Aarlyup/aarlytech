import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

interface FundingItem {
  _id: string;
  name: string;
  [key: string]: any;
}

interface FundingManagementProps {
  category: string;
}

const categoryLabels: Record<string, string> = {
  'angel-investors': 'Angel Investors',
  'venture-capital': 'Venture Capital',
  'micro-vcs': 'Micro VCs',
  'incubators': 'Incubators',
  'accelerators': 'Accelerators',
  'govt-grants': 'Government Grants'
};

const categoryFields: Record<string, { name: string; label: string; type?: string; required?: boolean }[]> = {
  'angel-investors': [
    { name: 'name', label: 'Name', required: true },
    { name: 'linkedinProfileUrl', label: 'LinkedIn Profile URL' },
    { name: 'city', label: 'City', required: true },
    { name: 'country', label: 'Country', required: true },
    { name: 'investCategory', label: 'Investment Categories (comma separated)' },
    { name: 'ticketSize', label: 'Ticket Size', type: 'number', required: true },
    { name: 'stage', label: 'Stages (comma separated)' },
    { name: 'preferFounderProfile', label: 'Preferred Founder Profile' },
    { name: 'portfolioHighlights', label: 'Portfolio Highlights' },
    { name: 'contact', label: 'Contact', required: true }
  ],
  'venture-capital': [
    { name: 'name', label: 'Name', required: true },
    { name: 'websiteUrl', label: 'Website URL' },
    { name: 'headOffice', label: 'Head Office', required: true },
    { name: 'fundSize', label: 'Fund Size', type: 'number', required: true },
    { name: 'stageFocus', label: 'Stage Focus (comma separated)' },
    { name: 'sectorFocus', label: 'Sector Focus (comma separated)' },
    { name: 'avgTicketSize', label: 'Average Ticket Size', type: 'number', required: true },
    { name: 'applicationProcess', label: 'Application Process' },
    { name: 'contact', label: 'Contact', required: true },
    { name: 'portfolioHighlights', label: 'Portfolio Highlights' },
    { name: 'investmentThesis', label: 'Investment Thesis' }
  ],
  'micro-vcs': [
    { name: 'name', label: 'Name', required: true },
    { name: 'websiteUrl', label: 'Website URL' },
    { name: 'location', label: 'Location', required: true },
    { name: 'fundSize', label: 'Fund Size', type: 'number', required: true },
    { name: 'checkSize', label: 'Check Size', type: 'number', required: true },
    { name: 'stage', label: 'Stages (comma separated)' },
    { name: 'sector', label: 'Sectors (comma separated)' },
    { name: 'contact', label: 'Contact', required: true },
    { name: 'portfolioHighlights', label: 'Portfolio Highlights' }
  ],
  'incubators': [
    { name: 'name', label: 'Name', required: true },
    { name: 'websiteUrl', label: 'Website URL' },
    { name: 'location', label: 'Location', required: true },
    { name: 'fundingSupport', label: 'Funding Support', required: true },
    { name: 'otherBenefits', label: 'Other Benefits' },
    { name: 'eligibility', label: 'Eligibility', required: true },
    { name: 'applicationProcess', label: 'Application Process' },
    { name: 'contact', label: 'Contact', required: true },
    { name: 'alumniStartups', label: 'Alumni Startups' }
  ],
  'accelerators': [
    { name: 'name', label: 'Name', required: true },
    { name: 'websiteUrl', label: 'Website URL' },
    { name: 'hq', label: 'Headquarters', required: true },
    { name: 'batchFrequency', label: 'Batch Frequency', required: true },
    { name: 'stage', label: 'Stages (comma separated)' },
    { name: 'fundingOffered', label: 'Funding Offered', required: true },
    { name: 'programDuration', label: 'Program Duration', required: true },
    { name: 'servicesProvided', label: 'Services Provided' },
    { name: 'sectors', label: 'Sectors (comma separated)' },
    { name: 'applicationLink', label: 'Application Link' },
    { name: 'pastCohorts', label: 'Past Cohorts' }
  ],
  'govt-grants': [
    { name: 'name', label: 'Name', required: true },
    { name: 'authority', label: 'Authority', required: true },
    { name: 'stage', label: 'Stages (comma separated)' },
    { name: 'sector', label: 'Sector' },
    { name: 'grantSize', label: 'Grant Size', type: 'number', required: true },
    { name: 'equityDilution', label: 'Equity Dilution' },
    { name: 'eligibility', label: 'Eligibility', required: true },
    { name: 'howToApply', label: 'How to Apply', required: true },
    { name: 'timelines', label: 'Timelines', required: true },
    { name: 'contact', label: 'Contact', required: true },
    { name: 'documentsRequired', label: 'Documents Required (comma separated)' },
    { name: 'specialNotes', label: 'Special Notes' }
  ]
};

const FundingManagement: React.FC<FundingManagementProps> = ({ category }) => {
  const [items, setItems] = useState<FundingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FundingItem | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [search, setSearch] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    loadItems();
  }, [category]);

  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/funding/admin/${category}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setItems(data.data);
      }
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Process array fields
      const processedData = { ...formData };
      const fields = categoryFields[category] || [];
      
      fields.forEach(field => {
        if (field.name.includes('stage') || field.name.includes('sector') || 
            field.name.includes('Category') || field.name.includes('Focus') ||
            field.name.includes('documentsRequired')) {
          if (processedData[field.name] && typeof processedData[field.name] === 'string') {
            processedData[field.name] = processedData[field.name].split(',').map((s: string) => s.trim()).filter(Boolean);
          }
        }
      });

      const url = editingItem 
        ? `${API_URL}/funding/admin/${category}/${editingItem._id}`
        : `${API_URL}/funding/admin/${category}`;
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(processedData),
      });

      const data = await response.json();
      
      if (data.success) {
        await loadItems();
        setShowForm(false);
        setEditingItem(null);
        setFormData({});
      } else {
        alert(data.message || 'Error saving item');
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: FundingItem) => {
    setEditingItem(item);
    
    // Convert arrays back to comma-separated strings for form
    const formattedData = { ...item };
    const fields = categoryFields[category] || [];
    
    fields.forEach(field => {
      if (field.name.includes('stage') || field.name.includes('sector') || 
          field.name.includes('Category') || field.name.includes('Focus') ||
          field.name.includes('documentsRequired')) {
        if (Array.isArray(formattedData[field.name])) {
          formattedData[field.name] = formattedData[field.name].join(', ');
        }
      }
    });
    
    setFormData(formattedData);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/funding/admin/${category}/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.success) {
        await loadItems();
      } else {
        alert(data.message || 'Error deleting item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const filteredItems = items.filter(item =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  const fields = categoryFields[category] || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {categoryLabels[category] || 'Funding Items'}
        </h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({});
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Items List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No items found. Click "Add New" to create one.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <div key={item._id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.location || item.city || item.headOffice || item.hq || 'N/A'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingItem ? 'Edit' : 'Add'} {categoryLabels[category]}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.name.includes('description') || field.name.includes('highlights') || 
                     field.name.includes('notes') || field.name.includes('eligibility') ||
                     field.name.includes('benefits') || field.name.includes('services') ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <input
                        type={field.type || 'text'}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                ))}
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                      setFormData({});
                    }}
                    className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingManagement;