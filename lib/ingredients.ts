import {pair, head, tail, Pair,} from './list';
import * as PromptSync from "prompt-sync";
import {Recipe, viewRecipe} from "../lib/recipe"
import { Cookbook } from '../main';
import { changeUnits, validAnswer, stringToUnit, round} from './utilities';

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });


/**
 * Create a new ingredient
 * @param {Recipe} recipe the current recipe
 * @param {string} name name of the new ingredient
 * @param {Cookbook} cookbook the cookbook hashtable
 */
export function makeIngredient(recipe: Recipe, name: string, cookbook: Cookbook): void {
    const inputprompt: string = "Enter amount of " 
                                 + name 
                                 + " > "
    const inputMeasurements: string = validAnswer(inputprompt, 
                                                  "", 
                                                  []).toLowerCase() 
    const integersFromMeasurements = inputMeasurements.match(/(\d+)/) 

    if (integersFromMeasurements === null) {
        console.log("Invalid input")
        makeIngredient(recipe,
                       name, 
                       cookbook)
        return
    } else {
        const validints: number = parseInt(integersFromMeasurements[1])
        const lettersFromMeasurements: string = inputMeasurements
            .replace(/[\d\s]+/g,'')
        if (lettersFromMeasurements === "") {
            console.log("Invalid input")
            makeIngredient(recipe, name, cookbook)
            return
        }
        recipe.ingredients.push(name);
        recipe.measurements.push(pair(validints, 
                                      stringToUnit(lettersFromMeasurements)))
        changeUnits(recipe, cookbook, "")
    }
}

/**
 * Change serving amount for current recipe
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
export function changeServing(recipe: Recipe): void { 
    if(recipe.servings < 1) {
        console.log("Recipe lacks reasonable serving amounts for scaling\n")
    } else if(recipe.servings !== 0){
        console.log("Recipe currently serves " 
                    + recipe.servings 
                    + " people")
        let newServings: number = parseInt(validAnswer("New serving size: ",
                                                       "num",
                                                        []),
                                            10)
        for(let i = 0; i < recipe.measurements.length; i ++) {
            let currentIngredient: number = head(recipe.measurements[i])
            recipe.measurements[i] = pair(round(currentIngredient / recipe.servings * newServings,
                                                2),
                                          tail(recipe.measurements[i]))
        }
        recipe.servings = newServings
        console.log("The new recipe: \n")
        viewRecipe(recipe)
    }
}

/**
 * remove chosen ingredient
 * @param {Recipe} recipe the current recipe
 * @param {string} ingredientSearch ingredient to remove
 */
export function removeIngredient(recipe: Recipe, ingredientSearch: string): void {
    let indexToRemove: number = recipe
        .ingredients
        .indexOf(ingredientSearch)
    if(indexToRemove !== -1) {
        console.log("\nRemoved " 
                    + recipe.ingredients[indexToRemove] 
                    + " from " 
                    + recipe.name 
                    + "\n")
        recipe
            .ingredients
            .splice(indexToRemove, 1)
        recipe
            .measurements
            .splice(indexToRemove, 1)
    } else { console.log("Ingredient doesn't exist") }
}


/**
 * Add new ingredient to current recipe
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
export function addIngredient(recipe: Recipe, cookbook: Cookbook): void {
    let done = true
    while(done === true) {
        makeIngredient(recipe, 
                       validAnswer("Ingredient name > ",
                                   "", 
                                   []), 
                       cookbook)
        if(validAnswer("Do you want to add another ingredient? y/n > ",
                       "opt", 
                       ["y", "n"]).toLowerCase() === "n") {
            done = false
        }      
    }
}


/**
 * Change a chosen ingredient
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
export function changeIngredients(recipe: Recipe, cookbook: Cookbook): void { 
    let done = true
    while(done === true) {
        let ingredientSearch: string = validAnswer("What ingredient do you want to change? > ",
                                                    "",
                                                    [])
        let indexToChange: number = recipe
            .ingredients
            .indexOf(ingredientSearch)
        if(indexToChange !== -1) {
            console.log("Current ingredient:\n" 
                        + recipe.ingredients[indexToChange] 
                        + " " 
                        + recipe.measurements[indexToChange])
            recipe
                .ingredients
                .splice(indexToChange, 1)
            recipe
                .measurements
                .splice(indexToChange, 1)
            makeIngredient(recipe, 
                           validAnswer("Ingredient name > ",
                                       "", 
                                       []),
                           cookbook)
        } else { console.log("Ingredient doesn't exist") }
        if(validAnswer("Do you want to change another ingredient? y/n > ",
                       "opt", 
                       ["y", "n"]).toLowerCase() === "n") {
            viewIngredients(recipe)
            done = false
        }
    }
}

/**
 * Prints out ingredients in terminal
 * @param {Recipe} recipe the current recipe
 */
export function viewIngredients(recipe: Recipe): void {
    for (let i = 0; i < recipe.ingredients.length; i++ ) {
        console.log(recipe.ingredients[i] 
                    + " " 
                    + head(recipe.measurements[i]) 
                    + " " 
                    + tail(recipe.measurements[i]) 
                    + "\n")
    }
}