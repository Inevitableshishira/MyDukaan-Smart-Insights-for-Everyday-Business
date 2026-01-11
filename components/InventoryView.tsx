
import React, { useState, useMemo } from 'react';
import { Plus, Search, X, Edit2, Trash2, Box, Coffee, Truck, Zap, Droplets, Layers, Package, Utensils, Smartphone, Microscope, AlertCircle, Wrench, Shirt, Pill, Cpu } from 'lucide-react';
import { Product } from '../types';

interface InventoryViewProps {
  products: Product[];
  businessType: string;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  isDark: boolean;
  compactMode?: boolean;
  currency: string;
}

const getCategoryIcon = (category: string) => {
  const c = category.toLowerCase();
  if (c.includes('coffee')) return <Coffee size={14} />;
  if (c.includes('packaging')) return <Truck size={14} />;
  if (c.includes('dairy')) return <Droplets size={14} />;
  if (c.includes('electronic')) return <Cpu size={14} />;
  if (c.includes('tool') || c.includes('hardware')) return <Wrench size={14} />;
  if (c.includes('apparel') || c.includes('clothing')) return <Shirt size={14} />;
  if (c.includes('medicine')) return <Pill size={14} />;
  if (c.includes('audio')) return <Smartphone size={14} />;
  return <Package size={14} />;
};

