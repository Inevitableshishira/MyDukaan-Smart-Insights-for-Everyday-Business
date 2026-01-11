import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BusinessData } from '../types';
import { TrendingUp, TrendingDown, Target, Activity } from 'lucide-react';

interface ReportsViewProps {
  data: BusinessData;
  isDark: boolean;
  currency: string;
}

const ReportsView: React.FC<ReportsViewProps> = ({ data, isDark, currency }) => {
  const totalSales = data.sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
  const totalExpenses = data.expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netProfit = totalSales - totalExpenses;

  // Aggregate sales by product for Pie Chart
  const salesByProduct = data.sales.reduce((acc: any, sale) => {
    acc[sale.productName] = (acc[sale.productName] || 0) + sale.totalAmount;
    return acc;
  }, {});

  const pieData = Object.keys(salesByProduct).map(name => ({
    name,
    value: salesByProduct[name]
  }));

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Aggregate daily revenue vs expenses for Bar Chart (last 7 days simulation)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const dailyReportData = last7Days.map(date => ({
    date: new Date(date).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    Revenue: data.sales.filter(s => s.date.startsWith(date)).reduce((a, b) => a + b.totalAmount, 0),
    Expenses: data.expenses.filter(e => e.date.startsWith(date)).reduce((a, b) => a + b.amount, 0),
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-800'}`}>Financial Reports</h2>
          <p className="text-slate-500 font-medium">Detailed audit of your business profitability</p>
        </div>
        <div className="flex gap-4">
          <div className={`${isDark ? 'bg-slate-900' : 'bg-white'} border border-slate-200 dark:border-slate-800 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3`}>
             <Target className="text-indigo-600" size={20} />
             <div>
               <p className="text-[10px] uppercase font-black text-slate-400">Target Achievement</p>
               <p className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>84.2%</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-8 rounded-[2.5rem] shadow-sm border transition-all`}>
          <div className="flex justify-between items-center mb-10">
            <h3 className={`font-black text-xl ${isDark ? 'text-white' : 'text-slate-800'}`}>Revenue vs Expenses</h3>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600" /> <span className="text-xs font-bold text-slate-400">Revenue</span>
              <span className="w-3 h-3 rounded-full bg-rose-500 ml-2" /> <span className="text-xs font-bold text-slate-400">Expenses</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyReportData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#f1f5f9'} />
                <XAxis dataKey="date" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} tickFormatter={(v) => `${currency}${v}`} tick={{fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: isDark ? '#1e293b' : '#f8fafc'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: isDark ? '#0f172a' : '#fff' }} 
                />
                <Bar dataKey="Revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-8 rounded-[2.5rem] shadow-sm border transition-all`}>
          <h3 className={`font-black text-xl mb-10 ${isDark ? 'text-white' : 'text-slate-800'}`}>Revenue Distribution</h3>
          <div className="h-72 flex flex-col md:flex-row items-center">
            <div className="flex-1 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-48 space-y-3 mt-6 md:mt-0">
              {pieData.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-xs font-bold text-slate-500 truncate max-w-[80px]">{p.name}</span>
                  </div>
                  <span className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{currency}{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-8 rounded-[2.5rem] border flex items-center gap-6`}>
           <div className={`p-4 rounded-2xl ${isDark ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'}`}>
              <TrendingUp size={32} />
           </div>
           <div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Growth Rate</p>
             <h4 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>+18.4%</h4>
           </div>
        </div>
        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-8 rounded-[2.5rem] border flex items-center gap-6`}>
           <div className={`p-4 rounded-2xl ${isDark ? 'bg-indigo-500/10 text-indigo-500' : 'bg-indigo-50 text-indigo-600'}`}>
              <Activity size={32} />
           </div>
           <div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Store Activity</p>
             <h4 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>High</h4>
           </div>
        </div>
        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-8 rounded-[2.5rem] border flex items-center gap-6`}>
           <div className={`p-4 rounded-2xl ${isDark ? 'bg-rose-500/10 text-rose-500' : 'bg-rose-50 text-rose-600'}`}>
              <TrendingDown size={32} />
           </div>
           <div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Expense Trend</p>
             <h4 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>-2.1%</h4>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;