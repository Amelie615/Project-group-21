import * as PromptSync from "prompt-sync";
import {pair, head, tail, Pair,} from './lib/list';
import { hash_id, ph_empty} from "./lib/hashtables";
import {viewRecipe, createRecipe, searchRecipe, Recipe, Measurements, Ingredients} from "../Project-group-21/lib/recipe";
import {questioneer, changeUnits } from "./lib/utilities";
import {convert, Unit} from 'convert';

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
    switch(questioneer(["Edit ingredients and measurements", "Edit instructions", "Edit name"])) {
        case(1):
            ingredientAndMesasurmentsEditSubmenu(recipe, table)
            break;
        case(2):
            console.log("current instructions: " + recipe.instructions)  
            recipe.instructions = prompt("")
            break;
        case(2):
            console.log("current name: " + recipe.name)
            recipe.name = prompt("")
            break;
        default:
            console.log("Invalid input")

    }
}

function ingredientAndMesasurmentsEditSubmenu(recipe, table) {  // working name
    console.log("What do you want to do?")
    switch(questioneer(["Change serving amount", "Change units", "Edit ingredients"])) {
        case(1):
            changeServing(recipe, table) //funkar
            break
        case(2):
            changeUnits(recipe, table) //funkar
            break
        case(3):
            editIngredients(recipe, table) //Submenu
            break
        default:
            console.log("Invalid input")
            break
    }
}

function changeServing(recipe: Recipe, table) {                             // Fixa errors med wacky inputs
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



function editIngredients(recipe, table) {
    switch(questioneer(["add ingredient","remove ingredient", "edit ingredient"])) {
        case(1):
            break // Släng in add ingredient från creatRecipe, som func eller inte.
        case(2):
            let indexToRemove: number = recipe.ingredients.find(prompt("What ingredient do you want to remove?\n> "))
            if(indexToRemove === 1) {
                //removeFromArray()
            } else { console.log("Ingredient doesn't exist") }
        case(3):
            break
        default:
            console.log("Invalid input")
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
