
import { GoogleGenAI } from "@google/genai";
import { BusinessData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBusinessInsights = async (data: BusinessData): Promise<string> => {
  const prompt = `
    As a Senior Business Analyst, critically evaluate this business data.
    Provide exactly 3 bullet points of "Explainable Intelligence":
    1. REVENUE VELOCITY: Contrast sales count against total stock. Is turnover healthy?
    2. OVERHEAD LEAKAGE: Identify if expenses are eating into margins.
    3. PRODUCT AGING: Name one specific product that needs more movement or a restock.

    Constraints: 
    - Max 15 words per bullet.
    - Use professional, punchy language.
    - Focus on actionable figures.

    Data Payload:
    - Industry: ${data.settings.type}
    - Inventory: ${JSON.stringify(data.products.map(p => ({ n: p.name, s: p.stock, min: p.minStockLevel })))}
    - Total Revenue: ${data.settings.currency}${data.sales.reduce((a, b) => a + b.totalAmount, 0)}
    - Total Outflows: ${data.settings.currency}${data.expenses.filter(e => e.type === 'outgoing').reduce((a, b) => a + b.amount, 0)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert business logic processor. Output ONLY 3 bullet points. No conversational greetings. Use the provided currency symbol.",
        temperature: 0.2, // Lower temperature for more factual consistency
      }
    });

    return response.text || "AI analysis unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI insights offline. Check API connectivity.";
  }
};
