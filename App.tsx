
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import InventoryView from './components/InventoryView';
import SalesView from './components/SalesView';
import SettingsView from './components/SettingsView';
import ReportsView from './components/ReportsView';
import CustomersView from './components/CustomersView';
import ExpensesView from './components/ExpensesView';
import AuthView from './components/AuthView';
import { BusinessData, View, Product, Sale, BusinessSettings, Customer, Expense, AccentColor } from './types';
import { loadData, saveData, INDUSTRY_TEMPLATES } from './db';
import { getBusinessInsights } from './services/geminiService';
import { User, MessageSquareText } from 'lucide-react';

const colorMap: Record<AccentColor, string> = {
  indigo: '#4f46e5',
  emerald: '#10b981',
  rose: '#f43f5e',
  amber: '#f59e0b',
  cyan: '#06b6d4',
  violet: '#8b5cf6'
};

const App: React.FC = () => {
  const [data, setData] = useState<BusinessData>(loadData());
  const [view, setView] = useState<View>('dashboard');
  const [insights, setInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState<{msg: string, type: 'sms' | 'info'} | null>(null);

  const isDark = data.settings.theme === 'dark';
  const isCompact = data.settings.compactMode;
  const accent = data.settings.accentColor || 'indigo';
  const brandColor = colorMap[accent];
  const currency = data.settings.currency || '₹';

  // Persistence
  useEffect(() => {
    saveData(data);
    document.documentElement.style.setProperty('--brand-color', brandColor);
    document.documentElement.style.setProperty('--brand-color-soft', `${brandColor}22`);
  }, [data, brandColor]);

  const fetchInsights = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoadingInsights(true);
    const result = await getBusinessInsights(data);
    setInsights(result);
    setLoadingInsights(false);
  }, [data, isLoggedIn]);

  const handleAddSale = useCallback((sale: Omit<Sale, 'id'>) => {
    const newSale = { ...sale, id: `s${Date.now()}` };
    setData(prev => {
      const updatedProducts = prev.products.map(p => {
        if (p.id === sale.productId) {
          const newStock = Math.max(0, p.stock - sale.quantity);
          if (newStock === 0) {
            setNotification({ msg: `RESTOCK: ${p.name} empty.`, type: 'sms' });
            setTimeout(() => setNotification(null), 5000);
          }
          return { ...p, stock: newStock };
        }
        return p;
      });
      return { ...prev, sales: [...prev.sales, newSale], products: updatedProducts };
    });
  }, []);

  const handleAddProduct = useCallback((product: Omit<Product, 'id'>) => {
    setData(prev => ({
      ...prev,
      products: [...prev.products, { ...product, id: `p${Date.now()}` }]
    }));
  }, []);

  const handleUpdateProduct = useCallback((updated: Product) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === updated.id ? updated : p)
    }));
  }, []);

  const handleDeleteProduct = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  }, []);

  const handleUpdateSettings = useCallback((settings: BusinessSettings) => {
    setData(prev => {
      let updatedProducts = prev.products;
      let updatedExpenses = prev.expenses;
      
      // If industry type changed, trigger auto-migration prompt
      if (settings.type !== prev.settings.type && INDUSTRY_TEMPLATES[settings.type]) {
        if (window.confirm(`Switching vertical to ${settings.type}. Would you like to load industry-standard inventory and expense templates? This will replace current items.`)) {
          updatedProducts = INDUSTRY_TEMPLATES[settings.type].products;
          updatedExpenses = INDUSTRY_TEMPLATES[settings.type].expenses;
        }
      }
      
      return { 
        ...prev, 
        settings, 
        products: updatedProducts, 
        expenses: updatedExpenses 
      };
    });
  }, []);

  const handleAddCustomer = useCallback((customer: Omit<Customer, 'id'>) => {
    setData(prev => ({ ...prev, customers: [...prev.customers, { ...customer, id: `c${Date.now()}` }] }));
  }, []);

  const handleClearCustomers = useCallback(() => {
    if (window.confirm('Wipe all customer records from the directory?')) {
      setData(prev => ({ ...prev, customers: [] }));
    }
  }, []);

  const handleAddExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    setData(prev => ({ ...prev, expenses: [...prev.expenses, { ...expense, id: `e${Date.now()}` }] }));
  }, []);

  const handleClearLedger = useCallback(() => {
    if (window.confirm('Wipe all transaction and expense history?')) {
      setData(prev => ({ ...prev, expenses: [], sales: [] }));
    }
  }, []);

  if (!isLoggedIn) {
    return <AuthView onLogin={() => setIsLoggedIn(true)} isDark={isDark} businessName={data.settings.name} />;
  }

  return (
    <div className={`flex h-screen w-full transition-all duration-700 overflow-hidden relative ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} ${isCompact ? 'compact-ui' : ''}`}>
      {/* Background Meshes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] bg-indigo-500/10 animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] bg-emerald-500/10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Sidebar activeView={view} onViewChange={setView} isDark={isDark} onLogout={() => setIsLoggedIn(false)} />
      
      <main className="flex-1 flex flex-col min-w-0 z-10 overflow-hidden">
        <header className={`z-50 w-full px-12 py-5 border-b backdrop-blur-3xl transition-all duration-500 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-100 shadow-sm'}`}>
          <div className="max-w-[1400px] mx-auto flex justify-between items-center gap-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-[9px] font-black uppercase tracking-[0.4em] mb-0.5 opacity-60" style={{ color: brandColor }}>{data.settings.type}</h1>
              <div className="flex items-baseline gap-3">
                <p className={`text-2xl font-black tracking-tighter truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{data.settings.name}</p>
                <span className="hidden lg:block text-[10px] font-bold text-slate-400 border-l pl-3 border-slate-200 dark:border-slate-800 italic">Smart Insights for Everyday Business...</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
               <div className="hidden lg:flex flex-col text-right">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Terminal Status</span>
                  <span className="text-xs font-bold font-mono accent-text">STABLE_CONNECTED</span>
               </div>
               <div 
                onClick={() => setView('settings')}
                className="w-12 h-12 rounded-[1.25rem] flex items-center justify-center text-white font-black border-4 shadow-xl cursor-pointer hover:scale-110 transition-all"
                style={{ backgroundColor: brandColor, borderColor: isDark ? '#1e293b' : '#fff' }}
              >
                <User size={22} />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
          {notification && (
            <div className="fixed top-24 right-8 z-[100] animate-in slide-in-from-right duration-500">
              <div className={`flex items-center gap-4 px-6 py-4 rounded-[2rem] shadow-2xl border-2 ${notification.type === 'sms' ? 'bg-rose-600 border-rose-400 text-white' : 'bg-indigo-600 border-indigo-400 text-white'}`}>
                <MessageSquareText size={20} className="animate-bounce" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Push Signal</span>
                  <span className="font-black text-xs uppercase tracking-wider">{notification.msg}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="max-w-[1400px] mx-auto">
            {view === 'dashboard' && <DashboardView data={data} insights={insights} loadingInsights={loadingInsights} onFetchInsights={fetchInsights} currency={currency} />}
            {view === 'inventory' && <InventoryView products={data.products} businessType={data.settings.type} onAddProduct={handleAddProduct} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct} isDark={isDark} compactMode={isCompact} currency={currency} />}
            {view === 'sales' && <SalesView products={data.products} onAddSale={handleAddSale} isDark={isDark} currency={currency} />}
            {view === 'reports' && <ReportsView data={data} isDark={isDark} currency={currency} />}
            {view === 'customers' && <CustomersView customers={data.customers} onAddCustomer={handleAddCustomer} onClearCustomers={handleClearCustomers} isDark={isDark} compactMode={isCompact} currency={currency} />}
            {view === 'expenses' && <ExpensesView expenses={data.expenses} onAddExpense={handleAddExpense} onClearLedger={handleClearLedger} businessType={data.settings.type} isDark={isDark} compactMode={isCompact} currency={currency} />}
            {view === 'settings' && <SettingsView settings={data.settings} onUpdateSettings={handleUpdateSettings} isDark={isDark} />}
          </div>
        </div>
      </main>

      <style>{`
        :root { --brand-color: #4f46e5; --brand-color-soft: #4f46e522; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
        .accent-bg { background-color: var(--brand-color); }
        .accent-text { color: var(--brand-color); }
        .compact-ui { font-size: 0.8rem; }
        .compact-ui h2 { font-size: 1.5rem !important; }
        .compact-ui .max-w-[1400px] { max-width: 100%; }
      `}</style>
    </div>
  );
};

export default App;
