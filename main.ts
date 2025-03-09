import * as PromptSync from "prompt-sync";
import {pair, head, tail, Pair,} from './lib/list';
import { hash_id, ph_empty, type ProbingHashtable} from "./lib/hashtables";
import {viewRecipe, createRecipe, searchRecipe, Recipe, Measurements, Ingredients} from "../Project-group-21/lib/recipe";
import {questionnaire, changeUnits, units, validAnswer, line} from "./lib/utilities";
import {convert, Unit} from 'convert';
import {changeServing, removeIngredient, changeIngredients, addIngredient, viewIngredients} from "../Project-group-21/lib/ingredients"
import { loadCookbook, saveCookbook } from "./filemanagment";

// DATA DEFINITIONS

/**
 * A {Cookbook} is a probing hashtable.
 * The keys for the hashtable consist of numbers between 1000 and 9999
 * the values in the hashtable are recipes
 *      The NIN has the following format: "YYYYMMDD1111".
 */

/**
 * A {CookbookKeys} is and array with pairs of strings and numbers
 * a
 * invariants:
 *      Each pair must consist of corresponding recipe names and ids
 */


export type Cookbook = ProbingHashtable<number, Recipe>
export type CookbookKeys = Array<Pair<string, number>>

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

/**
 * Menu for choosing what to do in cookbook
 * @param {Cookbook} book the cookbook hashtable
 * @param {CookbookKeys} keys id and name for every recipe
 */
function cookbookMenu(cookbook: Cookbook, keys: CookbookKeys): void {
    let done: boolean = true
    while (done) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["Create recipe", "Search recipe", "Save & Exit cookbook"])) {
            case(1):
                createRecipe(cookbook, keys)
                break;
            case(2):
                const search: Recipe | boolean = searchRecipe(keys, cookbook)
                if (typeof search === "boolean") {
                    console.log("Recipe not found.")
                } else {
                    recipeMenu(search, cookbook)
                }
                break;
            case(3): 
                if (validAnswer(
                                "All changes will be lost if you don't save this cookbook before exiting. Do you wish to save it? (y/n)",
                                "opt",
                                ["y", "n"]) === "y") {
                            saveCookbook(cookbook, keys)
                    } 
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
function recipeMenu(recipe: Recipe, cookbook: Cookbook): void {
    let done = true
    while(done) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["View recipe", "Edit recipe", "Return"])) {
            case(1):
                viewRecipe(recipe)
                break
            case(2):
                editRecipe(recipe, cookbook)
                break
            case(3):
                done = false
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
function editRecipe(recipe: Recipe, cookbook: Cookbook): void {  
    viewRecipe(recipe)
    let done = true
    while(done) {
        line()
        console.log("What do you want to do?")
            switch(questionnaire(["Edit ingredients and measurements", "Edit instructions", "Edit name", "Return"])) {
                case(1):
                    ingredientsMenu(recipe, cookbook)
                    break;
                case(2):
                    console.log("Current instructions: " + recipe.instructions)  
                    recipe.instructions = validAnswer("New Instructions: > ","", [])
                    break;
                case(3):
                    console.log("Current name: " + recipe.name)
                    recipe.name = validAnswer("New name: > ", "", [])
                    break;
                case(4):
                    done = false
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
                changeServing(recipe) //funkar
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
                console.log("current ingredients:")
                viewIngredients(recipe)
                line()
                addIngredient(recipe, cookbook)
                break
            case(2):
                console.log("current ingredients:")
                viewIngredients(recipe)
                removeIngredient(recipe, validAnswer("What ingredient do you want to remove? > ", "", []))
                break
            case(3):
                console.log("current ingredients:")
                viewIngredients(recipe)
                changeIngredients(recipe, cookbook)
                break
            case(4):
                return false
            default:
                console.log("Invalid input")
        }
    }
}

function createCookbook(size: number) : Cookbook {
    const emptyCookbook : Cookbook = ph_empty(size, hash_id)
    return emptyCookbook
}


/**
 * Main function where you can open/quit
 * initializes cookbook
 */
function main(): void {
    //const hashedTable: Cookbook = ph_empty(3, hash_id)
    let keysToHashed : Array<Pair<string, number>> = [] //pair(name, id)
    let done: boolean = true
    while (done) {  
        // const test = questionnaire(["Load", "Create new Cookbook", "Quit"])
        switch(questionnaire(["Load", "Create new Cookbook", "Quit"])) {
            case(1): 
                const loadedCookbook : [Cookbook, CookbookKeys] | undefined = loadCookbook()
                console.log(loadedCookbook)
                if (loadedCookbook !== undefined) {
                    cookbookMenu(loadedCookbook[0], loadedCookbook[1])
                }
                break
            case(2):
                const newCookbook = createCookbook(Number(validAnswer("How many recipes should your cookbook fit? (max. 250)", "num", [])))
                cookbookMenu(newCookbook, keysToHashed)
                break
            case(3):
                done = false;
                break
            default: console.log("default")     //bör inte existera?
        }
    }
}


//const firstRecipe = {name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [pair(200, "g"), pair(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk."}

main();
