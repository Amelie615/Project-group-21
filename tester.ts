import * as PromptSync from "prompt-sync";
import {pair, head, tail, Pair} from '../Project-group-21/lib/list';
import { hash_id, ph_empty, HashFunction, ph_insert, ph_lookup } from "./lib/hashtables";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

type Measurements = Array<Pair<Number, String>>
type Ingredients = Array<string> 
type Recipe = {
    name: string,
    id: number,
    ingredients: Ingredients,
    measurements: Measurements,
    servings: number,
    tags: Array<string> | null,
    instructions: string
} 
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

const units = ["ml", "l", "g", "dl"]

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function viewRecipe(id, hashedTable) {
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


function createRecipe(hashedTable, keysToHashed) {
    const newRecipe: Recipe = {
        name: prompt("name: > "),
        id: getRandomArbitrary(1000, 9999),                      //make sure its unique
        servings: prompt("Estimated servings: > "),
        tags: null,
        instructions: prompt("instructions: > "),
        ingredients: [],
        measurements: [],
    }

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

function cookbook(tag, hashedTable, keysToHashed) {
    while (true) {
        const test = questioneer(["Create Recipe", "View Recipe", "Close cookbook"])
    switch(test) {
        case(1):
            createRecipe(hashedTable, keysToHashed)
            break;
        case(2):
            //skapa en lista med alla receptnamn
            //call questioneer -> vi får tbx en siffra som är index + 1
            //använd indexet för att hitta id och på så sätt displaya receptet
            const names : Array<string> = []
            keysToHashed.forEach(element => {
                names.push(head(element))
            });
            
            viewRecipe(tail(keysToHashed[questioneer(names)-1]), hashedTable) 
            break;
        case(3):
            return false
        default:
            console.log("Invalid input")
    }
}}
function questioneer(vallista) : number {
    for(let i = 0; i < vallista.length; i++) {
        console.log(i + 1 + " " + vallista[i]);
    }
    let q: string = prompt(">  ")
    return(Number(q));
}

function main() {
    const hashedTable = ph_empty(13, hash_id)
    let keysToHashed = [] //pair(name, id)
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



// const hashedTable = ph_empty(13, hash_id) 

 const firstRecipe = {name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [pair(200, "g"), pair(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk."}
// ph_insert(hashedTable, firstRecipe.id, firstRecipe)
// //ph_lookup(hashedTable, firstRecipe.id)
// console.log(ph_lookup(hashedTable, firstRecipe.id))

// function KNATCHY(string) {
//     return(accumulate((x) => x.charat(0), 0, string.split()))
// }

main();

// Array.prototype.reduce()