import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Receipt, 
  Users, 
  BarChart3,
  TrendingUp,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
  isDark: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, isDark, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Console', icon: <LayoutDashboard size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={20} /> },
    { id: 'sales', label: 'Express POS', icon: <ShoppingCart size={20} /> },
    { id: 'expenses', label: 'Expenses', icon: <Receipt size={20} /> },
    { id: 'customers', label: 'Directory', icon: <Users size={20} /> },
    { id: 'reports', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Configure', icon: <Settings size={20} /> },
  ];

  return (
    <div className={`w-72 border-r h-screen sticky top-0 flex flex-col transition-all duration-500 z-50 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="p-10 flex items-center gap-4">
        <div className="accent-bg p-3 rounded-[1.25rem] text-white shadow-2xl transform hover:rotate-12 hover:scale-110 transition-all">
          <TrendingUp size={28} strokeWidth={3} />
        </div>
        <div className="flex flex-col">
          <h1 className={`text-2xl font-black tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>MyDukaan</h1>
          <p className="text-[7px] font-black text-slate-400 tracking-[0.1em] uppercase mt-1.5 opacity-80 whitespace-nowrap">Smart Insights for Everyday Business...</p>
        </div>
      </div>
      
      <nav className="flex-1 px-6 py-6 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[1.75rem] transition-all duration-500 relative group overflow-hidden ${
              activeView === item.id 
                ? 'accent-bg text-white shadow-2xl' 
                : `${isDark ? 'text-slate-500 hover:bg-slate-800 hover:text-white' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`
            }`}
            style={activeView === item.id ? { boxShadow: `0 15px 30px var(--brand-color-soft)` } : {}}
          >
            <span className={`transition-all duration-500 ${activeView === item.id ? 'scale-125 rotate-6' : 'group-hover:scale-125 group-hover:accent-text'}`}>
              {item.icon}
            </span>
            <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
            {activeView === item.id && (
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white/30 rounded-l-full animate-in slide-in-from-right duration-300"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-8">
        <div className={`${isDark ? 'bg-slate-800/40' : 'accent-soft-bg'} p-6 rounded-[2rem] transition-all border border-transparent hover:border-indigo-500/20 group`}>
          <div className="flex items-center gap-2 mb-3">
             <Sparkles size={16} className="accent-text animate-pulse" />
             <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Admin Control</p>
          </div>
          <p className={`text-sm font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Manager Terminal</p>
          <button 
            onClick={onLogout}
            className={`mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 ${isDark ? 'bg-slate-900 text-rose-400 hover:bg-rose-500/10' : 'bg-white text-rose-500 hover:bg-rose-50 border border-rose-100 shadow-sm'}`}
          >
            <LogOut size={14} strokeWidth={3} /> Secure Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;