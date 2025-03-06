import {pair, head, tail, Pair,} from './list';
import * as PromptSync from "prompt-sync";
import {convert, Unit, BestKind} from 'convert';
import {Recipe, viewRecipe} from "../lib/recipe"
import { Cookbook } from '../main';
import { unitstring, units, changeUnits } from './utilities';

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });


export function makeIngredient(recipe: Recipe, name: string, cookbook: Cookbook): void {
    recipe.ingredients.push(name);
    const ourString: string = "Enter amount of " + name + " > "
    const inputMeasurements = prompt(ourString).toLowerCase()
    console.log("test2")
    const integersFromMeasurements: number = Math.floor(inputMeasurements.match(/(\d+)/)[1]) 
    console.log("test3")
    const lettersFromMeasurements: string = inputMeasurements.replace(/\d+|^\s+|\s+$/g,''); 
    console.log("test4")
    recipe.measurements.push(pair(integersFromMeasurements, stringToUnit(lettersFromMeasurements)))
    changeUnits(recipe, cookbook, "")
    console.log("test5")
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
    let newServings: number = parseInt(prompt("New serving size: "), 10)
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
    if(indexToRemove === 1) {
        console.log("Removed " + recipe.ingredients[indexToRemove] + " from " + recipe.name + "\n")
        recipe.ingredients.splice(indexToRemove, 1)
        recipe.measurements.splice(indexToRemove, 1)
    } else { console.log("Ingredient doesn't exist") }
}

export function addIngredient(recipe: Recipe, cookbook: Cookbook): void {
    let done = true
    while(done === true) {
        makeIngredient(recipe, prompt("Ingredient name > "), cookbook)

        if(prompt("Do you want to add another ingredient? y/n > ").toLowerCase() !== "y") {
            done = false
        }
            
    }
}


export function changeIngredients(recipe: Recipe, cookbook: Cookbook): void { 
    let done = true
    while(done === true) {
        let ingredientSearch: string = prompt("What ingredient do you want to change? > ")
        let indexToChange: number = recipe.ingredients.indexOf(ingredientSearch)
        console.log(indexToChange) //testmeme
        if(indexToChange === 1) {
            console.log("Current ingredient: " + recipe.ingredients[indexToChange] + " " + recipe.measurements[indexToChange])
            recipe.ingredients.splice(indexToChange, 1)
            recipe.measurements.splice(indexToChange, 1)
            makeIngredient(recipe, prompt("Ingredient name > "), cookbook)
        } else { console.log("Ingredient doesn't exist") }
        if(prompt("Do you want to change another ingredient? y/n > ").toLowerCase() !== "y") {
            done = false
        }
    }
}