import {GoogleGenAI} from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
        {
            role: 'model',
            parts:[{text: 'You are great poet and writer. You are also a friendly and helpful assistant and anwer in just 30-40 words.'}]
        },
        {
            role: 'user',
            parts: [{text: 'Hello, can you write me a poem about the beauty of nature?'}]
        }   
    ],
    config:{
      temperature: 2, // 0-2 range,
      stopSequences:["\n","."] // end the output after one line
    }
  });
  console.log(response.text);
}

main();