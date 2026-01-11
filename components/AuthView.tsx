import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

interface AuthViewProps {
  onLogin: () => void;
  isDark: boolean;
  businessName: string;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin, isDark, businessName }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin' || passcode === '1234') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
       <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
       <div className="max-w-md w-full p-10 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-10">
            <div className="inline-flex p-5 bg-indigo-600 text-white rounded-[2rem] shadow-2xl shadow-indigo-600/40 mb-6">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Admin Terminal</h1>
            <p className="text-slate-500 font-medium mb-1">Restricted Access: {businessName}</p>
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest italic opacity-70">Smart Insights for Everyday Business...</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                 <KeyRound size={20} />
              </div>
              <input 
                autoFocus
                type="password" 
                placeholder="Manager Passcode"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className={`w-full pl-14 pr-6 py-5 rounded-[1.5rem] border-2 ${error ? 'border-rose-500 bg-rose-50' : isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'} outline-none focus:border-indigo-600 transition-all font-bold text-center tracking-widest`}
              />
            </div>

            {error && <p className="text-center text-xs font-black text-rose-500 uppercase tracking-widest animate-pulse">Invalid Access Token</p>}

            <button type="submit" className="w-full bg-indigo-600 text-white font-black py-5 rounded-[1.5rem] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 active:scale-95 group">
              Decrypt & Launch
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 flex items-center justify-center gap-2 text-slate-500">
            <ShieldCheck size={16} />
            <span className="text-[10px] uppercase font-black tracking-widest">End-to-End Encryption Active</span>
          </div>
       </div>
    </div>
  );
};

export default AuthView;