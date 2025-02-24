"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var list_1 = require("../Project-group-21/lib/list");
var hashtables_1 = require("./lib/hashtables");
var prompt = PromptSync({ sigint: true });
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
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(recipe.name);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n");
    for (var i = 0; i < recipe.ingredients.length; i++) {
        console.log(recipe.ingredients[i] + " " + (0, list_1.head)(recipe.amount[i]) + (0, list_1.tail)(recipe.amount[i]) + "\n");
    }
    console.log("servings" + " " + recipe.servings + "\n");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("instructions");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n");
    console.log(recipe.description + "\n");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n");
}
// view_recipe(firstRecipe)
function createRecipe() {
    return "hej";
}
function option3() {
    return "hej";
}
function questioneer(vallista) {
    for (var i = 0; i < vallista.length; i++) {
        console.log(i + 1 + " " + vallista[i]);
    }
    var q = prompt(">  ");
    return (q);
}
function main() {
    var test = questioneer(["Create Recipe", "View Recipe", "option3"]);
    switch (test) {
        case ("1"):
            createRecipe();
            break;
        case ("2"):
            viewRecipe(firstRecipe);
            break;
        case ("3"):
            option3();
            break;
        default: console.log("default");
    }
}
var hashedTable = (0, hashtables_1.ph_empty)(13, hashtables_1.hash_id);
var firstRecipe = { name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [(0, list_1.pair)(200, "g"), (0, list_1.pair)(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk." };
(0, hashtables_1.ph_insert)(hashedTable, firstRecipe.id, firstRecipe);
//ph_lookup(hashedTable, firstRecipe.id)
console.log((0, hashtables_1.ph_lookup)(hashedTable, firstRecipe.id));
main();
