import * as PromptSync from "prompt-sync";
import {convert, Unit, BestKind} from 'convert';
import {Recipe} from "../lib/recipe"
import {head, tail, pair, Pair} from '../lib/list'
import { ProbingHashtable } from "./hashtables";
import { Cookbook } from "../main";
const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export const units: Array<Unit> = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup", "tsp", "tbsp", "teaspoon", "tablespoon"] // FIXA SYSTEM
export const unitstring: Array<string> = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup", "tsp", "tbsp", "teaspoon", "tablespoon"] // FIXA SYSTEM


export function questionnaire(vallista: Array<string>) : number {
    line()
    for(let i = 0; i < vallista.length; i++) {
        console.log(i + 1 + " " + vallista[i]);
    }
    line()
    let q: string = prompt(">  ")
    console.log(" ")
    return(Number(q));
}

export function getRandomArbitrary(min : number, max : number, keys : Array<Pair<string, number>>): number {
    let id: number = Math.floor(Math.random() * (max - min) + min);
    for (let i = 0; i < keys.length; i++) {
        if (tail(keys[i]) === id) {
            id = getRandomArbitrary(min, max, keys)
        }
    }
    return id
}

export function changeUnits(recipe : Recipe, table: Cookbook, flag: string): void { 
    let currentUnit: Array<BestKind | undefined> = ["metric", "imperial"]
    let indexunit: number = recipe.unit === "metric"? 0: 1
    if (flag === "switchUnit") {
        // indexunit = (indexunit + 1) % 2
        indexunit = indexunit === 1? 0: 1
    } 
    for (let i = 0; i < recipe.measurements.length; i++) { //För varje measurement
        if (unitstring.indexOf(tail(recipe.measurements[i])) !== -1) {
            let stringIndex:number = unitstring.indexOf(tail(recipe.measurements[i]))
            let newUnit: Unit = units[stringIndex]
            const conversion = convert(head(recipe.measurements[i]), newUnit).to("best", currentUnit[indexunit])
            recipe.measurements[i] = pair(parseFloat(conversion.quantity.toFixed(1)), conversion.unit)
        } 
    }
    recipe.unit = currentUnit[indexunit]
}

export function validAnswer(usedPrompt: string, flag: string): string {
    const answer: string = prompt(usedPrompt)
    let removeWhiteSpace: string = ""
    if (flag === "num") {
        let removeLetandSpace = answer.match(/(\d+)/)
        removeWhiteSpace = removeLetandSpace === null? "": removeLetandSpace[1]
    } else {
        removeWhiteSpace = answer.replace(/\s/g,"");
    }
    if (removeWhiteSpace === "") {
        console.log("invalid input.")
        validAnswer(usedPrompt, flag)
    }
    return answer
}

export function line(): void {
    console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")
}