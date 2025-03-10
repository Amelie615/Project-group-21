import * as PromptSync from "prompt-sync";
import {pair, head, tail, Pair,} from './lib/list';
import { hash_id, ph_empty, type ProbingHashtable} from "./lib/hashtables";
import {viewRecipe, createRecipe, searchRecipe, Recipe, Measurements, Ingredients} from "../Project-group-21/lib/recipe";
import {questionnaire, changeUnits, units, validAnswer, line, round} from "./lib/utilities";
import {convert, Unit} from 'convert';
import {changeServing, removeIngredient, changeIngredients, addIngredient, viewIngredients} from "../Project-group-21/lib/ingredients"
import { loadCookbook, saveCookbook } from "./filemanagment";

// DATA DEFINITIONS

/**
 * A {Cookbook} is a probing hashtable.
 * The keys for the hashtable consist of numbers between 1000 and 9999
 * the values in the hashtable are recipes
 * invariants:
 * the key type K contains neither null nor undefined
 * 
 * If keys[i] is neither null nor undefined,
 *     then data[i] contains a value of type Record.
 */

/**
 * A {CookbookKeys} is and array with pairs of strings and numbers
 * a string is a recipe name and a number is a recipe ID
 * invariants:
 *      Each pair must consist of corresponding recipe names and ids
 *      the recipe name is the first element in each pair
 */


// DATA TYPE EXAMPLES

/** Valid:
 * const keys = [pair("Kanelbullar", 1234), pair("Chokladbollar", 2345)]
 */

/** Invalid:
 * wrong order of elements in pair
 * const keys = [pair(1234, "Kanelbullar"), pair("Chokladbollar", 2345)]
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
    let active: boolean = true
    while (active) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["Create recipe",
                              "Search recipe", 
                              "Save & Exit cookbook"])) {
            case(1):
                createRecipe(cookbook, keys)
                break;
            case(2):
                const search: Recipe | boolean = searchRecipe(keys, 
                                                              cookbook)
                if (typeof search === "boolean") {
                    console.log("Recipe not found.")
                } else {
                    recipeMenu(search, cookbook)
                }
                break;
            case(3): 
                if (validAnswer("All changes will be lost if you don't save this cookbook before exiting. Do you wish to save it? (y/n) > ",
                                "opt",
                                ["y", "n"]) === "y") {
                            saveCookbook(cookbook, keys)
                    } 
                active = false
                break
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
    let active = true
    while(active) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["View recipe", 
                              "Edit recipe", 
                              "Return"])) {
            case(1):
                viewRecipe(recipe)
                break
            case(2):
                editRecipe(recipe, cookbook)
                break
            case(3):
                active = false
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
    let active = true
    while(active) {
        line()
        console.log("What do you want to do?")
            switch(questionnaire(["Edit ingredients and measurements", 
                                  "Edit instructions", 
                                  "Edit name", 
                                  "Return"])) {
                case(1):
                    ingredientsMenu(recipe, cookbook)
                    break;
                case(2):
                    console.log("Current instructions: " 
                                + recipe.instructions)  
                    recipe.instructions = validAnswer("New Instructions: > ",
                                                      "", 
                                                      [])
                    break;
                case(3):
                    console.log("Current name: " 
                                + recipe.name)
                    recipe.name = validAnswer("New name: > ", 
                                              "", 
                                              [])
                    break;
                case(4):
                    active = false
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
function ingredientsMenu(recipe: Recipe, cookbook: Cookbook): void {
    let active: boolean = true
    while(active) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["Change serving amount", 
                              "Change units", 
                              "Edit ingredients", 
                              "Return"])) {
            case(1):
                changeServing(recipe) 
                break
            case(2):
                changeUnits(recipe, 
                            cookbook, 
                            "switchUnit") 
                viewRecipe(recipe)
                break
            case(3):
                editIngredients(recipe, 
                                cookbook) //Submenu
                break
            case(4):
                active = false
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
function editIngredients(recipe: Recipe, cookbook: Cookbook): void {
    let active = true
    while(active) {
        line()
        console.log("What do you want to do?")
        switch(questionnaire(["Add ingredient",
                              "Remove ingredient", 
                              "Edit ingredient", 
                              "Return"])) {
            case(1):
                console.log("Current ingredients:")
                viewIngredients(recipe)
                line()
                addIngredient(recipe, 
                              cookbook)
                break
            case(2):
                console.log("Current ingredients:")
                viewIngredients(recipe)
                removeIngredient(recipe, 
                                 validAnswer("What ingredient do you want to remove? > ", 
                                             "", 
                                             []))
                break
            case(3):
                console.log("Current ingredients:")
                viewIngredients(recipe)
                changeIngredients(recipe, 
                                  cookbook)
                break
            case(4):
                active = false
            default:
                console.log("Invalid input")
        }
    }
}


/**
 * initializes a new cookbook
 * @param {number} size the size of the new hashtable
 * @returns {Cookbook} an empty cookbook hashtable
 */
function createCookbook(size: number) : Cookbook {
    const emptyCookbook : Cookbook = ph_empty(size, 
                                              hash_id)
    return emptyCookbook
}


/**
 * Main function where you can load an existing cookbook, create a new cookbook or quit the program
 */
function main(): void {
    let keysToHashed : CookbookKeys = []
    let done: boolean = true
    while (done) {  
        switch(questionnaire(["Load", 
                              "Create new Cookbook", 
                              "Quit"])) {
            case(1): 
                const loadedCookbook : [Cookbook, CookbookKeys] | undefined = loadCookbook()
                if (loadedCookbook !== undefined) {
                    cookbookMenu(loadedCookbook[0], 
                                 loadedCookbook[1])
                }
                break
            case(2):
                let sizeOfCookbook = Number(validAnswer("How many recipes should your cookbook fit? (max. 100) > ",
                                              "num", 
                                              []))
                round(sizeOfCookbook, 0)
                sizeOfCookbook > 100
                               ? sizeOfCookbook = 100
                               : sizeOfCookbook < 1 
                               ? sizeOfCookbook = 1
                               : sizeOfCookbook

                const newCookbook : Cookbook = createCookbook(sizeOfCookbook)

                cookbookMenu(newCookbook, 
                             keysToHashed)
                break
            case(3):
                done = false;
                break
            default: console.log("Invalid Answer.")
        }
    }
}

main();
