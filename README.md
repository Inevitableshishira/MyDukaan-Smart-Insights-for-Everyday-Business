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
- **Deployment**: Netlify (Global CDN)

## 📦 Deployment (Netlify)

This project is optimized for deployment on **Netlify**.

1. **GitHub Connection**:
   - Push your code to a GitHub repository.
   - Log in to [Netlify.com](https://netlify.com) and click **"Add new site"** > **"Import an existing project"**.
   - Select your repository.

2. **Build Settings**:
   - Netlify will auto-detect Vite settings:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`

3. **Environment Variables** (Crucial for AI features):
   - In the Netlify Dashboard, go to **Site Settings** > **Environment variables**.
   - Click **"Add a variable"**.
   - **Key**: `API_KEY`
   - **Value**: (Paste your Google Gemini API Key here).

4. **SSL & Custom Domains**:
   - Netlify automatically provides an SSL certificate and a `.netlify.app` domain.

## 🧠 Design Philosophy
I built **MyDukaan** with the goal of "Digital Minimalism." Small business owners often find enterprise software too complex. This app prioritizes speed—getting from "Item Entry" to "Sale Logged" in as few clicks as possible, while using AI to handle the complex task of data analysis.

## 📄 License
MIT License - Created for educational and professional portfolio use.