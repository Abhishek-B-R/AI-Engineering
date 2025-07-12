import { InferenceClient } from "@huggingface/inference";
import 'dotenv/config';

const client = new InferenceClient(process.env.HF_TOKEN);

// const chatCompletion = await client.chatCompletion({
//     provider: "novita",
//     model: "moonshotai/Kimi-K2-Instruct",
//     messages: [
//         {
//             role: "user",
//             content: "The definition of machine learning inference is",
//         },
//     ],
// });


// const chatCompletion = await client.chatCompletion({
//     provider: "fireworks-ai",
//     model: "deepseek-ai/DeepSeek-R1",
//     messages: [
//         {
//             role: "user",
//             content: "What is the capital of France?",
//         },
//     ],
// });
// console.log(chatCompletion.choices[0].message);

const output = await client.translation({
	model: "facebook/mbart-large-50-many-to-many-mmt",
	inputs: "Hello brother, how are you?",
	provider: "hf-inference",
    parameters:{
        src_lang: "en_XX",
        tgt_lang: "te_IN"
    }
});

console.log(output);