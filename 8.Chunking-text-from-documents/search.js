import { openai, supabase } from './config.js';

// Query about our movie data
const query = "The movie with that actor from Castaway";
main(query);

async function main(input) {
  try{
    const embedding = await createEmbedding(input);
    const match = await findNearestMatch(embedding);
    await getChatCompletion(match, input);
  }catch(e){
    console.error('Error in main function:', e.message);
  }
}

// Create an embedding vector representing the query
async function createEmbedding(input) {
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input
  });
  return embeddingResponse.data[0].embedding;
}

/*
  Challenge: Return and manage multiple matches
    - Return at least 3 matches from the database table
    - Combine all of the matching text into 1 string
*/

// Query Supabase and return a semantically matching text chunk
async function findNearestMatch(embedding) {
  const { data } = await supabase.rpc('match_embeddings', {
    query_embedding: embedding,
    match_threshold: 0.50,
    match_count: 3
  });
  const finalText = data.map(item => item.text).join("\n")
  return finalText;
}

// Use OpenAI to make the response conversational
const chatMessages = [{
    role: 'system',
    content: `You are an enthusiastic movie expert who loves recommending movies to peop le. You will be given two pieces of information - some context about movies and a question. Your main job is to formulate a short answer to the question using the provided context. The context contains 3 movies, you have to mention all of them in your response, but in a better and more presentable way. If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer.` 
}];

async function getChatCompletion(text, query) {
  chatMessages.push({
    role: 'user',
    content: `Context: ${text} Question: ${query}`
  });
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: chatMessages,
    temperature: 0.5,
    frequency_penalty: 0.5
  });
  chatMessages.push(response.choices[0].message);  // adding the response to the chat history
  // so that ai remembers the conversation
  console.log(response.choices[0].message.content);
}