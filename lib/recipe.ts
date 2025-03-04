import {pair, head, tail, Pair,} from './list';
import { hash_id, ph_empty, HashFunction, ph_insert, ph_lookup, ProbingHashtable } from "./hashtables";
import * as PromptSync from "prompt-sync";
import {questioneer, getRandomArbitrary, units, changeUnits } from './utilities';
import {convert, Unit, BestKind} from 'convert';

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



export function emptyRecipe() {
    const empty_recipe: Recipe = {
        name: prompt("name: > ").toLowerCase(),
        id: getRandomArbitrary(1000, 9999),                      //make sure its unique
        servings: prompt("Estimated servings: > "),
        tags: [],
        instructions: prompt("instructions: > "),
        ingredients: [],
        measurements: [],
        unit: "metric"
    }
    return empty_recipe
}

export function createRecipe(hashedTable, keysToHashed) { // JÄTTEFUL FIXA SNÄLLA
    const newRecipe: Recipe = emptyRecipe()

    let done : Boolean = true;
    while (done === true) {
        const addedIngredient = prompt("Name a ingredient > ");
        newRecipe.ingredients.push(addedIngredient);
        const ourString = "Enter amount of ".concat(addedIngredient, "> ")
        const inputMeasurements = prompt(ourString)
        const integersFromMeasurements : number = Math.floor(inputMeasurements.match(/(\d+)/)[1]) //asså det här är ju bara inte rätt men inte fel, lös det
        
        let lettersFromMeasurements: Unit = inputMeasurements.replace(/\d+|^\s+|\s+$/g,''); //ful default

        newRecipe.measurements.push(pair(integersFromMeasurements, lettersFromMeasurements))
        done = prompt("Add another ingredient? true/ false ") === "true" ? true : false;
        
    } 
    changeUnits(newRecipe, hashedTable, "")
   

    console.log(newRecipe.measurements)
    console.log(newRecipe)
    keysToHashed.push(pair(newRecipe.name, newRecipe.id))       //Check så att duplicate of id inte finns
    ph_insert(hashedTable, newRecipe.id, newRecipe)
    console.log(ph_lookup(hashedTable, newRecipe.id))
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
    const chosenRecipeName = searchResult[questioneer(searchResult)- 1]
   
    for(let i = 0; i < keysToHashed.length; i++) {
        console.log("HEJ")
        console.log(keysToHashed, chosenRecipeName)
        if(head(keysToHashed[i]) === chosenRecipeName) { //
            const recipeSearch : Recipe | undefined = ph_lookup(hashedTable, tail(keysToHashed[i]))
            recipeSearch === undefined ? userChoice = false : userChoice = recipeSearch
            console.log("DEN KOMMER IN")
        }
    }
    return userChoice
}