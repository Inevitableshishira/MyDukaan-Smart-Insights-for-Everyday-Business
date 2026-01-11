
import React from 'react';
import { Sparkles, Loader2, TrendingUp, ArrowUpRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BusinessData } from '../types';
import StatsGrid from './StatsGrid';

interface DashboardViewProps {
  data: BusinessData;
  insights: string;
  loadingInsights: boolean;
  onFetchInsights: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ data, insights, loadingInsights, onFetchInsights }) => {
  const isDark = data.settings.theme === 'dark';
  const currency = data.settings.currency || '₹';
  
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-800'} tracking-tighter`}>Terminal Command</h2>
          <p className="text-slate-500 font-medium text-xs">Synchronized business health analytics</p>
        </div>
        <button 
          onClick={onFetchInsights}
          disabled={loadingInsights}
          className="flex items-center gap-4 text-white px-8 py-4 rounded-[1.25rem] transition-all duration-500 transform hover:scale-105 active:scale-95 text-[10px] font-black uppercase tracking-widest shadow-2xl disabled:opacity-50 accent-bg"
          style={{ boxShadow: '0 10px 25px var(--brand-color-soft)' }}
        >
          {loadingInsights ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} className="animate-pulse" />}
          AI Intelligence
        </button>
      </div>

      <StatsGrid data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={`lg:col-span-8 ${isDark ? 'bg-slate-900 border-slate-800 shadow-black/40' : 'bg-white border-slate-100 shadow-slate-200/50'} p-8 rounded-[3rem] shadow-2xl border transition-all duration-500`}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className={`font-black text-xl ${isDark ? 'text-white' : 'text-slate-800'} tracking-tight`}>Revenue Stream</h3>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1">Live Transaction Velocity</p>
            </div>
            <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 uppercase tracking-widest">
              <Activity size={12} className="animate-pulse" /> SYNCED
            </span>
          </div>
          <div className="h-64 md:h-72">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.sales.slice(-10)}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--brand-color)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--brand-color)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#f1f5f9'} />
                  <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString([], { month: 'short', day: 'numeric' })} fontSize={9} fontWeight="900" tickLine={false} axisLine={false} tick={{ fill: isDark ? '#475569' : '#94a3b8' }} />
                  <YAxis fontSize={9} fontWeight="900" tickLine={false} axisLine={false} tickFormatter={(val) => `${currency}${val}`} tick={{ fill: isDark ? '#475569' : '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgb(0 0 0 / 0.3)', backgroundColor: isDark ? '#020617' : '#fff', color: isDark ? '#fff' : '#0f172a', padding: '16px', fontWeight: '900' }} 
                  />
                  <Area type="monotone" dataKey="totalAmount" stroke="var(--brand-color)" fillOpacity={1} fill="url(#colorSales)" strokeWidth={4} />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 accent-bg text-white p-8 rounded-[3rem] shadow-2xl flex flex-col relative overflow-hidden group transition-all duration-700" style={{ boxShadow: '0 20px 40px var(--brand-color-soft)' }}>
          <div className="absolute -top-12 -right-12 p-24 bg-white/10 rounded-full blur-[80px]" />
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="p-2.5 bg-white/20 rounded-xl">
              <Sparkles size={20} className="text-white animate-pulse" />
            </div>
            <h3 className="font-black text-xl tracking-tighter">AI Pulse</h3>
          </div>
          
          <div className="flex-1 text-white/90 text-sm overflow-y-auto pr-2 custom-scrollbar relative z-10 font-bold">
            {loadingInsights ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <Loader2 className="animate-spin" size={32} />
                <p className="text-white font-black uppercase tracking-[0.2em] text-[9px] animate-pulse">Analyzing...</p>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-700">
                {insights ? (
                  <div className="prose prose-invert prose-sm">
                    <ul className="space-y-3 list-none p-0 m-0">
                      {insights.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="flex gap-3 items-start border-l-4 border-white/20 pl-4 py-2 bg-white/5 rounded-r-xl transform hover:translate-x-1 transition-transform">
                          <span className="opacity-100">{line.replace(/^[\*\-\d\.\s]+/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="opacity-70 italic text-xs py-10 text-center">Engine standby...</p>
                )}
              </div>
            )}
          </div>
          <p className="mt-6 text-[8px] text-white/50 font-black uppercase tracking-[0.3em] relative z-10 text-center border-t border-white/10 pt-4">CORE_LENS_READY</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
