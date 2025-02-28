import * as PromptSync from "prompt-sync";
const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export const units = ["ml", "l", "g", "dl"] // FIXA SYSTEM

export function questioneer(vallista: Array<string>) : number {
    for(let i = 0; i < vallista.length; i++) {
        console.log(i + 1 + " " + vallista[i]);
    }
    let q: string = prompt(">  ")
    return(Number(q));
}

export function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}