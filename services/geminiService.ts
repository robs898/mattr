import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MattrResponse } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is not set in the environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const ethicalSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    shortAnswer: {
      type: Type.STRING,
      description: "A concise answer (Yes, No, or caveat). Keep it under 20 words.",
    },
    needsClarification: {
      type: Type.BOOLEAN,
      description: "True if the model absolutely needs more info to give a minimal ethical judgment. False if it can proceed with general assumptions.",
    },
    clarificationQuestion: {
      type: Type.STRING,
      description: "The question to ask the user if clarification is needed.",
    },
    analysis: {
      type: Type.OBJECT,
      description: "The application of the ethical framework.",
      properties: {
        ruleConsequentialism: {
          type: Type.STRING,
          description: "Analysis based on principles whose universal laws make things go best.",
        },
        kantianContractualism: {
          type: Type.STRING,
          description: "Analysis based on principles everyone could rationally will to be universal laws.",
        },
        scanlonianContractualism: {
          type: Type.STRING,
          description: "Analysis based on principles no one could reasonably reject.",
        },
        synthesis: {
          type: Type.STRING,
          description: "How these three converge to the final judgment.",
        },
      },
      required: ["ruleConsequentialism", "kantianContractualism", "scanlonianContractualism", "synthesis"],
    },
  },
  required: ["shortAnswer", "needsClarification"],
};

const SYSTEM_INSTRUCTION = `
You are Mattr, an expert AI ethics consultant.

Your goal is to resolve moral conundrums by checking if an act is disallowed by a principle that is:
1. One of the principles whose being universal laws would make things go best (Rule Consequentialism).
2. One of the only principles whose being universal laws everyone could rationally will (Kantian Contractualism).
3. A principle that no one could reasonably reject (Scanlonian Contractualism).

Process:
1. Receive the user's moral question.
2. Determine if you have enough context to form a general ethical judgment. 
   - If the question is extremely vague (e.g., "Should I do it?"), ask for clarification.
   - If the question has specific details (e.g., "Should I buy a diesel car?"), DO NOT ask for clarification unless absolutely critical. Prefer to make reasonable assumptions (e.g., assuming average usage) and provide a caveats in the answer instead of stalling.
3. Apply the triple ethical framework carefully.
4. Output valid JSON.

Tone:
- Objective, thoughtful, philosophical but accessible.
- The 'shortAnswer' must be direct.
`;

export const sendMessageToGemini = async (
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string
): Promise<MattrResponse> => {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-pro-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: ethicalSchema,
        thinkingConfig: { thinkingBudget: 2048 }, // Allow deep thought for ethical analysis
      },
      history: history,
    });

    const result = await chat.sendMessage({ message: newMessage });
    const text = result.text;

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    try {
      const parsed: MattrResponse = JSON.parse(text);
      return parsed;
    } catch (e) {
      console.error("Failed to parse JSON", text);
      return {
        shortAnswer: "I encountered an error analyzing your request.",
        needsClarification: false,
        analysis: {
          ruleConsequentialism: "Error",
          kantianContractualism: "Error",
          scanlonianContractualism: "Error",
          synthesis: "Please try again."
        }
      };
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};