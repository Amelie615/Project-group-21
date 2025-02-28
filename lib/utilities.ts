import * as PromptSync from "prompt-sync";
import {convert, Unit} from 'convert';
import {Recipe} from "../lib/recipe"
import {head, tail, pair} from '../lib/list'
const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export const units: Array<Unit> = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup"] // FIXA SYSTEM

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

export function changeUnits(recipe : Recipe, table) {
    if (recipe.unit === "metric") {
        for (let i = 0; i < recipe.measurements.length; i++) {
            const conversion = convert(head(recipe.measurements[i]), tail(recipe.measurements[i])).to("best", "imperial")
            recipe.measurements[i] = pair(conversion.quantity, conversion.unit)
            console.log(recipe.measurements[i])
        }
    } else if (recipe.unit === "imperial") {
        for (let i = 0; i < recipe.measurements.length; i++) {
            const conversion = convert(head(recipe.measurements[i]), tail(recipe.measurements[i])).to("best", "metric")
            recipe.measurements[i] = pair(Math.floor(conversion.quantity), conversion.unit)
            console.log(recipe.measurements[i])
        }
    }
}