
# 🛍️ MyDukaan: The Smart Business Terminal
> **Smart Insights for Everyday Business...**

**MyDukaan** is a high-performance, responsive web application designed to help small businesses (cafes, retail, pharmacies) manage their entire operation in one place. It replaces manual ledgers with a digital "Command Center" featuring real-time inventory tracking, a high-speed POS interface, and AI-driven business analytics.

## 🚀 Key Features

- **Multi-Industry Templates**: Adaptive UI and data structures for Cafes, Hardware Stores, Boutiques, and Pharmacies.
- **Express POS Interface**: A high-efficiency checkout system with real-time stock deduction and inventory alerts.
- **AI Business Intelligence**: Integrated with the **Google Gemini API** to provide daily insights on sales trends, financial health, and stock warnings.
- **Resource Catalog**: Advanced inventory management with low-stock thresholds and valuation tracking.
- **Financial Ledger**: Clean tracking of income vs. expenditure with automated net-flow calculation.
- **Customer Directory**: CRM functionality to track customer lifetime value (LTV) and relationship history.
- **Dark/Light Mode**: Fully themeable UI with a "Compact Mode" for high-density professional environments.

## 🛠️ Tech Stack

- **Frontend**: React 19 (Hooks, Functional Components)
- **Styling**: Tailwind CSS (Glassmorphism & Custom Animations)
- **Icons**: Lucide React
- **Data Visualization**: Recharts (Custom Area and Pie charts)
- **AI Engine**: Google Gemini 3 Flash (via @google/genai)
- **Persistence**: LocalStorage API for offline-first capability
- **Deployment**: Vercel (Edge Network Optimized)

## 📦 Deployment (Vercel)

This project is optimized for deployment on **Vercel**. 

1. **Connect GitHub**: Import the repository to Vercel.
2. **Environment Variables**: Add `API_KEY` in the Vercel Dashboard under Project Settings > Environment Variables.
3. **Build Settings**: The project uses Vite. Vercel will auto-detect the configuration.
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Security**: Ensure you restrict your Google AI API key to your Vercel deployment domain in the Google Cloud Console for production security.

## 🧠 Design Philosophy
I built **MyDukaan** with the goal of "Digital Minimalism." Small business owners often find enterprise software too complex. This app prioritizes speed—getting from "Item Entry" to "Sale Logged" in as few clicks as possible, while using AI to handle the complex task of data analysis.

## 📄 License
MIT License - Created for educational and professional portfolio use.
