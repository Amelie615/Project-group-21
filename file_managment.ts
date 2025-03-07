import { Cookbook } from "./main";
import { ph_empty, hash_id, ph_insert, ph_lookup } from "./lib/hashtables";
import { Recipe, createRecipe } from "./lib/recipe";
import { Pair } from "./lib/list";
import * as fs from 'fs';
//const fs = require('fs');

//const pasta : Recipe = {}

const keysToHashed : Array<Pair<string, number>>= []
const myBook : Cookbook = ph_empty(2, hash_id);
createRecipe(myBook, keysToHashed)
createRecipe(myBook, keysToHashed)
createRecipe(myBook, keysToHashed)
console.log(keysToHashed)

//const JSONtest = JSON.stringify(ph_lookup(testHashtable, keysToHashed[0][1]))
// localStorage.setItem("italiensk" , test)
// console.log("hejhopp klar")

// function saveRecipeOld(recipe) {
//     fs.writeFile('italian.txt', JSONtest, (err: NodeJS.ErrnoException | null) => {
//     if (err) throw err;
//     console.log('Saved!');
//   });
// }


function saveAll(filename) {
    fs.writeFileSync(filename, JSON.stringify(myBook))
}

function findInformationOld(filename : string) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                console.error("File not found:", err.path);
            } else {
                console.error("Error reading file:", err);
            }
        } 
        console.log("test: possible recipe", data)
        return data;
    });
}

function findInformation(filename: string) {
    const possibleRecipe = fs.readFileSync(filename, 'utf-8')
    console.log(possibleRecipe)
    console.log(JSON.parse(possibleRecipe))
}

function newFunction() {
    saveAll('italian.txt')
    findInformation('italian.txt')
}

newFunction()
// fs.readFile('italian.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);

// });