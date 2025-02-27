import {pair, head, tail, Pair,} from './lib/list';
import { hash_id, ph_empty, HashFunction, ph_insert, ph_lookup } from "./lib/hashtables";
import * as PromptSync from "prompt-sync";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

export type Recipe = {
    name: string,
    id: number,
    ingredients: Ingredients,
    measurements: Measurements,
    servings: number,
    tags: Array<string>,
    instructions: string
} 
export type Measurements = Array<Pair<Number, String>>
export type Ingredients = Array<string> 



export function emptyRecipe() {
    const empty_recipe: Recipe = {
        name: prompt("name: > "),
        id: getRandomArbitrary(1000, 9999),                      //make sure its unique
        servings: prompt("Estimated servings: > "),
        tags: [],
        instructions: prompt("instructions: > "),
        ingredients: [],
        measurements: [],
    }
    return empty_recipe
}

export function createRecipe(hashedTable, keysToHashed) { // JÄTTEFUL FIXA SNÄLLA
    const newRecipe: Recipe = emptyRecipe()

    let done : Boolean = true;
    while (done === true) {
        const addedIngredient : string = prompt("Name a ingredient > ");
        newRecipe.ingredients.push(addedIngredient);
        const ourString = "Enter amount of ".concat(addedIngredient, "> ")
        const inputMeasurements = prompt(ourString)
        const integersFromMeasurements = inputMeasurements.match(/(\d+)/)[1] //asså det här är ju bara inte rätt men inte fel, lös det
        let lettersFromMeasurements: string = ""
        for (let i = 0; i < units.length; i++) {
            if (inputMeasurements.search(units[i]) === -1) {
                continue
            } else {
                lettersFromMeasurements = units[i]
            }
        }
        newRecipe.measurements.push(pair(integersFromMeasurements, lettersFromMeasurements))
           
        done = prompt("Add another ingredient? true/ false ") === "true" ? true : false;
    } console.log(newRecipe.measurements)
    console.log(newRecipe)
    keysToHashed.push(pair(newRecipe.name, newRecipe.id))       //Check så att duplicate of id inte finns
    ph_insert(hashedTable, newRecipe.id, newRecipe)
    console.log(ph_lookup(hashedTable, newRecipe.id))
}


export function viewRecipe(id, hashedTable) {
    const recipe : Recipe | undefined = ph_lookup(hashedTable, id)
    if (recipe === undefined) {console.log("error")}
    else {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log(recipe.name)
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n")
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

export function searchRecipe(keysToHashed, hashedTable): Recipe | undefined |  boolean {  //Massa felhantering behövs här (ska inte kunna returna undefined)
    const userSearch = prompt("Search >")                              //Snarare typ en flag som säger false eller ngt
    const searchResult: Array<string> = []
    keysToHashed.forEach(element => {
        const name : string = head(element)
        if (name.search(userSearch) !== -1 ) {
            searchResult.push(name)
        }
    });
    if (searchResult === undefined) {
        return false
    }
   const chosenRecipeName = userSearch[questioneer(searchResult)- 1]
   for(let i = 0; i < keysToHashed; i++) {
    if(head(keysToHashed[i]) === chosenRecipeName) {
        return ph_lookup(hashedTable, tail(keysToHashed[i]))
        }
     }
}