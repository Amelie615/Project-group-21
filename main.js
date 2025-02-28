"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var list_1 = require("./lib/list");
var hashtables_1 = require("./lib/hashtables");
var recipe_1 = require("./recipe");
var utilities_1 = require("./lib/utilities");
var convert_1 = require("convert");
// const { convert } = require("convert")
var prompt = PromptSync({ sigint: true });
function cookbook(tag, hashedTable, keysToHashed) {
    while (true) {
        var test = (0, utilities_1.questioneer)(["Create recipe", "Search recipe", "Edit Recipe", "Close cookbook"]);
        switch (test) {
            case (1):
                (0, recipe_1.createRecipe)(hashedTable, keysToHashed);
                break;
            case (2):
                var search = (0, recipe_1.searchRecipe)(keysToHashed, hashedTable);
                if (typeof search === "boolean") {
                    if (search === true) {
                        console.log("search blev true");
                    }
                    else {
                        console.log("Search blev false");
                    }
                }
                else {
                    (0, recipe_1.viewRecipe)(search);
                }
                // const names : Array<string> = []    //ger en lista av alla recipes som matchar sökningen
                // keysToHashed.forEach(element => {
                //     names.push(head(element))
                // });
                // const searchedRecipe = searchRecipe(keysToHashed, hashedTable)
                // if (typeof searchedRecipe === "boolean") {
                //     console.log("No recipe was found.")
                // } else { viewRecipe(searchedRecipe) }
                // searchedRecipe = searchRecipe(keysToHashed, hashedTable)
                // viewRecipe(searchedRecipe, hashedTable)
                break;
            case (3):
                var searchedRecipe = (0, recipe_1.searchRecipe)(keysToHashed, hashedTable);
                if (typeof searchedRecipe === "boolean") { //=== false || true) {
                    console.log("No recipe was found.");
                }
                else {
                    editRecipe(searchedRecipe, hashedTable);
                }
                break;
            case (4):
                return false;
            default:
                console.log("Invalid input");
        }
    }
}
//Axels lekland-------------------------------------------------
function editRecipe(recipe, table) {
    (0, recipe_1.viewRecipe)(recipe);
    console.log("What do you want to do?");
    switch ((0, utilities_1.questioneer)(["Edit ingredients and measurements", "Edit instructions", "Edit name"])) {
        case (1):
            ingredientAndMesasurmentsEditSubmenu(recipe, table);
        case (2):
            console.log("current instructions: " + recipe.instructions);
            recipe.instructions = prompt("");
            break;
        case (2):
            console.log("current name: " + recipe.name);
            recipe.name = prompt("");
            break;
        default:
            console.log("Invalid input");
    }
}
function ingredientAndMesasurmentsEditSubmenu(recipe, table) {
    console.log("What do you want to do?");
    switch ((0, utilities_1.questioneer)(["Change serving amount", "Change units", "Edit ingredients"])) {
        case (1):
            changeServing(recipe, table);
            break;
        case (2):
            changeUnits(recipe, table);
            break;
        case (3):
            editIngredients(recipe, table);
            break;
        default:
            console.log("Invalid input");
            break;
    }
}
function changeServing(recipe, table) {
    console.log("Recipe currently serves " + recipe.servings + " people");
    var newServings = parseInt(prompt("New serving size: "), 10);
    for (var i = 0; i < recipe.measurements.length; i++) {
        var currentIngredient = (0, list_1.head)(recipe.measurements[i]);
        recipe.measurements[i] = (0, list_1.pair)(currentIngredient / recipe.servings * newServings, (0, list_1.tail)(recipe.measurements[i]));
    }
    recipe.servings = newServings;
    console.log("The new recipe: \n");
    (0, recipe_1.viewRecipe)(recipe);
}
function changeUnits(recipe, table) {
    if (recipe.unit === "metric") {
        for (var i = 0; i < recipe.measurements.length; i++) {
            var conversion = (0, convert_1.convert)((0, list_1.head)(recipe.measurements[i]), (0, list_1.tail)(recipe.measurements[i])).to("best", "imperial");
            recipe.measurements[i] = (0, list_1.pair)(conversion.quantity, conversion.unit);
            console.log(recipe.measurements[i]);
        }
    }
    else if (recipe.unit === "imperial") {
        for (var i = 0; i < recipe.measurements.length; i++) {
            var conversion = (0, convert_1.convert)((0, list_1.head)(recipe.measurements[i]), (0, list_1.tail)(recipe.measurements[i])).to("best", "metric");
            recipe.measurements[i] = (0, list_1.pair)(conversion.quantity, conversion.unit);
            console.log(recipe.measurements[i]);
        }
    }
}
function editIngredients(recipe, table) {
    switch ((0, utilities_1.questioneer)(["add ingredient", "remove ingredient", "edit ingredient"])) {
        case (1):
            break; // Släng in add ingredient från creatRecipe, som func eller inte.
        case (2):
            var indexToRemove = recipe.ingredients.find(prompt("What ingredient do you want to remove?\n> "));
            if (indexToRemove === 1) {
            }
            else {
                console.log("Ingredient doesn't exist");
            }
        case (3):
            break;
    }
}
//Axels lekland-------------------------------------------------
function main() {
    var hashedTable = (0, hashtables_1.ph_empty)(13, hashtables_1.hash_id);
    var keysToHashed = []; //pair(name, id)
    while (true) {
        var test = (0, utilities_1.questioneer)(["Open", "Quit"]);
        switch (test) {
            case (1):
                cookbook("tag", hashedTable, keysToHashed); //Använder inte tagen just nu så bara placeholder
                break;
            case (2):
                return false;
            default: console.log("default");
        }
    }
}
var firstRecipe = { name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [(0, list_1.pair)(200, "g"), (0, list_1.pair)(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk." };
main();
