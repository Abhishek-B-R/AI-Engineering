import OpenAI from 'openai';
import 'dotenv/config';
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'What is the capital of France?' },
    { role: 'assistant', content: 'The capital of France is Paris.' },
    { role: 'user', content: 'What is the population of Paris?' }
]

const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages
});

console.log(response.choices[0].message.content);