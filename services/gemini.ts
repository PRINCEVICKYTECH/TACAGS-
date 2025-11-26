import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ClassLevel, Subject } from "../types";

// Initialize Gemini Client
// NOTE: In a real production app, you should proxy requests through a backend.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

/**
 * Generates a list of curriculum-relevant topics for a specific subject and class.
 */
export const generateSyllabusTopics = async (
  subject: Subject,
  classLevel: ClassLevel
): Promise<string[]> => {
  
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      topics: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of educational topics."
      }
    },
    required: ["topics"]
  };

  const prompt = `
    You are an expert on the Nigerian Universal Basic Education (UBE) and Senior Secondary Education curriculum.
    List 12 distinct, key study topics for the subject "${subject.name}" for a student in "${classLevel}".
    Ensure the topics are ordered logically as they would appear in a standard Nigerian school syllabus (1st Term, 2nd Term, 3rd Term).
    Keep topic titles concise but descriptive.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.4, // Lower temperature for more deterministic/factual output
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    const parsed = JSON.parse(jsonText);
    return parsed.topics || [];
  } catch (error) {
    console.error("Error generating topics:", error);
    // Fallback list in case of error
    return ["Introduction to " + subject.name, "Key Concepts", "Term 1 Review", "Term 2 Review", "Term 3 Review"];
  }
};

/**
 * Generates detailed study notes for a specific topic.
 */
export const generateStudyNotes = async (
  topic: string,
  subject: Subject,
  classLevel: ClassLevel
): Promise<string> => {
  
  const prompt = `
    Act as a highly experienced secondary school teacher in Nigeria.
    Prepare comprehensive, high-quality study notes for the topic: "${topic}".
    Target Audience: ${classLevel} Student.
    Subject: ${subject.name}.
    
    Structure the notes strictly using Markdown with the following sections:
    1. **Introduction**: Briefly introduce the topic.
    2. **Key Definitions**: Define important terms.
    3. **Core Content**: Detailed explanation of the concepts, including local Nigerian examples or context where applicable.
    4. **Examples/Diagram Descriptions**: If applicable, describe clear examples or what a diagram would show.
    5. **Summary**: A quick recap.
    6. **Review Questions**: 5 practice questions for the student (WAEC/NECO style if SS1-SS3).

    Tone: Educational, encouraging, and clear.
    Make extensive use of bullet points, bold text for keywords, and clear headers.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        temperature: 0.5,
      }
    });

    return response.text || "Sorry, I couldn't generate notes at this time. Please try again.";
  } catch (error) {
    console.error("Error generating notes:", error);
    return `### Error\nUnable to generate notes for **${topic}**. Please check your internet connection or try a different topic.`;
  }
};
