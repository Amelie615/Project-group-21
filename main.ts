import * as PromptSync from "prompt-sync";
import {pair, head, tail, Pair,} from './lib/list';
import { hash_id, ph_empty, HashFunction, ph_insert, ph_lookup } from "./lib/hashtables";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

type Measurements = Array<Pair<Number, String>>
type Ingredients = Array<string> 
type Recipe = {
    name: string,
    id: number,
    ingredients: Ingredients,
    measurements: Measurements,
    servings: number,
    tags: Array<string>,
    instructions: string
} 

const units = ["ml", "l", "g", "dl"] // FIXA SYSTEM

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function cookbook(tag, hashedTable, keysToHashed) {
    while (true) {
        const test = questioneer(["Create recipe", "Search recipe", "Close cookbook"])
    switch(test) {
        case(1):
            createRecipe(hashedTable, keysToHashed)
            break;
        case(2):

            const names : Array<string> = []
            keysToHashed.forEach(element => {
                names.push(head(element))
            });
            
            //viewRecipe(tail(keysToHashed[questioneer(names)-1]), hashedTable) 
            viewRecipe(searchRecipe(keysToHashed, hashedTable), hashedTable)
            break;
        case(3):
            return false
        default:
            console.log("Invalid input")
    }
}}

function questioneer(vallista: Array<string>) : number {
    for(let i = 0; i < vallista.length; i++) {
        console.log(i + 1 + " " + vallista[i]);
    }
    let q: string = prompt(">  ")
    return(Number(q));
}

function main() {
    const hashedTable = ph_empty(13, hash_id)
    let keysToHashed : Array<Pair<string, Number>>= [] //pair(name, id)
    while (true) {   
        const test = questioneer(["Open", "Quit"])
        switch(test) {
            case(1): 
                cookbook("tag", hashedTable, keysToHashed) //Använder inte tagen just nu så bara placeholder
                break
            
            case(2):
                return false;
            
            default: console.log("default")
        }
        
    }
    }
 

const firstRecipe = {name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [pair(200, "g"), pair(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk."}

main();
