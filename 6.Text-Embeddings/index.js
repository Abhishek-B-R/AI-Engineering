import openai from './config.js';

// trial 1
// async function main() {
//   const embedding = await openai.embeddings.create({
//     model: "text-embedding-ada-002",
//     input: "Hello, world!",
//   });
//   console.log(embedding);
//   console.log(embedding.data[0].embedding);
// }
// main();


// trial 2
/*
  Challenge: Pair text with its embedding
    - For each text input, create an object with 
      a 'content' and 'embedding' property
    - The value of 'content' should be the text
    - The value of 'embedding' should be the vector embedding for that text
*/

const content = [
  "Beyond Mars: speculating life on distant planets.",
  "Jazz under stars: a night in New Orleans' music scene.",
  "Mysteries of the deep: exploring uncharted ocean caves.",
  "Rediscovering lost melodies: the rebirth of vinyl culture.",
  "Tales from the tech frontier: decoding AI ethics.",
]; 

let textEmbeddingPairs = []
async function main() {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: content,
  });
  embedding.data.forEach((item,index)=>{
    textEmbeddingPairs.push({
      content: content[index],
      embedding: item.embedding
    });                                                         
  })
  console.log(textEmbeddingPairs);
}
main();
// charged me 0.000006 USD 