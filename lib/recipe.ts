import {pair, head, tail, Pair,} from './list';
import {ph_insert, ph_lookup} from "./hashtables";
import * as PromptSync from "prompt-sync";
import {questionnaire, IDGenerator, units, changeUnits, validAnswer, line } from './utilities';
import {convert, Unit, BestKind} from 'convert';
import { makeIngredient, viewIngredients } from './ingredients';
import { ProbingHashtable } from './hashtables';
import { Cookbook, CookbookKeys } from "../main";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

 // DATA DEFINITIONS

 // Imported type Unit and BestKind

/**
 * A {Measurements} is and array where each element is a pair(number, string | Unit)
 * the string | Unit is a unit for the number (example: pair(1,"dl"))
 * the string doesn't have to be a valid unit (example: pair(1, "slice"))
 * invariants:
 *      The first element in the pair is the number
 *      and the second is a string or Unit
 */

/**
 * A {Ingredients} is and array of strings
 * a string is a name for a recipe
 */

/**
 * A {Recipe} is a record {name: name of recipe,
 *                         id: the recipe id (number between 1000 and 9999),
 *                         ingredients: an array of strings where a string is an ingredient,
 *                         measurements: an array [pair(number,string | Unit)] where each pair is the amount of an ingredient,
 *                         servings: a number,
 *                         instructions: a string of instructions,
 *                         unit: "metric" or "imperial"}
 * Invariants:
 *      Ingredients and their measurements have the same index
 *      unit can only be "metric" or "imperial"
 */


// DATA TYPE EXAMPLES

/** Valid:
 * const myRecipe = {name: Kanelbullar,
 *                   id: 1234,
 *                   ingredients: ["socker", "kanel", "mjöl", "smör", "ägg"],
 *                   measurements: [pair(2,"dl"), pair(5, "g"), pair(3, "dl"), pair(200, "g"), pair(2, "st")],
 *                   servings: 8,
 *                   instructions: "baka bullar",
 *                   unit: "metric"}
 */
        
        
/** Invalid
 * Wrong order of keys:
 * const myRecipe = {measurements: [pair(2,"dl"), pair(5, "g"), pair(3, "dl"), pair(200, "g"), pair(2, "st")],
 *                   id: 1234,
 *                   ingredients: ["socker", "kanel", "mjöl", "smör", "ägg"],
 *                   name: "Kanelbullar",
 *                   servings: 8,
 *                   instructions: "baka bullar",
 *                   unit: "metric"}
 */ 

 
/** Borderline
 * empty ingredients and measurements:
 * const myRecipe = {name: Kanelbullar,
 *                   id: 1234,
 *                   ingredients: [],
 *                   measurements: [],
 *                   servings: 8,
 *                   instructions: "baka bullar",
 *                   unit: "metric"}
 */


export type Measurements = Array<Pair<number, Unit | string>>
export type Ingredients = Array<string> 
export type Recipe = {
    name: string,
    id: number,
    ingredients: Ingredients,
    measurements: Measurements, 
    servings: number,
    instructions: string,
    unit: BestKind | undefined
} 



/**
 * initializes a new recipe
 * @example initializeRecipe(keys)
 * returns {name: "Kanelbulle",
 *          id: 1234,
 *          servings: 4,
 *          instructions: "",
 *          ingredients: [],
 *          measurements: [],
 *          unit: "metric"}
 * @param {CookbookKeys} keys the name and id for all recipes in cookbook
 * @returns {Recipe} a new recipe
 */
export function initializeRecipe(keys: CookbookKeys): Recipe {
    const newRecipe: Recipe = {
        name: validAnswer("Name: > ", 
                          "", 
                          []).toLowerCase(),
        id: IDGenerator(1000, 9999, keys),                     
        servings: parseInt(validAnswer("Estimated servings: > ", 
                                       "num", 
                                        [])),
        instructions: "",
        ingredients: [],
        measurements: [],
        unit: "metric"
    }
    return newRecipe
}



/**
 * creates a new recipe and adds it to cookbook hashtable
 * @param {Cookbook} cookbook the cookbook hashtable
 * @param {CookbookKeys} keys the name and id for all recipes in cookbook
 */
export function createRecipe(cookbook: Cookbook, keys: CookbookKeys): void {
    line()
    console.log("Enter the following information for your recipe.")
    console.log("(It is possible to change this afterwards, don't worry.)")
    const newRecipe: Recipe = initializeRecipe(keys)
    let done : Boolean = true;
    while (done === true) {
        const ingredient: string = validAnswer("Name an ingredient > ", 
                                               "", 
                                               [])
        makeIngredient(newRecipe, 
                       ingredient, 
                       cookbook);
        if(validAnswer("Do you want to add another ingredient? y/n > ", 
                       "opt", 
                       ["n","y"]).toLowerCase() === "n") {
            done = false
        }
    } 
    newRecipe.instructions = validAnswer("instructions: > ", 
                                         "", 
                                         [])
    viewRecipe(newRecipe)
    keys.push(pair(newRecipe.name, 
                   newRecipe.id))
    ph_insert(cookbook, 
              newRecipe.id, 
              newRecipe)
}


/**
 * Prints out recipe in terminal
 * @param {Recipe} recipe the chosen recipe
 */
export function viewRecipe(recipe : Recipe): void {
    if (recipe === undefined) {console.log("error")}
    else {
    line()
    console.log(recipe.name)
    line()
    console.log("INGREDIENTS: \n")
    viewIngredients(recipe)
    console.log("SERVINGS: " 
                + recipe.servings)
    line()
    console.log("INSTRUCTIONS: \n")
    console.log(recipe.instructions + "\n")
    }
}


/**
 * search for a recipe in a cookbook
 * if there are multiple found recipes the function will print out a list of them and let the user choose a recipe
 * @example searchRecipe(keys, cookbook)
 * user input for userSearch = "kanelbullar"
 * returns {name: "Kanelbulle",
 *          id: 1234,
 *          servings: 4,
 *          instructions: "",
 *          ingredients: [],
 *          measurements: [],
 *          unit: "metric"}
 * @param {CookbookKeys} keys the name and id for all recipes in cookbook
 * @param {Cookbook} cookbook the cookbook hashtable
 * @returns {Recipe | boolean} the recipes found or false if no recipe found
 */
export function searchRecipe(keys: CookbookKeys, cookbook: Cookbook): Recipe |  boolean {  
    const userSearch: string = validAnswer("Search > ", 
                                           "", 
                                           []).toLowerCase()                              
    const searchResult: Array<string> = []
    keys.forEach(element => {       //(If search matches) -> add to searchResult
        const name : string = head(element)
        if (name.search(userSearch) !== -1 ) {
            searchResult.push(name)
        }
    });
    
    let userChoice : boolean | Recipe = true
    if (searchResult === undefined) {
        userChoice = false
    }
    const chosenRecipeName = searchResult[questionnaire(searchResult)- 1]

    for(let i = 0; i < keys.length; i++) {
        if(head(keys[i]) === chosenRecipeName) {
            const recipeSearch : Recipe | undefined = ph_lookup(cookbook, 
                                                                tail(keys[i]))
            recipeSearch === undefined 
                             ? userChoice = false 
                             : userChoice = recipeSearch
        }
    }
    return userChoice
}          
