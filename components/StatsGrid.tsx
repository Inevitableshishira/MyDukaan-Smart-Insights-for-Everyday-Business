
import React from 'react';
import { DollarSign, Package, TrendingUp, Wallet, Zap, Activity, Target } from 'lucide-react';
import { BusinessData } from '../types';

interface StatsGridProps {
  data: BusinessData;
  currency: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({ data, currency }) => {
  const isDark = data.settings.theme === 'dark';
  const totalSales = data.sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
  const totalExpenses = data.expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const lowStockCount = data.products.filter(p => p.stock <= p.minStockLevel).length;
  const grossProfit = totalSales - totalExpenses;

  const stats = [
    { label: 'Net Revenue', value: `${currency}${totalSales.toLocaleString()}`, icon: <TrendingUp size={20} />, accent: 'text-emerald-500', bgColor: isDark ? 'bg-emerald-500/10' : 'bg-emerald-50', border: 'border-emerald-500/20' },
    { label: 'Outflows', value: `${currency}${totalExpenses.toLocaleString()}`, icon: <Wallet size={20} />, accent: 'text-rose-500', bgColor: isDark ? 'bg-rose-500/10' : 'bg-rose-50', border: 'border-rose-500/20' },
    { label: 'Asset Alert', value: lowStockCount, icon: <Activity size={20} />, accent: 'text-amber-500', bgColor: isDark ? 'bg-amber-500/10' : 'bg-amber-50', border: 'border-amber-500/20' },
    { label: 'Bottom Line', value: `${currency}${grossProfit.toLocaleString()}`, icon: <Zap size={20} />, accent: 'text-indigo-500', bgColor: isDark ? 'bg-indigo-500/10' : 'bg-indigo-50', border: 'border-indigo-500/20' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className={`${isDark ? 'bg-slate-900 border-slate-800 shadow-black/40' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/40'} p-7 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 group overflow-hidden relative`}>
          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className={`${stat.bgColor} ${stat.accent} p-3.5 rounded-2xl shadow-lg transition-transform group-hover:rotate-12 duration-500 border ${stat.border}`}>
              {stat.icon}
            </div>
            <div className="flex flex-col items-end">
                <Target size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-500 mb-1 tracking-widest uppercase">{stat.label}</p>
            <h3 className={`text-2xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
          </div>
          <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-1000 ${stat.bgColor}`} />
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
