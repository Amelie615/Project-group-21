import * as PromptSync from "prompt-sync";
import {pair, head, tail, Pair,} from './lib/list';
import { hash_id, ph_empty, type ProbingHashtable} from "./lib/hashtables";
import {viewRecipe, createRecipe, searchRecipe, Recipe, Measurements, Ingredients} from "../Project-group-21/lib/recipe";
import {questionnaire, changeUnits, units, validAnswer, line} from "./lib/utilities";
import {convert, Unit} from 'convert';
import {changeServing, removeIngredient, changeIngredients, addIngredient} from "../Project-group-21/lib/ingredients"

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export type Cookbook = ProbingHashtable<number, Recipe>

/**
 * Menu for choosing what to do in cookbook
 * @param book the cookbook hashtable
 * @param keys id and name for every recipe
 */
function cookbook(book: Cookbook, keys: Array<Pair<string, number>>): void {
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

function recipeMenu(recipe: Recipe, table: Cookbook) {
    while(true) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["View recipe", "Edit recipe", "Return"])) {
            case(1):
                viewRecipe(recipe)
                break
            case(2):
                ingredientsMenu(recipe, table)
                break
            case(3):
                return false
            default:
                console.log("Invalid input")
                break
        }
    }
}

function editRecipe(recipe: Recipe, table: Cookbook) {  
    viewRecipe(recipe)
    while(true) {
        line()
        console.log("What do you want to do?")
            switch(questionnaire(["Edit ingredients and measurements", "Edit instructions", "Edit name", "Return"])) {
                case(1):
                    ingredientsMenu(recipe, table)
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

function ingredientsMenu(recipe: Recipe, table: Cookbook) {  // working name
    while(true) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["Change serving amount", "Change units", "Edit ingredients", "Return"])) {
            case(1):
                changeServing(recipe, table) //funkar
                break
            case(2):
                changeUnits(recipe, table, "switchUnit") //funkar inte
                viewRecipe(recipe)
                break
            case(3):
                editIngredients(recipe, table) //Submenu
                break
            case(4):
                return false
            default:
                console.log("Invalid input")
                break
        }
    }
}

function editIngredients(recipe: Recipe, table: Cookbook) {
    while(true) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["add ingredient","remove ingredient", "edit ingredient", "Return"])) {
            case(1):
                addIngredient(recipe, table)
                break
            case(2):
                // printa ut ingredients
                removeIngredient(recipe, validAnswer("What ingredient do you want to remove? > ", ""))
                break
            case(3):
                // printa ut ingredients
                changeIngredients(recipe, table)
                break
            case(4):
                return false
                break;
            default:
                console.log("Invalid input")
        }
    }
}



function main() {
    const hashedTable: Cookbook = ph_empty(3, hash_id)
    let keysToHashed : Array<Pair<string, number>> = [] //pair(name, id)
    while (true) {  
        const test = questionnaire(["Open", "Quit"])
        switch(test) {
            case(1): 
                cookbook(hashedTable, keysToHashed) //Använder inte tagen just nu så bara placeholder
                break
            
            case(2):
                return false;
                break;
            default: console.log("default")
        }
        
    }
}


//const firstRecipe = {name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [pair(200, "g"), pair(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk."}

main();
