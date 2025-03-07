import {pair, head, tail, Pair,} from './list';
import {ph_insert, ph_lookup} from "./hashtables";
import * as PromptSync from "prompt-sync";
import {questionnaire, getRandomArbitrary, units, changeUnits, validAnswer, line } from './utilities';
import {convert, Unit, BestKind} from 'convert';
import { makeIngredient } from './ingredients';
import { ProbingHashtable } from './hashtables';
import { Cookbook } from "../main";


// const { convert } = require("convert")
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



export function emptyRecipe(keysToHashed: Array<Pair<string, number>>): Recipe {
    const empty_recipe: Recipe = {
        name: validAnswer("Name: > ", "").toLowerCase(),
        id: getRandomArbitrary(1000, 9999, keysToHashed),                     
        servings: parseInt(validAnswer("Estimated servings: > ", "num")),
        instructions: "",
        ingredients: [],
        measurements: [],
        unit: "metric"
    }
    return empty_recipe
}




export function createRecipe(hashedTable: Cookbook, keysToHashed: Array<Pair<string, number>>): void {
    line()
    console.log("Enter the following information for your recipe \n(It is possible to change this afterwards, don't worry.)")
    const newRecipe: Recipe = emptyRecipe(keysToHashed)
    let done : Boolean = true;
    while (done === true) {
        makeIngredient(newRecipe, validAnswer("Name an ingredient > ", ""), hashedTable);
        done = prompt("Add another ingredient? (y/n) ").toLowerCase() === "y" ? true : false; // felhantering
    } 
    newRecipe.instructions = validAnswer("instructions: > ", "")
    viewRecipe(newRecipe)
    keysToHashed.push(pair(newRecipe.name, newRecipe.id))
    ph_insert(hashedTable, newRecipe.id, newRecipe)
}

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

export function searchRecipe(keysToHashed: Array<Pair<string, number>>, cookbook: Cookbook): Recipe |  boolean {  
    const userSearch: string = validAnswer("Search >", "").toLowerCase()                              
    const searchResult: Array<string> = []
    keysToHashed.forEach(element => {       //finns det någon match? (för sökningen) -> lägg till i searchREsult
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
   
    for(let i = 0; i < keysToHashed.length; i++) { //titta på deet här
        console.log(keysToHashed, chosenRecipeName)
        if(head(keysToHashed[i]) === chosenRecipeName) { //
            const recipeSearch : Recipe | undefined = ph_lookup(cookbook, tail(keysToHashed[i]))
            recipeSearch === undefined ? userChoice = false : userChoice = recipeSearch
        }
    }
    return userChoice
}