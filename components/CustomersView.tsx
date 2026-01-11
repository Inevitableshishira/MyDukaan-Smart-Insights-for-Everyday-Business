import React, { useState } from 'react';
import { Users, Search, Plus, Mail, Phone, Calendar, UserPlus, X, Trash2, Eraser, UserX } from 'lucide-react';
import { Customer } from '../types';

interface CustomersViewProps {
  customers: Customer[];
  onAddCustomer: (customer: Omit<Customer, 'id'>) => void;
  onClearCustomers: () => void;
  isDark: boolean;
  compactMode?: boolean;
  currency: string;
}

const CustomersView: React.FC<CustomersViewProps> = ({ customers, onAddCustomer, onClearCustomers, isDark, compactMode, currency }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    totalSpent: 0
  });

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCustomer({ ...newCustomer, lastPurchaseDate: new Date().toISOString() });
    setIsModalOpen(false);
    setNewCustomer({ name: '', email: '', phone: '', totalSpent: 0 });
  };

  const px = compactMode ? 'px-4' : 'px-8';
  const py = compactMode ? 'py-3' : 'py-6';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-800'} tracking-tighter`}>Ecosystem Directory</h2>
          <p className="text-slate-500 font-medium text-sm">Managing relationship capital and loyalty telemetry</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={onClearCustomers}
            className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white px-6 py-4 rounded-2xl transition-all border border-rose-500/20 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:shadow-xl hover:shadow-rose-500/20"
          >
            <UserX size={18} /> Clear Ledger
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-2xl transition-all shadow-xl active:scale-95 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <UserPlus size={18} /> Register Lead
          </button>
        </div>
      </div>

      <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/40'} rounded-[3.5rem] border overflow-hidden`}>
        <div className={`p-8 border-b ${isDark ? 'border-slate-800 bg-slate-900/50' : 'bg-slate-50/50 border-slate-100'} flex flex-col md:flex-row items-center justify-between gap-6`}>
          <div className="relative flex-1 w-full max-w-lg">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Query relationships..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-14 pr-6 py-4 rounded-2xl border-2 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-800'} text-xs focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold transition-all`}
            />
          </div>
          <div className="px-6 py-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
            <span className="text-[10px] font-black accent-text uppercase tracking-[0.3em]">{customers.length} Verified Accounts</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={`${isDark ? 'bg-slate-800/30' : 'bg-slate-50/50'} border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <th className={`${px} py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]`}>Identity</th>
                <th className={`${px} py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]`}>Connectivity</th>
                <th className={`${px} py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]`}>LTV Value</th>
                <th className={`${px} py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]`}>Activity</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
              {filtered.map(c => (
                <tr key={c.id} className={`${isDark ? 'hover:bg-slate-800/20' : 'hover:bg-indigo-50/20'} transition-all group`}>
                  <td className={`${px} ${py}`}>
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center font-black text-white shadow-2xl transition-transform group-hover:rotate-6 group-hover:scale-110 ${isDark ? 'bg-slate-800' : 'bg-indigo-600'}`}>
                        {c.name.charAt(0)}
                      </div>
                      <span className={`font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-800'} ${compactMode ? 'text-sm' : 'text-xl'}`}>{c.name}</span>
                    </div>
                  </td>
                  <td className={`${px} ${py}`}>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 tracking-wider">
                        <Mail size={14} className="accent-text" /> {c.email}
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 tracking-wider">
                        <Phone size={14} className="accent-text" /> {c.phone}
                      </div>
                    </div>
                  </td>
                  <td className={`${px} ${py}`}>
                    <span className={`text-lg font-black ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{currency}{c.totalSpent.toFixed(2)}</span>
                  </td>
                  <td className={`${px} ${py}`}>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-500/5 px-4 py-2 rounded-xl inline-flex">
                      <Calendar size={14} /> {c.lastPurchaseDate ? new Date(c.lastPurchaseDate).toLocaleDateString() : 'NO ACTIVITY'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-32 text-center flex flex-col items-center gap-6 opacity-30">
               <UserX size={80} className="animate-pulse" />
               <p className="font-black text-sm uppercase tracking-[0.3em]">No Lead Data Present</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} rounded-[3.5rem] w-full max-w-lg p-12 shadow-2xl border-4 border-indigo-500/10 animate-in zoom-in-95 duration-300`}>
            <div className="flex justify-between items-center mb-10">
              <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter`}>Lead Acquisition</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all text-slate-400">
                <X size={28} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Legal Identity</label>
                  <input required type="text" value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} className={`w-full p-5 border-2 rounded-2xl ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100'} focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-lg`} placeholder="Customer Name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Terminal</label>
                    <input required type="email" value={newCustomer.email} onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} className={`w-full p-5 border-2 rounded-2xl ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100'} focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold`} placeholder="Email" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Direct Line</label>
                    <input required type="tel" value={newCustomer.phone} onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} className={`w-full p-5 border-2 rounded-2xl ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100'} focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold`} placeholder="Phone" />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-black py-6 rounded-[2rem] hover:bg-indigo-700 transition-all shadow-2xl active:scale-95 mt-6 text-xl tracking-tighter">
                Finalize Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersView;