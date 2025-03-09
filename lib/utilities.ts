import * as PromptSync from "prompt-sync";
import {convert, Unit, BestKind} from 'convert';
import {Recipe} from "../lib/recipe"
import {head, tail, pair, Pair} from '../lib/list'
import { ProbingHashtable } from "./hashtables";
import { Cookbook, CookbookKeys } from "../main";
const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export const units: Array<Unit> = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups",
                                   "pounds", "pound", "lb", "ounces", "ounce", "cup", "qt",
                                   "pt", "liters", "deciliters", "deciliter", "milliliters",
                                   "milliliter", "gram", "kilogram", "liter", "gal", "gallons"]
                                   
export const unitstring: Array<string> = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups",
                                          "pounds", "pound", "lb", "ounces", "ounce", "cup", "qt",
                                          "pt", "liters", "deciliters", "deciliter", "milliliters",
                                          "milliliter", "gram", "kilogram", "liter", "gal", "gallons"]


/**
 * creates a list of options to choose from
 * @param {Array<string>} options the options to be printed
 * @returns the number for a specific option
 */
export function questionnaire(options: Array<string>) : number {
    line()
    for(let i = 0; i < options.length; i++) {
        console.log(i + 1 + " " + options[i]);
    }
    line()
    let chosenOp: string = prompt(">  ")
    console.log(" ")
    return(Number(chosenOp));
}

/**
 * creates a random number between a chosen min and max value
 * @param {number} min the minimun value for the number
 * @param {number} max the maximum value for the number
 * @param {CookbookKeys} keys the keys and names for the recipes in the cookbook
 * @returns a random number
 */
export function getRandomArbitrary(min : number, max : number, keys : Array<Pair<string, number>>): number {
    let id: number = Math.floor(Math.random() * (max - min) + min);
    for (let i = 0; i < keys.length; i++) {
        if (tail(keys[i]) === id) {
            id = getRandomArbitrary(min, max, keys)
        }
    }
    return id
}
/**
 * Rounds the value number with a specific amount of decimals
 * @param {number} value the current recipe
 * @param {number} precision the cookbook hashtable
 * @returns a rounded number with precision amount of decimals
 */
export function round(value: number, precision: number): number {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

/**
 * changes units of ingredients
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 * @param {string} flag a flag that indicates how the units should be handled (either "" or "switchUnit")
 */
export function changeUnits(recipe : Recipe, cookbook: Cookbook, flag: string): void { 
    let currentUnit: Array<BestKind | undefined> = ["metric", "imperial"]
    let indexunit: number = recipe.unit === "metric"? 0: 1
    if (flag === "switchUnit") {
        indexunit = indexunit === 1? 0: 1
    } 
    for (let i = 0; i < recipe.measurements.length; i++) { //For each measurement
        if (unitstring.indexOf(tail(recipe.measurements[i])) !== -1) {
            let stringIndex: number = unitstring.indexOf(tail(recipe.measurements[i]))
            let newUnit: Unit = units[stringIndex]
            const conversion = convert(head(recipe.measurements[i]), newUnit).to("best", currentUnit[indexunit])
            recipe.measurements[i] = pair(parseFloat(conversion.quantity.toFixed(1)), conversion.unit)
        } 
    }
    recipe.unit = currentUnit[indexunit]
}


/**
 * checks if an input is valid
 * @example validAnswer("choose name: >", "", [])
 * user input = Kanelbullar
 * returns "Kanelbullar"
 * @param {string} usedPrompt the chosen prompt for the input
 * @param {string} flag indicates what type of answer is valid
 * @returns a non empty input
 */
type K = number | string | undefined
export function validAnswer(usedPrompt: string, flag: string, opt: Array<K>): string {
    let wronganswer: boolean = true
    let answer: string = ""
    while (wronganswer) {
        answer = prompt(usedPrompt)
        let removeWhiteSpace: string = ""
        if (flag === "num") {
            let removeLetandSpace = answer.match(/(\d+)/)
            removeWhiteSpace = removeLetandSpace === null? "": removeLetandSpace[1]
        } else if (flag === "") {
            removeWhiteSpace = answer.replace(/\s/g,"");
        } else if (flag === "opt") {
            removeWhiteSpace = ""
            opt.forEach(element => {
                if (element === answer) {removeWhiteSpace = answer.trimEnd()}
            });
        }
        if (removeWhiteSpace === "") {
            console.log("Invalid input.")
            continue
        } else {
            wronganswer = false
        }
    }   
    return answer
}

//Prints line for UI
export function line(): void {
    console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")
}

/**
 * converts string to Unit type
 * @param {string} unit the string to convert
 * @returns the corresponding unit to given string, or the string if no equivalent unit exists
 */
export function stringToUnit (unit: string): Unit | string {
    let newUnit: Unit = "ml"
    for (let i = 0; i < unitstring.length; i++) {
        if (unit.toLowerCase() === unitstring[i].toLowerCase()) {
            newUnit = units[i]
            return newUnit
        }
    }
    return unit
} 