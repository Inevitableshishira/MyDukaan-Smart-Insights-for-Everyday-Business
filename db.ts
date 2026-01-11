
import { BusinessData, Product, Expense } from './types';

const STORAGE_KEY = 'mydukaan_data';

export const INDUSTRY_TEMPLATES: Record<string, { products: Product[], expenses: Expense[] }> = {
  'Cafe / Coffee Shop': {
    products: [
      { id: 'p1', name: 'Arabica Beans', category: 'Supplies', stock: 45, minStockLevel: 10, costPrice: 1200, salePrice: 2400, unit: 'kg' },
      { id: 'p2', name: 'Full Cream Milk', category: 'Dairy', stock: 24, minStockLevel: 6, costPrice: 65, salePrice: 90, unit: 'liters' },
      { id: 'p3', name: 'Caramel Syrup', category: 'Add-ons', stock: 12, minStockLevel: 4, costPrice: 450, salePrice: 850, unit: 'bottles' }
    ],
    expenses: [{ id: 'e1', category: 'Rent', amount: 15000, description: 'Shop Rent', date: new Date().toISOString(), type: 'outgoing' }]
  },
  'Hardware Store': {
    products: [
      { id: 'p1', name: 'Steel Hammer', category: 'Tools', stock: 15, minStockLevel: 5, costPrice: 350, salePrice: 550, unit: 'pcs' },
      { id: 'p2', name: 'Galvanized Screws', category: 'Fasteners', stock: 500, minStockLevel: 100, costPrice: 2, salePrice: 5, unit: 'box' },
      { id: 'p3', name: 'Wall Paint (4L)', category: 'Paints', stock: 20, minStockLevel: 5, costPrice: 850, salePrice: 1400, unit: 'can' }
    ],
    expenses: [{ id: 'e1', category: 'Raw Stock', amount: 8000, description: 'Initial Tools Stock', date: new Date().toISOString(), type: 'outgoing' }]
  },
  'Clothing Boutique': {
    products: [
      { id: 'p1', name: 'Cotton T-Shirt', category: 'Apparel', stock: 50, minStockLevel: 10, costPrice: 450, salePrice: 950, unit: 'pcs' },
      { id: 'p2', name: 'Denim Jeans', category: 'Apparel', stock: 30, minStockLevel: 5, costPrice: 1200, salePrice: 2800, unit: 'pcs' },
      { id: 'p3', name: 'Silk Scarf', category: 'Accessories', stock: 15, minStockLevel: 3, costPrice: 300, salePrice: 750, unit: 'pcs' }
    ],
    expenses: [{ id: 'e1', category: 'Rent', amount: 25000, description: 'Boutique Rent', date: new Date().toISOString(), type: 'outgoing' }]
  },
  'Pharmacy': {
    products: [
      { id: 'p1', name: 'Paracetamol 500mg', category: 'Medicines', stock: 100, minStockLevel: 20, costPrice: 20, salePrice: 45, unit: 'strip' },
      { id: 'p2', name: 'Digital Thermometer', category: 'Equipment', stock: 15, minStockLevel: 5, costPrice: 150, salePrice: 350, unit: 'pcs' },
      { id: 'p3', name: 'Face Masks (50pk)', category: 'Supplies', stock: 40, minStockLevel: 10, costPrice: 100, salePrice: 250, unit: 'box' }
    ],
    expenses: [{ id: 'e1', category: 'Taxes', amount: 5000, description: 'License Fee', date: new Date().toISOString(), type: 'outgoing' }]
  },
  'Electronics Store': {
    products: [
      { id: 'p1', name: 'USB-C Cable 2m', category: 'Cables', stock: 40, minStockLevel: 10, costPrice: 150, salePrice: 450, unit: 'pcs' },
      { id: 'p2', name: 'Wireless Mouse', category: 'Peripherals', stock: 25, minStockLevel: 5, costPrice: 600, salePrice: 1200, unit: 'pcs' },
      { id: 'p3', name: 'Bluetooth Speaker', category: 'Audio', stock: 10, minStockLevel: 2, costPrice: 1800, salePrice: 3500, unit: 'pcs' }
    ],
    expenses: [{ id: 'e1', category: 'Shipping', amount: 1200, description: 'Inventory Freight', date: new Date().toISOString(), type: 'outgoing' }]
  }
};

const initialData: BusinessData = {
  products: INDUSTRY_TEMPLATES['Cafe / Coffee Shop'].products,
  sales: [],
  expenses: INDUSTRY_TEMPLATES['Cafe / Coffee Shop'].expenses,
  customers: [
    { id: 'c1', name: 'Rahul Khanna', email: 'rahul@example.in', phone: '9876543210', totalSpent: 0, lastPurchaseDate: new Date().toISOString() }
  ],
  settings: {
    name: 'MyDukaan',
    type: 'Cafe / Coffee Shop',
    theme: 'light',
    compactMode: false,
    accentColor: 'indigo',
    currency: '₹'
  }
};

export const loadData = (): BusinessData => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (!parsed.settings) parsed.settings = initialData.settings;
    if (parsed.settings.currency === undefined) parsed.settings.currency = '₹';
    return parsed;
  }
  return initialData;
};

export const saveData = (data: BusinessData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
