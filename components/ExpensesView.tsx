import React, { useState } from 'react';
import { Receipt, Plus, Trash2, Calendar, Tag, CreditCard, X, TrendingUp, TrendingDown, Eraser, Filter, HandCoins } from 'lucide-react';
import { Expense } from '../types';

interface ExpensesViewProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onClearLedger: () => void;
  businessType: string;
  isDark: boolean;
  compactMode?: boolean;
  currency: string;
}

const ExpensesView: React.FC<ExpensesViewProps> = ({ expenses, onAddExpense, onClearLedger, businessType, isDark, compactMode, currency }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'incoming' | 'outgoing'>('all');
  const [newEntry, setNewEntry] = useState({
    category: 'Sales',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'incoming' as 'incoming' | 'outgoing'
  });

  const isCafe = businessType.toLowerCase().includes('cafe') || businessType.toLowerCase().includes('coffee');
  
  const categories = isCafe 
    ? (newEntry.type === 'incoming' ? ['Counter Sales', 'Wholesale', 'Catering', 'Tips'] : ['Coffee Beans', 'Dairy Supply', 'Packaging', 'Rent', 'Wages', 'Utilities'])
    : ['Sales', 'Service', 'Commission', 'Rent', 'Raw Stock', 'Shipping', 'Taxes', 'Fixed Assets'];

  const filtered = expenses.filter(e => activeTab === 'all' || e.type === activeTab);
  const incomeTotal = expenses.filter(e => e.type === 'incoming').reduce((a, b) => a + b.amount, 0);
  const expenseTotal = expenses.filter(e => e.type === 'outgoing').reduce((a, b) => a + b.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExpense(newEntry);
    setIsModalOpen(false);
    setNewEntry({ ...newEntry, amount: 0, description: '' });
  };

  const px = compactMode ? 'px-4' : 'px-8';
  const py = compactMode ? 'py-2' : 'py-5';
  const textSize = compactMode ? 'text-[11px]' : 'text-sm';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className={`${compactMode ? 'text-xl' : 'text-3xl'} font-black tracking-tighter`}>Transaction Register</h2>
          {!compactMode && <p className="text-slate-500 font-medium text-sm">Managing cash-on-hand and business liquidity</p>}
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={onClearLedger} className="flex-1 flex items-center justify-center gap-2 bg-rose-500/10 text-rose-500 px-5 py-3 rounded-xl border border-rose-500/20 font-black text-[10px] uppercase hover:bg-rose-500 hover:text-white transition-all">
            <Eraser size={16} /> Wipe Ledger
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase shadow-xl hover:bg-indigo-700 active:scale-95 transition-all">
            <Plus size={16} /> New Record
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-[2rem] border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white shadow-sm'}`}>
          <div className="flex items-center gap-2 mb-1 text-emerald-500">
            <TrendingUp size={16} /> <span className="text-[9px] uppercase font-black tracking-widest">Incoming</span>
          </div>
          <h4 className="text-2xl font-black text-emerald-500">{currency}{incomeTotal.toLocaleString()}</h4>
        </div>
        <div className={`p-6 rounded-[2rem] border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white shadow-sm'}`}>
          <div className="flex items-center gap-2 mb-1 text-rose-500">
            <TrendingDown size={16} /> <span className="text-[9px] uppercase font-black tracking-widest">Outgoing</span>
          </div>
          <h4 className="text-2xl font-black text-rose-500">{currency}{expenseTotal.toLocaleString()}</h4>
        </div>
        <div className={`p-6 rounded-[2rem] border text-white accent-bg shadow-xl`}>
          <div className="flex items-center gap-2 mb-1 opacity-80">
             <HandCoins size={16} /> <span className="text-[9px] uppercase font-black tracking-widest">Net Flow</span>
          </div>
          <h4 className="text-2xl font-black">{currency}{(incomeTotal - expenseTotal).toLocaleString()}</h4>
        </div>
      </div>

      <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white shadow-2xl shadow-slate-200/50'} rounded-[2.5rem] border overflow-hidden`}>
        <div className="p-4 border-b flex items-center gap-3">
          <button onClick={() => setActiveTab('all')} className={`px-4 py-2 rounded-xl font-black text-[9px] uppercase transition-all ${activeTab === 'all' ? 'accent-bg text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Summary</button>
          <button onClick={() => setActiveTab('incoming')} className={`px-4 py-2 rounded-xl font-black text-[9px] uppercase transition-all ${activeTab === 'incoming' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Receipts</button>
          <button onClick={() => setActiveTab('outgoing')} className={`px-4 py-2 rounded-xl font-black text-[9px] uppercase transition-all ${activeTab === 'outgoing' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Expenditure</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={`${isDark ? 'bg-slate-800/30' : 'bg-slate-50'} border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <th className={`${px} py-4 text-[9px] font-black uppercase text-slate-400 tracking-widest`}>Transaction</th>
                <th className={`${px} py-4 text-[9px] font-black uppercase text-slate-400 tracking-widest`}>Mode</th>
                <th className={`${px} py-4 text-[9px] font-black uppercase text-slate-400 tracking-widest`}>Amount</th>
                <th className={`${px} py-4 text-[9px] font-black uppercase text-slate-400 text-right tracking-widest`}>Timestamp</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                  <td className={`${px} ${py}`}>
                    <div className="flex flex-col">
                      <span className={`font-black ${textSize}`}>{e.description}</span>
                      <span className="text-[8px] uppercase font-black text-slate-400 tracking-wider">{e.category}</span>
                    </div>
                  </td>
                  <td className={`${px} ${py}`}>
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${e.type === 'incoming' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                      {e.type}
                    </span>
                  </td>
                  <td className={`${px} ${py}`}>
                    <span className={`font-black ${textSize} ${e.type === 'incoming' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {e.type === 'incoming' ? '+' : '-'}{currency}{e.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className={`${px} ${py} text-right text-[9px] font-black text-slate-400`}>
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-24 text-center opacity-20">
               <Receipt size={48} className="mx-auto mb-2" />
               <p className="text-[10px] font-black uppercase tracking-widest">Ledger Clear</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'} rounded-[3rem] w-full max-w-lg p-10 shadow-2xl border`}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black">Record Entry</h3>
              <X className="cursor-pointer text-slate-400 hover:text-rose-500" onClick={() => setIsModalOpen(false)} />
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                <button type="button" onClick={() => setNewEntry({...newEntry, type:'incoming', category: categories[0]})} className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${newEntry.type === 'incoming' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}>INCOME</button>
                <button type="button" onClick={() => setNewEntry({...newEntry, type:'outgoing', category: categories[0]})} className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${newEntry.type === 'outgoing' ? 'bg-rose-500 text-white' : 'text-slate-400'}`}>EXPENDITURE</button>
              </div>
              <div>
                 <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block ml-1">Memo</label>
                 <input required type="text" placeholder="Transaction Details" value={newEntry.description} onChange={e => setNewEntry({...newEntry, description: e.target.value})} className="w-full p-4 border-2 rounded-2xl outline-none font-bold text-slate-800" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block ml-1">Valuation ({currency})</label>
                  <input required type="number" step="0.01" value={newEntry.amount} onChange={e => setNewEntry({...newEntry, amount: parseFloat(e.target.value) || 0})} className="w-full p-4 border-2 rounded-2xl font-bold text-slate-800" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block ml-1">Domain</label>
                  <select value={newEntry.category} onChange={e => setNewEntry({...newEntry, category: e.target.value})} className="w-full p-4 border-2 rounded-2xl font-bold text-slate-800 outline-none">
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className={`w-full py-5 rounded-[1.5rem] font-black uppercase text-white shadow-2xl active:scale-95 transition-all ${newEntry.type === 'incoming' ? 'bg-emerald-600' : 'bg-rose-600'}`}>Finalize Transaction</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesView;