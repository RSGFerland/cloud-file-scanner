
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getOpsAnalysis = async (stats: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the OpsVault Lead Architect. Analyze these IT stats: ${JSON.stringify(stats)}. 
      Provide a concise 2-sentence strategy for space reclamation and vault health optimization. 
      Use a professional yet slightly encouraging tone.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini analysis failed", error);
    return "Vault health is stable. Proceed with regular archival cycles.";
  }
};
