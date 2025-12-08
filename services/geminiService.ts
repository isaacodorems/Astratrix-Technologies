
import { GoogleGenAI, Type, FunctionDeclaration, Content } from "@google/genai";

const apiKey = process.env.API_KEY;
// Initialize with safety check
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const bookAppointmentTool: FunctionDeclaration = {
  name: "bookAppointment",
  description: "Book a consultation appointment. Use this when the user confirms they want to meet and provides their details.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Name of the user" },
      contact: { type: Type.STRING, description: "Phone number or email" },
      dateTime: { type: Type.STRING, description: "Preferred date and time" },
      reason: { type: Type.STRING, description: "Purpose of the appointment" },
    },
    required: ["name", "contact", "dateTime"],
  },
};

const sendEmailTool: FunctionDeclaration = {
  name: "sendEmail",
  description: "Send an email alert to the Astratrix sales team about a potential customer or inquiry.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      customerName: { type: Type.STRING, description: "Name of the customer" },
      contactInfo: { type: Type.STRING, description: "Contact details" },
      inquirySummary: { type: Type.STRING, description: "Summary of what they need" },
    },
    required: ["inquirySummary"],
  },
};

const systemInstruction = `You are Astra, a senior business consultant at Astratrix Technologies. 
Your goal is to have a natural, human-like conversation to understand the user's business challenges and convert them into a potential client.

**CRITICAL BEHAVIOR RULES:**
1. **NO REPETITION:** Do NOT repeat "I am Astra" or the full company description in every message. Assume the user knows who you are after the first time.
2. **BE PROACTIVE:** Ask probing questions. e.g., "Do you struggle with internet reliability?" or "Are you looking to automate your sales?"
3. **CONCISE:** Keep responses short (under 3 sentences) unless explaining a complex solution.
4. **TOOLS:** 
   - Use 'bookAppointment' if the user agrees to a meeting.
   - Use 'sendEmail' if they want someone to contact them later.

**KNOWLEDGE BASE:**
- **Products:** 
  - *RetailBot Pro* (Offline inventory for shops).
  - *FXInsight* (Forex trading).
  - *SecureEye Africa* (AI CCTV).
  - *RAILearnin* (Hybrid AI learning platform).
  - *PawSome Picks* (AI-powered pet store & assistant).
  - *TubeGenius* (YouTube automation & scripts).
  - *Course Architect* (Curriculum generator).
  - *Revisionary* (Innovation strategist & researcher).
  - *NexusG* (Business concept generator).
  - *CareBridge* (Telehealth platform).
  - *ApexRoute* (Logistics optimization).
  - *CARticle* (Document to content).
  - *VitalCare* (Health & supplement recommendations).
- **Location:** Port Harcourt, Nigeria.
`;

export const generateAIResponse = async (history: {role: string, text: string}[]): Promise<string> => {
  if (!ai) {
    return "AI Service is currently unavailable. Please check API Key configuration.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Convert history to 'contents' format, ensuring no empty parts
    const contents: Content[] = history
      .filter(msg => msg.text && msg.text.trim().length > 0)
      .map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

    if (contents.length === 0) {
        return "I'm listening. How can I help?";
    }

    const result = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ functionDeclarations: [bookAppointmentTool, sendEmailTool] }],
      }
    });

    // Handle Tool Calls
    const toolCalls = result.candidates?.[0]?.content?.parts?.filter(p => p.functionCall);
    
    if (toolCalls && toolCalls.length > 0) {
      // Execute tools (simulated)
      const functionResponses = toolCalls.map(part => {
        const call = part.functionCall!;
        console.log(`[Tool Execution] ${call.name}`, call.args);
        
        // Return a mock success response to the model
        let responseContent = { result: "Action executed successfully." };
        
        if (call.name === 'bookAppointment') {
           responseContent = { result: "Appointment booked. PLEASE CONFIRM THIS TO THE USER." };
        } else if (call.name === 'sendEmail') {
           responseContent = { result: "Email sent to sales team. PLEASE CONFIRM THIS TO THE USER." };
        }

        return {
          id: call.id,
          name: call.name,
          response: responseContent
        };
      });

      // Send the tool output back to the model to get the final natural language response
      const finalResult = await ai.models.generateContent({
        model: model,
        contents: [
          ...contents, 
          result.candidates![0].content, // The assistant's message with the function call
          { role: 'tool', parts: functionResponses.map(fr => ({ functionResponse: fr })) } // Our tool response
        ],
         config: { systemInstruction }
      });
      
      return finalResult.text || "Action completed.";
    }

    return result.text || "I apologize, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm experiencing a brief connection issue. Please try asking again.";
  }
};