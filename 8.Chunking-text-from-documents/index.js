import { openai, supabase } from './config.js';
import fs from 'fs';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

/*
  Challenge: Text Splitters, Embeddings, and Vector Databases!
    1. Use LangChain to split the content in movies.txt into smaller chunks.
    2. Use OpenAI's Embedding model to create an embedding for each chunk.
    3. Insert all text chunks and their corresponding embedding
       into a Supabase database table.
 */

/* Split movies.txt into text chunks.
Return LangChain's "output" – the array of Document objects. */
async function splitDocument() {
  try{
    const text = fs.readFileSync("movies.txt", 'utf-8');
    if(text.length === 0) {
      throw new Error("File is empty");
    }
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 150,
      chunkOverlap: 15, // 10% overlap of actual chunk size
    });
    
    const output = await splitter.createDocuments([text]);
    return output;
  }catch(e){
    console.error('There was an issue reading the file:');
    throw e;
  }
}

/* Create an embedding from each text chunk.
Store all embeddings and corresponding text in Supabase. */
async function createAndStoreEmbeddings() {
  try{
    const chunkData = await splitDocument();

    // for (const chunk of chunkData) {
    //   const embedding = await openai.embeddings.create({
    //     model: "text-embedding-ada-002",
    //     input: chunk.pageContent,
    //   });

    //   await supabase
    //     .from("embeddings")
    //     .insert([
    //       {
    //         text: chunk.pageContent,
    //         embedding: embedding.data[0].embedding,
    //       },
    //     ]);
    // }
    // this above code bcse it waits for each embedding to be created
    // and stored before moving to the next one, which is inefficient.

    // Instead, we can use Promise.all to handle all embeddings concurrently.
    const data = await Promise.all(
      chunkData.map(async (chunk)=>{
        const embedding = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: chunk.pageContent,
        });
        return {
          content: chunk,
          embedding: embedding.data[0].embedding,
        }
      })
    )
    const {error} = await supabase.from("embeddings").insert(data);
    if(error) {
      throw new Error('There was an issue storing embeddings:');
    }
    console.log("Embeddings created and stored successfully.");
  }catch(e){
    console.error('ERROR: ' + e.message);
  }

}
createAndStoreEmbeddings()