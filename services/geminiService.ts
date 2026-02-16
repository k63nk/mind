
import { GoogleGenAI, Type } from "@google/genai";
import { AIScoreResult, Job, PracticeExercise } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * AI Generator: Tạo dữ liệu thị trường thực tế cho database
 */
export const generateMarketData = async (): Promise<{ jobs: Job[], exercises: PracticeExercise[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Tạo 5 công việc (Jobs) và 5 bài tập (Exercises) thực tế cho sinh viên Việt Nam hiện nay.",
      config: {
        systemInstruction: "Bạn là một chuyên gia dữ liệu thị trường lao động. Tạo ra JSON dữ liệu phong phú, chuyên nghiệp.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            jobs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  companyId: { type: Type.STRING },
                  companyName: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
                  location: { type: Type.STRING },
                  salary: { type: Type.STRING },
                  category: { type: Type.STRING },
                  deadline: { type: Type.STRING },
                  tag: { type: Type.STRING },
                  isHot: { type: Type.BOOLEAN }
                },
                required: ["id", "companyName", "title", "description", "category"]
              }
            },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  company: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  tag: { type: Type.STRING },
                  time: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  diffColor: { type: Type.STRING },
                  category: { type: Type.STRING }
                },
                required: ["id", "title", "company", "description", "difficulty"]
              }
            }
          },
          required: ["jobs", "exercises"]
        }
      }
    });

    return JSON.parse(response.text || "{\"jobs\":[], \"exercises\":[]}");
  } catch (error) {
    console.error("AI Seeding Error:", error);
    return { jobs: [], exercises: [] };
  }
};

export const evaluateCVAgainstJob = async (cvContent: string, jobTitle: string, jobDesc: string): Promise<AIScoreResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Evaluate CV: ${cvContent} for ${jobTitle}. JD: ${jobDesc}`,
      config: {
        systemInstruction: "HR Expert evaluation.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "feedback", "recommendations"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) { return { score: 0, feedback: "Error", recommendations: [] }; }
};

export const evaluatePracticeSolution = async (exerciseTitle: string, solution: string): Promise<AIScoreResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Evaluate Solution: ${solution} for ${exerciseTitle}`,
      config: {
        systemInstruction: "Expert consultant evaluation.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "feedback", "recommendations"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) { return { score: 0, feedback: "Error", recommendations: [] }; }
};

export const evaluateCVContent = async (cvContent: string): Promise<AIScoreResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Evaluate candidate: ${cvContent}`,
      config: {
        systemInstruction: "HR AI Agent scoring 0-100.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "feedback", "recommendations"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) { return { score: 0, feedback: "Error", recommendations: [] }; }
};
