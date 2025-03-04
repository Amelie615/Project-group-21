"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyRecipe = emptyRecipe;
exports.createRecipe = createRecipe;
exports.viewRecipe = viewRecipe;
exports.searchRecipe = searchRecipe;
var list_1 = require("./list");
var hashtables_1 = require("./hashtables");
var PromptSync = require("prompt-sync");
var utilities_1 = require("./utilities");
var ingredients_1 = require("./ingredients");
// const { convert } = require("convert")
var prompt = PromptSync({ sigint: true });
function emptyRecipe(keysToHashed) {
    var empty_recipe = {
        name: prompt("name: > ").toLowerCase(),
        id: (0, utilities_1.getRandomArbitrary)(1000, 9999, keysToHashed), //make sure its unique
        servings: prompt("Estimated servings: > "),
        tags: [],
        instructions: prompt("instructions: > "),
        ingredients: [],
        measurements: [],
        unit: "metric"
    };
    return empty_recipe;
}
function createRecipe(hashedTable, keysToHashed) {
    var newRecipe = emptyRecipe(keysToHashed);
    var done = true;
    while (done === true) {
        (0, ingredients_1.makeIngredient)(newRecipe, prompt("Name an ingredient > "));
        done = prompt("Add another ingredient? true/ false ") === "true" ? true : false;
    }
    (0, utilities_1.changeUnits)(newRecipe, hashedTable, "");
    console.log(newRecipe);
    keysToHashed.push((0, list_1.pair)(newRecipe.name, newRecipe.id)); //Check så att duplicate of id inte finns
    (0, hashtables_1.ph_insert)(hashedTable, newRecipe.id, newRecipe);
}
function viewRecipe(recipe) {
    console.log(recipe);
    if (recipe === undefined) {
        console.log("error");
    }
    else {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(recipe.name);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n");
        console.log("ingredients: \n");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
        for (var i = 0; i < recipe.ingredients.length; i++) {
            console.log(recipe.ingredients[i] + " " + (0, list_1.head)(recipe.measurements[i]) + (0, list_1.tail)(recipe.measurements[i]) + "\n");
        }
        console.log("servings" + " " + recipe.servings + "\n");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("instructions");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n");
        console.log(recipe.instructions + "\n");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n");
    }
}
function searchRecipe(keysToHashed, hashedTable) {
    var userSearch = prompt("Search >").toLowerCase();
    var searchResult = [];
    keysToHashed.forEach(function (element) {
        var name = (0, list_1.head)(element);
        if (name.search(userSearch) !== -1) {
            searchResult.push(name);
        }
    });
    var userChoice = true;
    if (searchResult === undefined) {
        userChoice = false;
    }
    var chosenRecipeName = searchResult[(0, utilities_1.questionnaire)(searchResult) - 1];
    for (var i = 0; i < keysToHashed.length; i++) { //titta på deet här
        console.log(keysToHashed, chosenRecipeName);
        if ((0, list_1.head)(keysToHashed[i]) === chosenRecipeName) { //
            var recipeSearch = (0, hashtables_1.ph_lookup)(hashedTable, (0, list_1.tail)(keysToHashed[i]));
            recipeSearch === undefined ? userChoice = false : userChoice = recipeSearch;
        }
    }
    return userChoice;
}
