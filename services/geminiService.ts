
import { GoogleGenAI } from "@google/genai";
import { BusinessData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBusinessInsights = async (data: BusinessData): Promise<string> => {
  const prompt = `
    Critically analyze this business data and provide EXACTLY 3 short bullet points. 
    Each bullet must be under 12 words. 
    Focus on: 1. Top seller, 2. Financial health, 3. Critical stock warning.
    No conversational filler.

    Data:
    Inventory: ${JSON.stringify(data.products.map(p => ({ n: p.name, s: p.stock })))}
    Sales: ${data.sales.length} records, Total Revenue: $${data.sales.reduce((a, b) => a + b.totalAmount, 0)}
    Expenses: $${data.expenses.reduce((a, b) => a + b.amount, 0)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a ultra-concise business logic unit. Output ONLY 3 short bullet points. Highlight figures. Do not exceed 3 lines total.",
        temperature: 0.3,
      }
    });

    return response.text || "No insights available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI system offline.";
  }
};
