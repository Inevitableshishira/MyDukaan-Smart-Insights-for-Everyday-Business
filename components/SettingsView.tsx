
import React from 'react';
import { Store, Moon, Sun, Layout, List, Palette, Check, CircleDollarSign } from 'lucide-react';
import { BusinessSettings, AccentColor } from '../types';

interface SettingsViewProps {
  settings: BusinessSettings;
  onUpdateSettings: (settings: BusinessSettings) => void;
  isDark: boolean;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdateSettings, isDark }) => {
  const toggleTheme = () => {
    onUpdateSettings({ ...settings, theme: settings.theme === 'light' ? 'dark' : 'light' });
  };

  const toggleCompact = () => {
    onUpdateSettings({ ...settings, compactMode: !settings.compactMode });
  };

  const setAccent = (accentColor: AccentColor) => {
    onUpdateSettings({ ...settings, accentColor });
  };

  const setCurrency = (currency: string) => {
    onUpdateSettings({ ...settings, currency });
  };

  const accents: { name: AccentColor; color: string }[] = [
    { name: 'indigo', color: '#4f46e5' },
    { name: 'emerald', color: '#10b981' },
    { name: 'rose', color: '#f43f5e' },
    { name: 'amber', color: '#f59e0b' },
    { name: 'cyan', color: '#06b6d4' },
    { name: 'violet', color: '#8b5cf6' },
  ];

  const currencies = ['₹', '$', '€', '£', '¥', '₽'];

  const categories = [
    'Cafe / Coffee Shop', 'Hardware Store', 'Clothing Boutique', 'Grocery Store',
    'Tech Repair Shop', 'Pharmacy', 'Automotive Service', 'Bookstore',
    'Restaurant', 'Bakery', 'Electronics Store', 'General Retail'
  ];

  const accentColorValue = accents.find(a => a.name === settings.accentColor)?.color || '#4f46e5';

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      <div className="flex items-center gap-6 mb-2">
        <div className="p-5 text-white rounded-[2rem] shadow-2xl transition-transform hover:scale-110 duration-500" style={{ backgroundColor: accentColorValue }}>
          <Store size={40} />
        </div>
        <div>
          <h2 className={`text-4xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Configuration</h2>
          <p className="text-slate-500 font-medium">Calibrate business terminal environment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/50'} p-10 rounded-[3rem] shadow-2xl border space-y-8`}>
          <div className="flex items-center gap-3 mb-2" style={{ color: accentColorValue }}>
            <Layout size={24} className="font-bold" />
            <h3 className="font-black uppercase tracking-[0.2em] text-xs">Identity Matrix</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className={`block text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'} mb-3 ml-1`}>Enterprise Name</label>
              <input 
                type="text" 
                value={settings.name}
                onChange={(e) => onUpdateSettings({ ...settings, name: e.target.value })}
                className={`w-full p-5 rounded-2xl border-2 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} focus:outline-none font-bold transition-all`}
              />
            </div>
            <div>
              <label className={`block text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'} mb-3 ml-1`}>Industry Vertical</label>
              <select 
                value={settings.type}
                onChange={(e) => onUpdateSettings({ ...settings, type: e.target.value })}
                className={`w-full p-5 rounded-2xl border-2 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} focus:outline-none font-bold cursor-pointer transition-all`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'} mb-3 ml-1`}>Monetary Base (Currency)</label>
              <div className="flex flex-wrap gap-2">
                {currencies.map(curr => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-4 py-3 rounded-xl font-black transition-all ${settings.currency === curr ? 'accent-bg text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/50'} p-10 rounded-[3rem] shadow-2xl border space-y-10 transition-all`}>
          <div className="flex items-center gap-3 mb-2" style={{ color: accentColorValue }}>
            <Palette size={24} className="font-bold" />
            <h3 className="font-black uppercase tracking-[0.2em] text-xs">Visual Protocols</h3>
          </div>
          
          <div className="space-y-10">
            <div>
              <label className={`block text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'} mb-4 ml-1`}>Brand Accent Matrix</label>
              <div className="flex flex-wrap gap-4">
                {accents.map(acc => (
                  <button
                    key={acc.name}
                    onClick={() => setAccent(acc.name)}
                    className={`w-12 h-12 rounded-2xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center shadow-lg`}
                    style={{ backgroundColor: acc.color, border: settings.accentColor === acc.name ? '4px solid white' : 'none' }}
                  >
                    {settings.accentColor === acc.name && <Check className="text-white" size={20} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between group cursor-pointer" onClick={toggleTheme}>
              <div>
                <p className={`font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>Night Vision Theme</p>
                <p className="text-xs text-slate-500 font-medium">Calibrate UI luminance</p>
              </div>
              <div className={`w-14 h-7 rounded-full relative transition-all duration-500 shadow-inner ${isDark ? 'bg-indigo-600' : 'bg-slate-200'}`} style={isDark ? { backgroundColor: accentColorValue } : {}}>
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-xl transition-all duration-500 flex items-center justify-center ${isDark ? 'left-8' : 'left-1'}`}>
                  {isDark ? <Moon size={12} style={{ color: accentColorValue }} /> : <Sun size={12} className="text-amber-500" />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between group cursor-pointer" onClick={toggleCompact}>
              <div>
                <p className={`font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>High Density Layout</p>
                <p className="text-xs text-slate-500 font-medium">Compress UI for productivity</p>
              </div>
              <div className={`w-14 h-7 rounded-full relative transition-all duration-500 shadow-inner ${settings.compactMode ? 'bg-indigo-600' : 'bg-slate-200'}`} style={settings.compactMode ? { backgroundColor: accentColorValue } : {}}>
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-xl transition-all duration-500 flex items-center justify-center ${settings.compactMode ? 'left-8' : 'left-1'}`}>
                  <List size={12} style={settings.compactMode ? { color: accentColorValue } : { color: '#94a3b8' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
