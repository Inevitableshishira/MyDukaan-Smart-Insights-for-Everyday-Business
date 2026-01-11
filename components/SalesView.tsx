
import React, { useState } from 'react';
import { ShoppingCart, ShoppingBag, Plus, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Product, Sale } from '../types';

interface SalesViewProps {
  products: Product[];
  onAddSale: (sale: Omit<Sale, 'id'>) => void;
  isDark: boolean;
}

const SalesView: React.FC<SalesViewProps> = ({ products, onAddSale, isDark }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [qty, setQty] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const product = products.find(p => p.id === selectedProduct);

  const handleClear = () => {
    setSelectedProduct('');
    setQty(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    if (product.stock < qty) {
      alert("Insufficient stock available for this transaction.");
      return;
    }

    onAddSale({
      productId: product.id,
      productName: product.name,
      quantity: qty,
      totalAmount: product.salePrice * qty,
      date: new Date().toISOString()
    });

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
    handleClear();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in slide-in-from-bottom-8 duration-700">
      <div className="text-center">
        <div className={`inline-flex p-6 ${isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100'} rounded-[2.5rem] mb-6 shadow-2xl border`}>
          <ShoppingCart size={48} />
        </div>
        <h2 className={`text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter mb-2`}>Transaction Interface</h2>
        <p className="text-slate-500 font-medium text-lg">Secure point-of-sale logic for real-time inventory deduction</p>
      </div>

      <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-8 md:p-12 rounded-[3.5rem] shadow-2xl border relative transition-all overflow-hidden`}>
        {isSuccess && (
          <div className="absolute inset-0 z-20 bg-emerald-500/10 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-500">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center transform scale-125">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 className="text-emerald-500" size={40} />
              </div>
              <h4 className="text-2xl font-black text-slate-900">Purchase Logged</h4>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Inventory Adjusted Synchronously</p>
            </div>
          </div>
        )}

        <form className="space-y-12" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Input Section */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <label className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-4 ml-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Product Selection Matrix</label>
                <div className="relative">
                  <select 
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                    className={`w-full p-6 rounded-[1.75rem] border-2 text-lg ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'} focus:border-indigo-600 focus:ring-8 focus:ring-indigo-600/5 focus:outline-none appearance-none transition-all cursor-pointer font-bold`}
                  >
                    <option value="">Query item catalog...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                        {p.name} — ${p.salePrice.toFixed(2)} ({p.stock} Units)
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-600">
                    <Plus size={24} />
                  </div>
                </div>
              </div>
              
              <div>
                <label className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-4 ml-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Unit Quantity Control</label>
                <div className="flex items-center gap-6">
                  <button 
                    type="button" 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className={`w-20 h-20 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'} font-black text-3xl shadow-lg`}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                    className={`w-full p-6 rounded-[1.5rem] border-2 text-center text-4xl font-black focus:border-indigo-600 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} tabular-nums shadow-inner`}
                  />
                  <button 
                    type="button" 
                    onClick={() => setQty(qty + 1)}
                    className={`w-20 h-20 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'} font-black text-3xl shadow-lg`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Computation Section */}
            <div className="lg:col-span-5 flex flex-col">
              <label className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-4 ml-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Audit & Computation</label>
              <div className={`flex-1 p-10 rounded-[2.5rem] border-4 border-dashed flex flex-col justify-between transition-colors ${isDark ? 'bg-indigo-600/5 border-slate-800' : 'bg-indigo-50/50 border-indigo-100'}`}>
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-6 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Gross Subtotal</span>
                    <span className={`font-black text-2xl ${isDark ? 'text-white' : 'text-slate-800'} tabular-nums`}>
                      ${product ? (product.salePrice * qty).toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Applicable Tax</span>
                    <span className={`font-black text-sm text-slate-500`}>$0.00</span>
                  </div>
                </div>
                <div className="pt-10">
                  <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Terminal Net Total</span>
                  <span className="text-6xl font-black text-indigo-600 tabular-nums tracking-tighter">
                    ${product ? (product.salePrice * qty).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <button 
              type="button"
              onClick={handleClear}
              className={`flex-1 font-black py-6 rounded-3xl transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest ${isDark ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              <RefreshCw size={20} />
              Reset Buffer
            </button>
            <button 
              type="submit" 
              disabled={!product}
              className="flex-[2] bg-indigo-600 hover:bg-indigo-700 disabled:opacity-20 disabled:cursor-not-allowed text-white font-black py-6 rounded-3xl transition-all shadow-2xl shadow-indigo-600/40 flex items-center justify-center gap-4 text-xl transform hover:-translate-y-1 active:scale-95"
            >
              <ShoppingBag size={28} />
              Finalize Log
            </button>
          </div>
        </form>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Cloud Sync', desc: 'Encrypted Local Storage Persistence' },
          { label: 'Compliance', desc: 'Automatic Inventory Audit Adjustment' },
          { label: 'Analysis', desc: 'Feeds Business Logic Neural Network' }
        ].map((feat, idx) => (
          <div key={idx} className={`p-8 rounded-[2rem] border transition-all ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-indigo-500/30' : 'bg-white border-slate-100 hover:border-indigo-600/30'}`}>
            <p className="text-[10px] font-black uppercase text-indigo-500 mb-2 tracking-[0.2em]">{feat.label}</p>
            <p className={`text-sm font-bold leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesView;
