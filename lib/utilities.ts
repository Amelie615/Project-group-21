import * as PromptSync from "prompt-sync";
import {convert, Unit, BestKind} from 'convert';
import {Recipe} from "../lib/recipe"
import {head, tail, pair} from '../lib/list'
const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export const units: Array<Unit> = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup", "tsp", "tbsp", "teaspoon", "tablespoon"] // FIXA SYSTEM
export const unitstring: Array<string> = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup", "tsp", "tbsp", "teaspoon", "tablespoon"] // FIXA SYSTEM


export function questionnaire(vallista: Array<string>) : number {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~")
    for(let i = 0; i < vallista.length; i++) {
        console.log(i + 1 + " " + vallista[i]);
    }
    console.log(" ")
    let q: string = prompt(">  ")
    console.log(" ")
    return(Number(q));
}

export function getRandomArbitrary(min : number, max : number, keys : Array<number>) {
    let id = Math.floor(Math.random() * (max - min) + min);
    if (keys.indexOf(id) !== -1) {
      id = getRandomArbitrary(min, max, keys)
    }
    return id
}

export function changeUnits(recipe : Recipe, table, flag) { 
    let currentUnit: Array<BestKind | undefined> = ["metric", "imperial"]
    let indexunit = currentUnit.indexOf(recipe.unit)
    if (flag === "switchUnit") {
        indexunit = (indexunit + 1)%2
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