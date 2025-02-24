import * as PromptSync from "prompt-sync";
import {pair, head, tail} from '../Project-group-21/lib/list';
import { hash_id, ph_empty, HashFunction, ph_insert, ph_lookup } from "./lib/hashtables";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });


/**
 * Datatypes EX:
 * Recept = {
 *          name: "goat tomato soup"
 *          id: 1001
 *          ingredients: ["tomatoes", "heavy cream"],
 *          amounts: [pair(number, measurment), pair(4, L), ...]
 *          servings: 4
 *          tags: [soup, good]
 *          description: "Mega-lore-core"
 *              }
 * 
 * Kokbok = probing_hashtable
 * 
 */

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function viewRecipe(recipe) {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log(recipe.name)
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n")
    for (let i = 0; i < recipe.ingredients.length; i++ ) {
        console.log(recipe.ingredients[i] + " " + head(recipe.amount[i]) + tail(recipe.amount[i]) + "\n")
    }
    console.log("servings" + " " + recipe.servings + "\n")
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("instructions")
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n")
    console.log(recipe.description + "\n")
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n")
}




// view_recipe(firstRecipe)

function createRecipe() {
    return "hej"
}

function option3() {
    return "hej"
}
function questioneer(vallista) {
    for(let i = 0; i < vallista.length; i++) {
        console.log(i + 1 + " " + vallista[i]);
    }
    let q: string = prompt(">  ")
    return(q);
}

function main() {
    const test = questioneer(["Create Recipe", "View Recipe", "option3"])
    switch(test) {
        case("1"):
            createRecipe()
            break;
        case("2"):
            viewRecipe(firstRecipe)
            break;
        case("3"): 
            option3()
            break;
        default: console.log("default")
        }
}

const hashedTable = ph_empty(13, hash_id) 

const firstRecipe = {name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [pair(200, "g"), pair(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk."}
ph_insert(hashedTable, firstRecipe.id, firstRecipe)
//ph_lookup(hashedTable, firstRecipe.id)
console.log(ph_lookup(hashedTable, firstRecipe.id))
function KNATCHY(string) {
    return(accumulate((x) => x.charat(0), 0, string.split()))
}

main();

// Array.prototype.reduce()