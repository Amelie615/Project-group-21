import {pair, head, tail, Pair,} from './list';
import * as PromptSync from "prompt-sync";
import {convert, Unit, BestKind} from 'convert';
import {Recipe, viewRecipe} from "../lib/recipe"
import { Cookbook } from '../main';
import { unitstring, units, changeUnits, validAnswer } from './utilities';

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });


export function makeIngredient(recipe: Recipe, name: string, cookbook: Cookbook): void {
    const inputMeasurements: string = prompt("Enter amount of " + name + " > ").toLowerCase() // bättre felhantering
    if (inputMeasurements === "") {
        console.log("invalid input")
        makeIngredient(recipe, name, cookbook)
        return
    }
    const integersFromMeasurements = inputMeasurements.match(/(\d+)/) 
    if (integersFromMeasurements === null) {
        console.log("invalid input")
        makeIngredient(recipe, name, cookbook)
        return
    } else {
        const validints: number = parseInt(integersFromMeasurements[1])
        const lettersFromMeasurements: string = inputMeasurements.replace(/[\d\s]+/g,'');
        if (lettersFromMeasurements === "") {
            console.log("invalid input")
            makeIngredient(recipe, name, cookbook)
            return
        }
        recipe.ingredients.push(name);
        recipe.measurements.push(pair(validints, stringToUnit(lettersFromMeasurements)))
        changeUnits(recipe, cookbook, "")
    }
}

function stringToUnit (unit: string): Unit | string {
    let newUnit: Unit = "ml"
    for (let i = 0; i < unitstring.length; i++) {
        if (unit === unitstring[i]) {
            newUnit = units[i]
            return newUnit
        }
    }
    return unit
} 

export function changeServing(recipe: Recipe, table: Cookbook): void {        
    console.log("Recipe currently serves " + recipe.servings + " people")
    let newServings: number = parseInt(validAnswer("New serving size: ", "num"), 10)
    for(let i = 0; i < recipe.measurements.length; i ++) {
        let currentIngredient: number = head(recipe.measurements[i])
        recipe.measurements[i] = pair(Math.floor(currentIngredient/recipe.servings * newServings), tail(recipe.measurements[i]))
    }
    recipe.servings = newServings
    console.log("The new recipe: \n")
    viewRecipe(recipe)
}


export function removeIngredient(recipe: Recipe, ingredientSearch: string): void {
    let indexToRemove: number = recipe.ingredients.indexOf(ingredientSearch)
    if(indexToRemove !== -1) {
        console.log("Removed " + recipe.ingredients[indexToRemove] + " from " + recipe.name + "\n")
        recipe.ingredients.splice(indexToRemove, 1)
        recipe.measurements.splice(indexToRemove, 1)
    } else { console.log("Ingredient doesn't exist") }
}

export function addIngredient(recipe: Recipe, cookbook: Cookbook): void {
    let done = true
    while(done === true) {
        makeIngredient(recipe, validAnswer("Ingredient name > ", ""), cookbook)

        if(prompt("Do you want to add another ingredient? y/n > ").toLowerCase() !== "y") {
            done = false
        }
            
    }
}


export function changeIngredients(recipe: Recipe, cookbook: Cookbook): void { 
    let done = true
    while(done === true) {
        let ingredientSearch: string = validAnswer("What ingredient do you want to change? > ", "")
        let indexToChange: number = recipe.ingredients.indexOf(ingredientSearch)
        if(indexToChange !== -1) {
            console.log("Current ingredient: " + recipe.ingredients[indexToChange] + " " + recipe.measurements[indexToChange])
            recipe.ingredients.splice(indexToChange, 1)
            recipe.measurements.splice(indexToChange, 1)
            makeIngredient(recipe, validAnswer("Ingredient name > ", ""), cookbook)
        } else { console.log("Ingredient doesn't exist") }
        if(prompt("Do you want to change another ingredient? y/n > ").toLowerCase() !== "y") {
            done = false
        }
    }
}