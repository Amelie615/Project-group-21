import * as PromptSync from "prompt-sync";
import {pair, head, tail, Pair,} from './lib/list';
import { hash_id, ph_empty} from "./lib/hashtables";
import {viewRecipe, createRecipe, searchRecipe, Recipe, Measurements, Ingredients} from "../Project-group-21/lib/recipe";
import {questionnaire, changeUnits, units} from "./lib/utilities";
import {convert, Unit} from 'convert';
import {changeServing, removeIngredient, changeIngredients, addIngredient} from "../Project-group-21/lib/ingredients"

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });


function cookbook(tag, hashedTable, keysToHashed) {
    while (true) {
        const test = questionnaire(["Create recipe", "Search recipe", "Close cookbook"])
    switch(test) {
        case(1):
            createRecipe(hashedTable, keysToHashed)
            break;
        case(2):
            const search = searchRecipe(keysToHashed, hashedTable)
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

function recipeHandelingMenu(recipe: Recipe, table) {
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
            default:
                console.log("Invalid input")
                break
        }
    }
}

function editRecipe(recipe: Recipe, table) {  
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
            default:
                console.log("Invalid input")
        }
    }
}

function ingredientAndMesasurmentsEditSubmenu(recipe, table) {  // working name
    while(true) {
    console.log("What do you want to do?\n")
        switch(questionnaire(["Change serving amount", "Change units", "Edit ingredients", "Return"])) {
            case(1):
                changeServing(recipe, table) //funkar
                break
            case(2):
                changeUnits(recipe, table, "switchUnit") //funkar
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

function editIngredients(recipe: Recipe, table) {
    while(true) {
        console.log("What do you want to do?\n")
        switch(questionnaire(["add ingredient","remove ingredient", "edit ingredient", "Return"])) {
            case(1):
                addIngredient(recipe)
                break
            case(2):
                removeIngredient(recipe, prompt("What ingredient do you want to remove? > "))
                break
            case(3):
                changeIngredients(recipe, prompt("What ingredient do you want to change? > "))
            case(4):
                return false
            default:
                console.log("Invalid input")
        }
    }
}



function main() {
    const hashedTable = ph_empty(13, hash_id)
    let keysToHashed : Array<Pair<string, Number>> = [] //pair(name, id)
    while (true) {   
        const test = questionnaire(["Open", "Quit"])
        switch(test) {
            case(1): 
                cookbook("tag", hashedTable, keysToHashed) //Använder inte tagen just nu så bara placeholder
                break
            
            case(2):
                return false;
            
            default: console.log("default")
        }
        
    }
}


const firstRecipe = {name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [pair(200, "g"), pair(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk."}

main();
