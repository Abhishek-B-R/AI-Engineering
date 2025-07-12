import { InferenceClient } from "@huggingface/inference";
import 'dotenv/config';

const client = new InferenceClient(process.env.HF_TOKEN);

const audio = await client.textToSpeech({
    provider: "replicate",
    model: "moonshotai/Kimi-Audio-7B-Instruct",
	inputs: "The answer to the universe is 42",
});

console.log(audio);
const audioElement = document.getElementById("speech");
const speechUrl = URL.createObjectURL(audio);
audioElement.src = speechUrl;