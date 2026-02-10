
import { GoogleGenAI, Type } from "@google/genai";
import { AIScoreResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const evaluateCVContent = async (cvContent: string): Promise<AIScoreResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Evaluate the following candidate profile for a general tech role. Provide a score out of 100, specific constructive feedback, and 3-5 actionable recommendations for improvement. Profile content: ${cvContent}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "A score from 0 to 100 based on profile quality." },
            feedback: { type: Type.STRING, description: "A brief summary of strengths and weaknesses." },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of actionable steps to improve the profile."
            }
          },
          required: ["score", "feedback", "recommendations"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      score: result.score || 0,
      feedback: result.feedback || "Unable to evaluate at this time.",
      recommendations: result.recommendations || []
    };
  } catch (error) {
    console.error("Error evaluating CV:", error);
    return {
      score: 0,
      feedback: "Lỗi kết nối AI. Vui lòng thử lại sau.",
      recommendations: []
    };
  }
};
