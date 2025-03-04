import * as PromptSync from "prompt-sync";
import {pair, head, tail, Pair,} from './lib/list';
import { hash_id, ph_empty} from "./lib/hashtables";
import {viewRecipe, createRecipe, searchRecipe, Recipe, Measurements, Ingredients} from "../Project-group-21/lib/recipe";
import {questioneer, changeUnits, units} from "./lib/utilities";
import {convert, Unit} from 'convert';
import {changeServing, removeIngredient, changeIngredients, addIngredient} from "../Project-group-21/lib/ingredients"

// const { convert } = require("convert")

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });


function cookbook(tag, hashedTable, keysToHashed) {
    while (true) {
        const test = questioneer(["Create recipe", "Search recipe", "Edit Recipe", "Close cookbook"])
    switch(test) {
        case(1):
            createRecipe(hashedTable, keysToHashed)
            break;
        case(2):
            const search = searchRecipe(keysToHashed, hashedTable)
            if (typeof search === "boolean") {
                if (search === true) { console.log("search blev true")} 
                else {console.log("Search blev false")}
            } else {
                viewRecipe(search)
            }
            break;
        case(3):
            const searchedRecipe = searchRecipe(keysToHashed, hashedTable)
            if (typeof searchedRecipe === "boolean") {//=== false || true) {
                console.log("No recipe was found.")
            } else {
                editRecipe(searchedRecipe, hashedTable)
            }
            break;
        case(4): 
            return false
        default:
            console.log("Invalid input")
        }
    }
}

//Axels lekland-------------------------------------------------

function editRecipe(recipe: Recipe, table) {  
    viewRecipe(recipe)
    console.log("What do you want to do?")
    while(true) {
        switch(questioneer(["Edit ingredients and measurements", "Edit instructions", "Edit name","go back"])) {
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
    console.log("What do you want to do?")
    while(true) {
        switch(questioneer(["Change serving amount", "Change units", "Edit ingredients", "Return"])) {
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
        switch(questioneer(["add ingredient","remove ingredient", "edit ingredient", "Return"])) {
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


//Axels lekland-------------------------------------------------



function main() {
    const hashedTable = ph_empty(13, hash_id)
    let keysToHashed : Array<Pair<string, Number>> = [] //pair(name, id)
    while (true) {   
        const test = questioneer(["Open", "Quit"])
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
