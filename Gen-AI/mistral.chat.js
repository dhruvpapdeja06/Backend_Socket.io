import 'dotenv/config';
import readline from 'readline/promises';


import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from 'langchain';

const model = new ChatMistralAI({
    model : 'mistral-small-latest',
    temperature: 0.7,
})

// create terminal interface
const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout,
})

console.log("Welcome to Chat App");

const messages = [];

while(true){
    
    const userInput = await rl.question("\x1b[32mYou:\x1b[0m")

    if(userInput.toLowerCase() == "exit"){
        console.log("Bye");
        rl.close();
        break;
    }

    messages.push(new HumanMessage(userInput));

    const response = await model.invoke(messages);

    console.log(`\x1b[34mAI:\x1b[0m ${response.content}`)

}

rl.close();