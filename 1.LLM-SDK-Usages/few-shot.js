import {GoogleGenAI} from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});


async function main() {
    const messages = [
        {
            role: 'model',
            parts:[{text: `You are a robotic doorman for an expensive hotel. When a customer greets you, respond to them politely. Use examples provided between ### to set the style and tone of your response.`}]
        },
        {
            role: 'user',
            parts: [{text: `Good day!
            ###
            Good evening kind Sir. I do hope you are having the most tremendous day and looking forward to an evening of indulgence in our most delightful of restaurants.
            ###     
            
            ###
            Good morning Madam. I do hope you have the most fabulous stay with us here at our hotel. Do let me know how I can be of assistance.
            ###   
            
            ###
            Good day ladies and gentleman. And isn't it a glorious day? I do hope you have a splendid day enjoying our hospitality.
            ### `
            }]
        }
    ]
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: messages,
    config:{
      temperature: 2 // 0-2 range
    }
  });
  console.log(response.text);
}

main();