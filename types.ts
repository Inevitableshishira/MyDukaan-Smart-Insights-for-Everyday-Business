
export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStockLevel: number;
  costPrice: number;
  salePrice: number;
  unit: string;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  date: string;
  customerId?: string;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  type: 'incoming' | 'outgoing';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  lastPurchaseDate?: string;
}

export type AccentColor = 'indigo' | 'emerald' | 'rose' | 'amber' | 'cyan' | 'violet';

export interface BusinessSettings {
  name: string;
  type: string;
  theme: 'light' | 'dark';
  compactMode: boolean;
  accentColor: AccentColor;
  currency: string; // Added: For currency selection (e.g., ₹, $, €)
}

export interface BusinessData {
  products: Product[];
  sales: Sale[];
  expenses: Expense[];
  customers: Customer[];
  settings: BusinessSettings;
}

export type View = 'dashboard' | 'inventory' | 'sales' | 'expenses' | 'customers' | 'reports' | 'settings';
