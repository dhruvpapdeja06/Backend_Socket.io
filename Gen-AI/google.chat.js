import 'dotenv/config';

import { ChatGoogle } from '@langchain/google'
import { HumanMessage } from 'langchain';
import readline from 'readline/promises';

const model = new ChatGoogle({
    model : "gemini-2.5-flash",
    maxRetries: 2,
})


const rl = new readline.createInterface({
    input : process.stdin,
    output: process.stdout
})

const messages = [];


console.log("Welcome to the Perplexity");

while(true){

    const userInput = await rl.question('\x1b[32mHuman:\x1b[0m');

    if(userInput.toLowerCase() == "exit"){
        console.log("Chat terminated");
        rl.close();
        break;
    }

    messages.push(new HumanMessage(userInput));

    let response;
    try{
        response = await model.invoke(messages);
    }
    catch(error){
        console.log("Quoa Exhausted");
        continue;
    }
    console.log(`\x1b[31mAI:\x1b[0m  ${response.content}`);

}

rl.close();