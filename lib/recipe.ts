import {pair, head, tail, Pair,} from './list';
import {ph_insert, ph_lookup} from "./hashtables";
import * as PromptSync from "prompt-sync";
import {questionnaire, getRandomArbitrary, units, changeUnits } from './utilities';
import {convert, Unit, BestKind} from 'convert';
import { makeIngredient } from './ingredients';


// const { convert } = require("convert")
const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export type Recipe = {
    name: string,
    id: number,
    ingredients: Ingredients,
    measurements: Measurements, //Array<Pair<Number, String>>
    servings: number,
    tags: Array<string>,
    instructions: string,
    unit: BestKind | undefined
} 
export type Measurements = Array<Pair<number, Unit | string>>
export type Ingredients = Array<string> 



export function emptyRecipe(keysToHashed) {
    const empty_recipe: Recipe = {
        name: prompt("name: > ").toLowerCase(),
        id: getRandomArbitrary(1000, 9999, keysToHashed),                      //make sure its unique
        servings: prompt("Estimated servings: > "),
        tags: [],
        instructions: prompt("instructions: > "),
        ingredients: [],
        measurements: [],
        unit: "metric"
    }
    return empty_recipe
}

export function createRecipe(hashedTable, keysToHashed) {
    const newRecipe: Recipe = emptyRecipe(keysToHashed)
    let done : Boolean = true;
    while (done === true) {
        makeIngredient(newRecipe, prompt("Name an ingredient > "));
        done = prompt("Add another ingredient? true/ false ") === "true" ? true : false;
    } 
    changeUnits(newRecipe, hashedTable, "")
    console.log(newRecipe)
    keysToHashed.push(pair(newRecipe.name, newRecipe.id))       //Check så att duplicate of id inte finns
    ph_insert(hashedTable, newRecipe.id, newRecipe)
}

export function viewRecipe(recipe : Recipe) {
    console.log(recipe)
    if (recipe === undefined) {console.log("error")}
    else {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log(recipe.name)
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n")
    console.log("ingredients: \n")
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~")
    for (let i = 0; i < recipe.ingredients.length; i++ ) {
        console.log(recipe.ingredients[i] + " " + head(recipe.measurements[i]) + tail(recipe.measurements[i]) + "\n")
    }
    console.log("servings" + " " + recipe.servings + "\n")
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("instructions")
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n")
    console.log(recipe.instructions + "\n")
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n")
    }
}

export function searchRecipe(keysToHashed, hashedTable): Recipe |  boolean {  
    const userSearch = prompt("Search >").toLowerCase()                              
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
            const recipeSearch : Recipe | undefined = ph_lookup(hashedTable, tail(keysToHashed[i]))
            recipeSearch === undefined ? userChoice = false : userChoice = recipeSearch
        }
    }
    return userChoice
}