import { Cookbook } from "../main";
import { ph_empty, hash_id, ph_insert, ph_lookup } from "./hashtables";
import { Recipe, createRecipe } from "./recipe";
import { Pair } from "./list";
import * as fs from 'fs';
//const fs = require('fs');

//const pasta : Recipe = {}

const keysToHashed : Array<Pair<string, number>>= []
const testHashtable : Cookbook = ph_empty(10, hash_id);
createRecipe(testHashtable, keysToHashed)
console.log(keysToHashed)

const JSONtest = JSON.stringify(ph_lookup(testHashtable, keysToHashed[0][1]))
// localStorage.setItem("italiensk" , test)
// console.log("hejhopp klar")

fs.writeFile('italian.txt', JSONtest, (err: NodeJS.ErrnoException | null) => {
    if (err) throw err;
    console.log('Saved!');
  });

function findInformation() {
    const possibleRecipe = fs.readFile('italian.txt', 'utf8', (err, data) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                return JSON.parse(data);
                            });
    console.log(possibleRecipe)
}

// fs.readFile('italian.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);

// });