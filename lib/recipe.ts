import {pair, head, tail, Pair,} from './list';
import {ph_insert, ph_lookup} from "./hashtables";
import * as PromptSync from "prompt-sync";
import {questionnaire, getRandomArbitrary, units, changeUnits, validAnswer, line } from './utilities';
import {convert, Unit, BestKind} from 'convert';
import { makeIngredient } from './ingredients';
import { ProbingHashtable } from './hashtables';
import { Cookbook, CookbookKeys } from "../main";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });



export type Recipe = {
    name: string,
    id: number,
    ingredients: Ingredients,
    measurements: Measurements, //Array<Pair<Number, String>>
    servings: number,
    instructions: string,
    unit: BestKind | undefined
} 
export type Measurements = Array<Pair<number, Unit | string>>
export type Ingredients = Array<string> 


/**
 * initializes a new recipe
 * @param {CookbookKeys} keys the name and id for all recipes in cookbook
 * @returns a recipe
 */
export function initializeRecipe(keys: CookbookKeys): Recipe {
    const newRecipe: Recipe = {
        name: validAnswer("Name: > ", "").toLowerCase(),
        id: getRandomArbitrary(1000, 9999, keys),                     
        servings: parseInt(validAnswer("Estimated servings: > ", "num")),
        instructions: "",
        ingredients: [],
        measurements: [],
        unit: "metric"
    }
    return newRecipe
}



/**
 * creates a new recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 * @param {CookbookKeys} keys the name and id for all recipes in cookbook
 */
export function createRecipe(cookbook: Cookbook, keys: CookbookKeys): void {
    line()
    console.log("Enter the following information for your recipe \n(It is possible to change this afterwards, don't worry.)")
    const newRecipe: Recipe = initializeRecipe(keys)
    let done : Boolean = true;
    while (done === true) {
        makeIngredient(newRecipe, validAnswer("Name an ingredient > ", ""), cookbook);
        done = prompt("Add another ingredient? (y/n) ").toLowerCase() === "y" ? true : false; // felhantering
    } 
    newRecipe.instructions = validAnswer("instructions: > ", "")
    viewRecipe(newRecipe)
    keys.push(pair(newRecipe.name, newRecipe.id))
    ph_insert(cookbook, newRecipe.id, newRecipe)
}


/**
 * prints out recipe
 * @param {Recipe} recipe the chosen recipe
 */
export function viewRecipe(recipe : Recipe): void {
    console.log(recipe)
    if (recipe === undefined) {console.log("error")}
    else {
    line()
    console.log(recipe.name)
    line()
    console.log("ingredients: ")
    line()
    for (let i = 0; i < recipe.ingredients.length; i++ ) {
        console.log(recipe.ingredients[i] + " " + head(recipe.measurements[i]) + tail(recipe.measurements[i]) + "\n")
    }
    console.log("servings" + " " + recipe.servings)
    line()
    console.log("instructions")
    line()
    console.log(recipe.instructions + "\n")
    }
}


/**
 * search for a recipe
 * @param {CookbookKeys} keys the name and id for all recipes in cookbook
 * @param {Cookbook} cookbook the cookbook hashtable
 * @returns {Recipe | boolean} the recipes found or false if no recipe found
 */
export function searchRecipe(keys: CookbookKeys, cookbook: Cookbook): Recipe |  boolean {  
    const userSearch: string = validAnswer("Search >", "").toLowerCase()                              
    const searchResult: Array<string> = []
    keys.forEach(element => {       //finns det någon match? (för sökningen) -> lägg till i searchREsult
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
   
    for(let i = 0; i < keys.length; i++) { //titta på deet här
        console.log(keys, chosenRecipeName)
        if(head(keys[i]) === chosenRecipeName) { //
            const recipeSearch : Recipe | undefined = ph_lookup(cookbook, tail(keys[i]))
            recipeSearch === undefined ? userChoice = false : userChoice = recipeSearch
        }
    }
    return userChoice
}