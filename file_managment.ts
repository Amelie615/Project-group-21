import { Cookbook } from "./main";
import { ph_empty, hash_id, ph_insert, ph_lookup } from "./lib/hashtables";
import { Recipe, createRecipe } from "./lib/recipe";
import { Pair } from "./lib/list";
import * as fs from 'fs';
import { validAnswer } from "./lib/utilities";


const keysToHashed : Array<Pair<string, number>>= []
const myBook : Cookbook = ph_empty(1, hash_id);
createRecipe(myBook, keysToHashed)
createRecipe(myBook, keysToHashed)
createRecipe(myBook, keysToHashed)
// console.log(keysToHashed)

//const JSONtest = JSON.stringify(ph_lookup(testHashtable, keysToHashed[0][1]))
// localStorage.setItem("italiensk" , test)
// console.log("hejhopp klar")

// function saveRecipeOld(recipe) {
//     fs.writeFile('italian.txt', JSONtest, (err: NodeJS.ErrnoException | null) => {
//     if (err) throw err;
//     console.log('Saved!');
//   });
// }

/**
 * Function to implement:
 * 1. Function that saves a cookbook to a file with a specified name (in: filename to create, cookbook to save)
 *      a. if the file already exits, ask if they wish to overwrite 
 * --------------
 * 2. Function that returns a specified cookbook from a file
 *      a. Read the file
 *      b. recreate with zod library
 *      c. return cookbook
 * 3. Re-create main menu
 *      a. Open or Create New cookbook
 *          i. Open calls (2)
 *          ii. Create calls function to create new cookbook
 *              1. Decide how big the hashtable should be. (Can't be zero, should be warning for larger sizes. (Premium edition))
 *              note: id should only be as big as size of hashtable, no?
 *              won't need to name it before saving it.
 */



function saveCookbook(cookbook : Cookbook) : void {
    const cookbookName : string = validAnswer("Name your cookbook: >", "", []).toLowerCase()
    if (fs.existsSync("cookbookShelf/" + cookbookName + '.json')) {
        if (validAnswer("A cookbook with the name " + cookbookName + " already exists, do you wish to overwrite it?", "opt", ["y", "n"]).toLowerCase() === "n") {
            console.log("Saving cancelled.")
        } else {
            fs.writeFileSync("cookbookShelf/" + cookbookName + ".json", JSON.stringify(cookbook))
            console.log("Overwritten succesfully. Save completed.")
        }
    } else {
        fs.writeFileSync("cookbookShelf/" + cookbookName + ".json", JSON.stringify(cookbook))
        console.log("Save completed.")
    }
}

//Typeguard
function isCookbook(possibleCookbook : unknown): possibleCookbook is Cookbook {
    if (typeof possibleCookbook === "object" || possibleCookbook !== null) {
        const assertedCookbook = possibleCookbook as Cookbook

        return isKeys(assertedCookbook.keys) && 
    } return false;
        
}

function isKeys(possibleKeys : unknown): possibleKeys is number | null | undefined {
    return typeof possibleKeys === "number" || possibleKeys === "null" || possibleKeys === "undefined";
}

function isCookbookEntries(possibleEntries : unknown) : possibleEntries is Array<Recipe | undefined> {
    if (Array.isArray(possibleEntries) && possibleEntries !== null) {
        
        possibleEntries.every(item => typeof item === "Recipe")
    } return false
}

//
function retriveCookbook(filename: string) : object  {
    const possibleCookbook = fs.readFileSync(filename, 'utf-8')
    return JSON.parse(possibleCookbook)
}

function newFunction() {
    const possibleCookbook : object = retriveCookbook("italian.json")
    saveCookbook(myBook)
    retriveCookbook("cookbookShelf/italian.json")
    
    
}


// fs.readFile('italian.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);

// });