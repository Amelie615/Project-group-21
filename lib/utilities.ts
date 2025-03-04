import * as PromptSync from "prompt-sync";
import {convert, Unit, BestKind} from 'convert';
import {Recipe} from "../lib/recipe"
import {head, tail, pair} from '../lib/list'
const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export const units: Array<Unit> = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup"] // FIXA SYSTEM
export const unitstring: Array<string> = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup"] // FIXA SYSTEM


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

export function changeUnits(recipe : Recipe, table, flag) {
    
    let unituknow: Array<BestKind | undefined> = ["metric", "imperial"]
    let indexunit = unituknow.indexOf(recipe.unit)
    
    if (flag === "switchUnit") {
        indexunit = (indexunit + 1)%2
    } 

    for (let i = 0; i < recipe.measurements.length; i++) { //För varje measurement
        
        if (unitstring.indexOf(tail(recipe.measurements[i])) !== -1) {
            let theindex:number = unitstring.indexOf(tail(recipe.measurements[i]))
            let theunit: Unit = units[theindex]
            const conversion = convert(head(recipe.measurements[i]), theunit).to("best", unituknow[indexunit])
            recipe.measurements[i] = pair(Math.floor(conversion.quantity), conversion.unit)
        } 
        
        
    }
    
    recipe.unit = unituknow[indexunit]
  
}

export function homogenizeUnits(recipe : Recipe) {
    for (let i = 0; i < recipe.measurements.length; i++) {

    }
}