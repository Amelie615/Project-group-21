import {pair, head, tail, Pair,} from './list';
import * as PromptSync from "prompt-sync";
import {convert, Unit, BestKind} from 'convert';
import {Recipe, viewRecipe} from "../lib/recipe"

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });


export function makeIngredient(recipe, name) {
    recipe.ingredients.push(name);
    const ourString = "Enter amount of ".concat(name, "> ")
    const inputMeasurements = prompt(ourString).toLowerCase()
    const integersFromMeasurements : number = Math.floor(inputMeasurements.match(/(\d+)/)[1]) 
    let lettersFromMeasurements: Unit = inputMeasurements.replace(/\d+|^\s+|\s+$/g,''); 
    recipe.measurements.push(pair(integersFromMeasurements, lettersFromMeasurements))
}

export function changeServing(recipe: Recipe, table) {        
    console.log("Recipe currently serves " + recipe.servings + " people")
    let newServings: number = parseInt(prompt("New serving size: "), 10)
    for(let i = 0; i < recipe.measurements.length; i ++) {
        let currentIngredient: number = head(recipe.measurements[i])
        recipe.measurements[i] = pair(Math.floor(currentIngredient/recipe.servings * newServings), tail(recipe.measurements[i]))
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
    while(true) {
        makeIngredient(recipe, prompt("Ingredient name > "))
        if(prompt("Do you want to add another ingredient? y/n > ".toLowerCase() !== "y"))
            return false
    }
}


export function changeIngredients(recipe: Recipe, ingredientSearch: string) { 
    while(true) {
        let indexToChange: number = recipe.ingredients.indexOf(ingredientSearch)
        if(indexToChange === 1) {
            console.log("Current ingredient: " + recipe.ingredients[indexToChange] + " " + recipe.measurements[indexToChange])
            recipe.ingredients.splice(indexToChange, 1)
            recipe.measurements.splice(indexToChange, 1)
            makeIngredient(recipe, prompt("Ingredient name > "))
        } else { console.log("Ingredient doesn't exist") }
        if(prompt("Do you want to change another ingredient? y/n > ").toLowerCase() !== "y") {
            return false
        }
    }
}