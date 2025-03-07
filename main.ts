import * as PromptSync from "prompt-sync";
import {pair, head, tail, Pair,} from './lib/list';
import { hash_id, ph_empty, type ProbingHashtable} from "./lib/hashtables";
import {viewRecipe, createRecipe, searchRecipe, Recipe, Measurements, Ingredients} from "../Project-group-21/lib/recipe";
import {questionnaire, changeUnits, units, validAnswer, line} from "./lib/utilities";
import {convert, Unit} from 'convert';
import {changeServing, removeIngredient, changeIngredients, addIngredient} from "../Project-group-21/lib/ingredients"

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export type Cookbook = ProbingHashtable<number, Recipe>
export type CookbookKeys = Array<Pair<string, number>>

/**
 * Menu for choosing what to do in cookbook
 * @param {Cookbook} book the cookbook hashtable
 * @param {CookbookKeys} keys id and name for every recipe
 */
function cookbook(book: Cookbook, keys: CookbookKeys): void {
    let done: boolean = true
    while (done) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["Create recipe", "Search recipe", "Close cookbook"])) {
            case(1):
                createRecipe(book, keys)
                break;
            case(2):
                const search: Recipe | boolean = searchRecipe(keys, book)
                if (typeof search === "boolean") {
                    console.log("Recipe not found.")
                } else {
                    recipeMenu(search, book)
                }
                break;
            case(3): 
                done = false
            default:
                console.log("Invalid input")
        }
    }
}

/**
 * Menu for choosing what to do with current recipe
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function recipeMenu(recipe: Recipe, cookbook: Cookbook) {
    while(true) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["View recipe", "Edit recipe", "Return"])) {
            case(1):
                viewRecipe(recipe)
                break
            case(2):
                ingredientsMenu(recipe, cookbook)
                break
            case(3):
                return false
            default:
                console.log("Invalid input")
                break
        }
    }
}

/**
 * Menu for choosing how to edit recipe
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function editRecipe(recipe: Recipe, cookbook: Cookbook) {  
    viewRecipe(recipe)
    while(true) {
        line()
        console.log("What do you want to do?")
            switch(questionnaire(["Edit ingredients and measurements", "Edit instructions", "Edit name", "Return"])) {
                case(1):
                    ingredientsMenu(recipe, cookbook)
                    break;
                case(2):
                    console.log("Current instructions: " + recipe.instructions)  
                    recipe.instructions = validAnswer("New Instructions: > ","")
                    break;
                case(3):
                    console.log("Current name: " + recipe.name)
                    recipe.name = validAnswer("New name: > ", "")
                    break;
                case(4):
                    return false
                default:
                    console.log("Invalid input")
            }
    }
}

/**
 * Menu for choosing how to edit ingredients/measurments/servings
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function ingredientsMenu(recipe: Recipe, cookbook: Cookbook) {  // working name
    while(true) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["Change serving amount", "Change units", "Edit ingredients", "Return"])) {
            case(1):
                changeServing(recipe, cookbook) //funkar
                break
            case(2):
                changeUnits(recipe, cookbook, "switchUnit") //funkar inte
                viewRecipe(recipe)
                break
            case(3):
                editIngredients(recipe, cookbook) //Submenu
                break
            case(4):
                return false
            default:
                console.log("Invalid input")
                break
        }
    }
}

/**
 * Menu for choosing how to edit ingredients
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function editIngredients(recipe: Recipe, cookbook: Cookbook) {
    while(true) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["add ingredient","remove ingredient", "edit ingredient", "Return"])) {
            case(1):
                addIngredient(recipe, cookbook)
                break
            case(2):
                // printa ut ingredients
                removeIngredient(recipe, validAnswer("What ingredient do you want to remove? > ", ""))
                break
            case(3):
                // printa ut ingredients
                changeIngredients(recipe, cookbook)
                break
            case(4):
                return false
            default:
                console.log("Invalid input")
        }
    }
}


/**
 * Main function where you can open/quit
 * initializes cookbook
 */
function main(): void {
    const hashedTable: Cookbook = ph_empty(3, hash_id)
    let keysToHashed : Array<Pair<string, number>> = [] //pair(name, id)
    let done: boolean = true
    while (done) {  
        const test = questionnaire(["Open", "Quit"])
        switch(test) {
            case(1): 
                cookbook(hashedTable, keysToHashed) //Använder inte tagen just nu så bara placeholder
                break
            
            case(2):
                done = false;
            default: console.log("default")
        }
        
    }
}


//const firstRecipe = {name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [pair(200, "g"), pair(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk."}

main();