const InventoryView: React.FC<InventoryViewProps> = ({ products, businessType, onAddProduct, onUpdateProduct, onDeleteProduct, isDark, compactMode, currency }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const industryCategories = useMemo(() => {
    const bt = businessType.toLowerCase();
    if (bt.includes('cafe')) return ['Supplies', 'Dairy', 'Add-ons', 'Packaging', 'Equipment'];
    if (bt.includes('hardware')) return ['Tools', 'Fasteners', 'Paints', 'Electrical', 'Plumbing'];
    if (bt.includes('clothing') || bt.includes('boutique')) return ['Apparel', 'Accessories', 'Footwear', 'Packaging'];
    if (bt.includes('pharmacy')) return ['Medicines', 'Equipment', 'Supplies', 'Personal Care'];
    return ['Supplies', 'Raw Stock', 'Finished Goods', 'Packaging', 'Other'];
  }, [businessType]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: industryCategories[0],
    stock: 0,
    minStockLevel: 5,
    costPrice: 0,
    salePrice: 0,
    unit: 'units'
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (p: Product) => {
    setEditingId(p.id);
    setNewProduct({ ...p });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdateProduct({ ...newProduct, id: editingId } as Product);
    } else {
      onAddProduct(newProduct);
    }
    setIsModalOpen(false);
    setEditingId(null);
    setNewProduct({ name: '', category: industryCategories[0], stock: 0, minStockLevel: 5, costPrice: 0, salePrice: 0, unit: 'units' });
  };

  const rowHeight = compactMode ? 'py-2' : 'py-6';
  const tablePx = compactMode ? 'px-4' : 'px-8';
  const iconBoxSize = compactMode ? 'w-8 h-8' : 'w-11 h-11';
  const mainFontSize = compactMode ? 'text-[11px]' : 'text-sm';
  const subFontSize = compactMode ? 'text-[9px]' : 'text-[10px]';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className={`${compactMode ? 'text-lg' : 'text-3xl'} font-black tracking-tighter`}>Resource Catalog</h2>
          {!compactMode && <p className="text-slate-500 font-medium text-xs">Real-time resource flow and valuation tracking for {businessType}</p>}
        </div>
        <button onClick={() => { setEditingId(null); setIsModalOpen(true); }} className={`bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg hover:bg-indigo-700 ${compactMode ? 'px-4 py-2 text-[10px]' : 'px-6 py-4 text-xs'}`}>
          <Plus size={compactMode ? 14 : 16} className="inline mr-2" /> Register Asset
        </button>
      </div>

      <div className={`${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-xl'} rounded-[2.5rem] border backdrop-blur-xl overflow-hidden`}>
        <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'bg-slate-900/40' : 'bg-slate-50/40'}`}>
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder={`Query ${businessType} catalog...`} 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className={`w-full pl-10 pr-4 py-2 rounded-xl border-2 font-bold focus:border-indigo-500 outline-none transition-all ${compactMode ? 'text-[10px]' : 'text-xs'}`} 
            />
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Live Sync Active</span>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${isDark ? 'bg-slate-800/30' : 'bg-slate-50'} border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <th className={`${tablePx} py-4 ${subFontSize} font-black uppercase text-slate-400 tracking-widest`}>Asset Identity</th>
                <th className={`${tablePx} py-4 ${subFontSize} font-black uppercase text-slate-400 tracking-widest`}>Stock Flux</th>
                <th className={`${tablePx} py-4 ${subFontSize} font-black uppercase text-slate-400 tracking-widest`}>Valuation</th>
                <th className={`${tablePx} py-4 ${subFontSize} font-black uppercase text-slate-400 text-right tracking-widest`}>Terminal</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
              {filteredProducts.map((p, idx) => (
                <tr key={p.id} className={`${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-indigo-50/30'} group transition-all animate-in slide-in-from-left duration-300`} style={{ animationDelay: `${idx * 15}ms` }}>
                  <td className={`${tablePx} ${rowHeight}`}>
                    <div className="flex items-center gap-3">
                      <div className={`${iconBoxSize} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                        {getCategoryIcon(p.category)}
                      </div>
                      <div className="flex flex-col">
                        <span className={`font-black tracking-tight ${mainFontSize} ${isDark ? 'text-white' : 'text-slate-800'}`}>{p.name}</span>
                        <span className={`${subFontSize} font-black text-slate-500 uppercase tracking-widest`}>{p.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className={`${tablePx} ${rowHeight}`}>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                         <span className={`${mainFontSize} font-black ${p.stock <= p.minStockLevel ? 'text-rose-500' : 'text-emerald-500'}`}>{p.stock} {p.unit}</span>
                         {p.stock <= p.minStockLevel && <AlertCircle size={10} className="text-rose-500 animate-pulse" />}
                      </div>
                      <div className={`h-1 ${compactMode ? 'w-10' : 'w-20'} bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden`}>
                        <div className={`h-full transition-all duration-1000 ${p.stock <= p.minStockLevel ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, (p.stock / 60) * 100)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className={`${tablePx} ${rowHeight}`}>
                    <div className="flex flex-col">
                      <span className={`${subFontSize} font-bold text-slate-400`}>IN: {currency}{p.costPrice}</span>
                      <span className={`${mainFontSize} font-black accent-text`}>OUT: {currency}{p.salePrice}</span>
                    </div>
                  </td>
                  <td className={`${tablePx} ${rowHeight} text-right`}>
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(p)} 
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all opacity-60 hover:opacity-100"
                        title="Edit Asset"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if(window.confirm(`Permanently wipe ${p.name} from inventory catalog?`)) {
                            onDeleteProduct(p.id);
                          }
                        }} 
                        className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:text-white hover:bg-rose-500 transition-all opacity-60 hover:opacity-100"
                        title="Delete Asset"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="py-24 text-center opacity-30 flex flex-col items-center">
              <Package size={compactMode ? 40 : 60} />
              <p className="font-black text-[9px] uppercase tracking-widest mt-4">Terminal Buffer Empty</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'} rounded-[3rem] w-full max-w-md p-10 shadow-2xl border`}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black tracking-tighter">{editingId ? 'Refine Asset' : 'Log New Asset'}</h3>
              <X className="cursor-pointer text-slate-400 hover:text-rose-500 transition-colors" onClick={() => setIsModalOpen(false)} />
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Asset Identity</label>
                <input required type="text" placeholder="Item Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className={`w-full p-4 border-2 rounded-2xl outline-none font-bold ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Stock Flux</label>
                  <input required type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})} className={`w-full p-4 border-2 rounded-2xl font-bold ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50'}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Domain/Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className={`w-full p-4 border-2 rounded-2xl font-bold ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50'} outline-none cursor-pointer`}>
                    {industryCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Inbound Cost ({currency})</label>
                  <input required type="number" step="0.01" value={newProduct.costPrice} onChange={e => setNewProduct({...newProduct, costPrice: parseFloat(e.target.value) || 0})} className={`w-full p-4 border-2 rounded-2xl font-bold ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50'}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Retail Value ({currency})</label>
                  <input required type="number" step="0.01" value={newProduct.salePrice} onChange={e => setNewProduct({...newProduct, salePrice: parseFloat(e.target.value) || 0})} className={`w-full p-4 border-2 rounded-2xl font-bold ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50'}`} />
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black uppercase shadow-xl hover:bg-indigo-700 transition-all mt-4 active:scale-95">
                {editingId ? 'Update Matrix' : 'Finalize Record'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryView;
