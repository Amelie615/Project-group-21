import * as PromptSync from "prompt-sync";
import {pair, head, tail, Pair,} from './lib/list';
import { hash_id, ph_empty, type ProbingHashtable} from "./lib/hashtables";
import {viewRecipe, createRecipe, searchRecipe, Recipe, Measurements, Ingredients} from "../Project-group-21/lib/recipe";
import {questionnaire, changeUnits, units} from "./lib/utilities";
import {convert, Unit} from 'convert';
import {changeServing, removeIngredient, changeIngredients, addIngredient} from "../Project-group-21/lib/ingredients"

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export type Cookbook = ProbingHashtable<number, Recipe>

function cookbook(hashedTable: Cookbook, keysToHashed: Array<Pair<string, number>>) {
    while (true) {
    switch(questionnaire(["Create recipe", "Search recipe", "Close cookbook"])) {
        case(1):
            createRecipe(hashedTable, keysToHashed)
            break;
        case(2):
            const search: Recipe | boolean = searchRecipe(keysToHashed, hashedTable)
            if (typeof search === "boolean") {
                console.log("Recipe not found.")
            } else {
                recipeHandelingMenu(search, hashedTable)
            }
            break;
        case(3): 
            return false
        default:
            console.log("Invalid input")
        }
    }
}

function recipeHandelingMenu(recipe: Recipe, table: Cookbook) {
    while(true) {
        console.log("What do you want to do?\n")
        switch(questionnaire(["View recipe", "Edit recipe", "Return"])) {
            case(1):
                viewRecipe(recipe)
                break
            case(2):
                ingredientAndMesasurmentsEditSubmenu(recipe, table)
                break
            case(3):
                return false
                break;
            default:
                console.log("Invalid input")
                break
        }
    }
}

function editRecipe(recipe: Recipe, table: Cookbook) {  
    viewRecipe(recipe)
    while(true) {
    console.log("What do you want to do?\n")
        switch(questionnaire(["Edit ingredients and measurements", "Edit instructions", "Edit name", "Return"])) {
            case(1):
                ingredientAndMesasurmentsEditSubmenu(recipe, table)
                break;
            case(2):
                console.log("current instructions: " + recipe.instructions)  
                recipe.instructions = prompt("")
                break;
            case(3):
                console.log("current name: " + recipe.name)
                recipe.name = prompt("")
                break;
            case(4):
                return false
                break;
            default:
                console.log("Invalid input")
        }
    }
}

function ingredientAndMesasurmentsEditSubmenu(recipe: Recipe, table: Cookbook) {  // working name
    while(true) {
    console.log("What do you want to do?\n")
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
                break;
            default:
                console.log("Invalid input")
                break
        }
    }
}

function editIngredients(recipe: Recipe, table: Cookbook) {
    while(true) {
        console.log("What do you want to do?\n")
        switch(questionnaire(["add ingredient","remove ingredient", "edit ingredient", "Return"])) {
            case(1):
                addIngredient(recipe, table)
                break
            case(2):
                removeIngredient(recipe, prompt("What ingredient do you want to remove? > "))
                break
            case(3):
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
    const hashedTable: Cookbook = ph_empty(13, hash_id)
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


const firstRecipe = {name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [pair(200, "g"), pair(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk."}

main();
