import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { ArrowRight, User } from 'lucide-react';

const demoInvestors = [
  { name: 'Blue Ocean Ventures', stage: 'Seed', industry: 'Fintech', traction: 'MVP', history: 'Invested in early-stage fintech startups with MVP.' },
  { name: 'GrowthX Capital', stage: 'Series A', industry: 'Healthtech', traction: 'Revenue', history: 'Prefers healthtech startups with revenue.' },
  { name: 'Angel Syndicate', stage: 'Pre-Seed', industry: 'Edtech', traction: 'Idea', history: 'Backs edtech founders at idea stage.' },
  { name: 'NextGen Angels', stage: 'Seed', industry: 'Fintech', traction: 'Users', history: 'Invests in fintech with user traction.' },
];

const stages = ['Pre-Seed', 'Seed', 'Series A'];
const industries = ['Fintech', 'Healthtech', 'Edtech'];
const tractions = ['Idea', 'MVP', 'Users', 'Revenue'];

const InvestorMatchPage: React.FC = () => {
  const [form, setForm] = useState({ stage: '', industry: '', traction: '' });
  const [matches, setMatches] = useState<typeof demoInvestors>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = demoInvestors.filter(inv =>
      (form.stage && inv.stage === form.stage) ||
      (form.industry && inv.industry === form.industry) ||
      (form.traction && inv.traction === form.traction)
    );
    setMatches(filtered);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-2">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-900">Investor Match</h1>
      <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/70 border border-blue-100 shadow-2xl rounded-3xl w-full max-w-lg p-10 flex flex-col gap-6 mb-10" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)'}}>
        <div>
          <label className="block text-blue-900 font-semibold mb-2 text-lg">Stage</label>
          <select name="stage" value={form.stage} onChange={handleChange} className="block w-full border border-blue-200 rounded-xl p-3 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80">
            <option value="">Select Stage</option>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-blue-900 font-semibold mb-2 text-lg">Industry</label>
          <select name="industry" value={form.industry} onChange={handleChange} className="block w-full border border-blue-200 rounded-xl p-3 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80">
            <option value="">Select Industry</option>
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-blue-900 font-semibold mb-2 text-lg">Traction</label>
          <select name="traction" value={form.traction} onChange={handleChange} className="block w-full border border-blue-200 rounded-xl p-3 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80">
            <option value="">Select Traction</option>
            {tractions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <Button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold text-lg py-3 rounded-xl shadow-lg hover:from-amber-500 hover:to-amber-600 transition-all">
          Find Investors <ArrowRight size={18} />
        </Button>
      </form>
      <div className="w-full max-w-lg">
        {matches.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center">Matched Investors</h2>
            <ul className="space-y-5">
              {matches.map(inv => (
                <li key={inv.name} className="p-5 bg-white/80 border border-blue-100 rounded-2xl shadow flex flex-col gap-1">
                  <div className="flex items-center gap-3 mb-1">
                    <User size={24} className="text-blue-500" />
                    <span className="font-bold text-lg text-blue-900">{inv.name}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">Stage: <span className="font-semibold text-blue-700">{inv.stage}</span> | Industry: <span className="font-semibold text-blue-700">{inv.industry}</span> | Traction: <span className="font-semibold text-blue-700">{inv.traction}</span></div>
                  <div className="text-gray-600 text-sm">{inv.history}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-gray-400 text-center text-base">No matches yet. Fill the form and click Find Investors.</div>
        )}
      </div>
    </div>
  );
};

export default InvestorMatchPage; 