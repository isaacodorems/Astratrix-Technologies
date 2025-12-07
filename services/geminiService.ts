import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
// Initialize with safety check (though strict instructions say assume it's there, 
// good practice for frontend resilience if environment is missed during dev)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateAIResponse = async (userPrompt: string): Promise<string> => {
  if (!ai) {
    return "AI Service is currently unavailable. Please check API Key configuration.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are Astra, the AI assistant for Astratrix, an AI solutions company for African businesses. 
    Your tone is professional, futuristic, yet accessible and friendly.
    You should explain how Astratrix helps offline and online businesses.
    
    Key Information about Astratrix:
    - We build AI tools for African businesses (SMEs to Enterprise).
    - Focus on offline-first capabilities, automation, security, and analytics.
    - Located in Port Harcourt, Nigeria.
    - Mission: Make AI accessible to everyone.
    
    If asked about specific tools, refer to:
    - FXInsight AI (Forex)
    - RetailBot Pro (Offline retail)
    - SecureEye Africa (Security)
    - Creator Studio AI (Media)
    
    Keep responses concise (under 100 words) unless asked for details.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the neural network. Please try again later.";
  }
};
