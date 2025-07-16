import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from 'fs';

// LangChain text splitter
async function splitDocument() {
  const text = fs.readFileSync('./podcasts.txt', 'utf-8');
  
  // const splitter = new CharacterTextSplitter({
  //   separator: " ",
  //   chunkSize: 150,
  //   chunkOverlap: 15, // 10% overlap of actual chunk size
  // })

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 150,
    chunkOverlap: 15, // 10% overlap of actual chunk size
  })
  const output = await splitter.createDocuments([text]);
  console.log(output);
}
splitDocument();