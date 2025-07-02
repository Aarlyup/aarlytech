import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelector from '../components/admin/CategorySelector';
import AdminFundingCardGrid from '../components/admin/AdminFundingCardGrid';
import AdminFundingCardForm from '../components/admin/AdminFundingCardForm';
import AdminFundingModal from '../components/admin/AdminFundingModal';
import { adminMockFunding } from '../constants/adminMockFunding';

const categories = ['angels', 'vcs', 'microvcs', 'incubators', 'accelerators', 'grants'] as const;
type Category = typeof categories[number];

type FundingMap = typeof adminMockFunding;

type FundingCard = FundingMap[Category][number];

const AdminPanelPage: React.FC = () => {
  const [category, setCategory] = useState<Category>('angels');
  const [cards, setCards] = useState<FundingCard[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCard, setEditCard] = useState<FundingCard | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin-signin');
    }
  }, [navigate]);

  useEffect(() => {
    setCards([...adminMockFunding[category]]);
  }, [category]);

  const handleAdd = () => {
    setEditCard(null);
    setModalMode('add');
    setModalOpen(true);
  };

  const handleEdit = (card: FundingCard) => {
    setEditCard(card);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const handleModalSubmit = (data: any) => {
    if (modalMode === 'add') {
      setCards([...cards, { ...data, id: Date.now().toString() }]);
    } else if (modalMode === 'edit' && editCard) {
      setCards(cards.map((c) => (c.id === editCard.id ? { ...c, ...data } : c)));
    }
    setModalOpen(false);
    setEditCard(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Admin Panel: Funding Cards</h2>
        <CategorySelector
          selected={category}
          onSelect={(key) => {
            if (categories.includes(key as Category)) setCategory(key as Category);
          }}
        />
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            + Add New
          </button>
        </div>
        <AdminFundingCardGrid
          cards={cards}
          onEdit={handleEdit}
          onDelete={handleDelete}
          category={category}
        />
        <AdminFundingModal
          open={modalOpen}
          title={modalMode === 'add' ? `Add New ${category.slice(0, -1).replace(/^[a-z]/, (c) => c.toUpperCase())}` : 'Edit Card'}
          onClose={() => setModalOpen(false)}
        >
          <AdminFundingCardForm
            category={category}
            initialData={modalMode === 'edit' ? editCard : undefined}
            onSubmit={handleModalSubmit}
            onCancel={() => setModalOpen(false)}
          />
        </AdminFundingModal>
      </div>
    </div>
  );
};

export default AdminPanelPage; 