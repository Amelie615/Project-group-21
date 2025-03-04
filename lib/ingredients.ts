import {pair, head, tail, Pair,} from './list';
import { hash_id, ph_empty, HashFunction, ph_insert, ph_lookup, ProbingHashtable } from "./hashtables";
import * as PromptSync from "prompt-sync";
import {questioneer, getRandomArbitrary, units, changeUnits } from './utilities';
import {convert, Unit, BestKind} from 'convert';
import {Recipe, viewRecipe} from "../lib/recipe"

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export function changeServing(recipe: Recipe, table) {                             // Fixa errors med wacky inputs
    console.log("Recipe currently serves " + recipe.servings + " people")
    let newServings: number = parseInt(prompt("New serving size: "), 10)
    for(let i = 0; i < recipe.measurements.length; i ++) {
        let currentIngredient: number = head(recipe.measurements[i])
        recipe.measurements[i] = pair(currentIngredient/recipe.servings * newServings, tail(recipe.measurements[i]))
    }
    recipe.servings = newServings
    console.log("The new recipe: \n")
    viewRecipe(recipe)
}


export function removeIngredient(recipe: Recipe, ingredientSearch: string) {
    let indexToRemove: number = recipe.ingredients.indexOf(ingredientSearch)
    if(indexToRemove === 1) {
        console.log("Removed " + recipe.ingredients[indexToRemove] + " from " + recipe.name + "\n")
        recipe.ingredients.splice(indexToRemove, 1)
        recipe.measurements.splice(indexToRemove, 1)
    } else { console.log("Ingredient doesn't exist") }
}

export function addIngredient(recipe: Recipe) {
    //recipe.ingredients.push(what ever vi returnar från makeIngredient())
    //recipe.measurements.puch(what ever vi returnar från makeIngredient())
}


export function changeIngredients(recipe: Recipe, ingredientSearch: string) { 
    while(true) {
        let indexToChange: number = recipe.ingredients.indexOf(ingredientSearch)
        if(indexToChange === 1) {
            console.log("Current ingredient: " + recipe.ingredients[indexToChange] + " " + recipe.measurements[indexToChange])
            const newIngredient : string = prompt("Name a ingredient > ");
            recipe.ingredients[indexToChange]
            const ourString = "Enter amount of ".concat(newIngredient, "> ")
            const inputMeasurements = prompt(ourString)
            const integersFromMeasurements : number = inputMeasurements.match(/(\d+)/)[1]
            let lettersFromMeasurements: Unit | string = "" //ful default
            for (let i = 0; i < units.length; i++) {
                if (inputMeasurements.search(units[i]) === -1) {
                    continue
                } else {
                    lettersFromMeasurements = units[i]
                }
            }
            recipe.measurements[indexToChange] = pair(integersFromMeasurements, lettersFromMeasurements) 
        } else { console.log("Ingredient doesn't exist") }
        console.log("Do you want to change another ingredient? y/n")
        if(prompt("> ").toLowerCase() !== "y") {
            return false
        }
    }
    //ska bli
    //let indexToChange: number = recipe.ingredients.indexOf(ingredientSearch)
    //if(indexToChange === 1) {
    //  console.log("Current ingredient: " + recipe.ingredients[indexToChange] + " " + recipe.measurements[indexToChange])
    //  recipe.ingredient[indexToChange] = what ever vi returnar från den som är namnet
    //  recipe.measurements[indexToChange] = what ever vi returnar från measurments delen
    //} else { console.log("Ingredient doesn't exist") }
//}
}