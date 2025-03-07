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
        name: (0, utilities_1.validAnswer)("Name: > ", "").toLowerCase(),
        id: (0, utilities_1.getRandomArbitrary)(1000, 9999, keysToHashed),
        servings: parseInt((0, utilities_1.validAnswer)("Estimated servings: > ", "num")),
        instructions: "",
        ingredients: [],
        measurements: [],
        unit: "metric"
    };
    return empty_recipe;
}
function createRecipe(hashedTable, keysToHashed) {
    (0, utilities_1.line)();
    console.log("Enter the following information for your recipe \n(It is possible to change this afterwards, don't worry.)");
    var newRecipe = emptyRecipe(keysToHashed);
    var done = true;
    while (done === true) {
        (0, ingredients_1.makeIngredient)(newRecipe, (0, utilities_1.validAnswer)("Name an ingredient > ", ""), hashedTable);
        done = prompt("Add another ingredient? (y/n) ").toLowerCase() === "y" ? true : false; // felhantering
    }
    newRecipe.instructions = (0, utilities_1.validAnswer)("instructions: > ", "");
    viewRecipe(newRecipe);
    keysToHashed.push((0, list_1.pair)(newRecipe.name, newRecipe.id));
    (0, hashtables_1.ph_insert)(hashedTable, newRecipe.id, newRecipe);
}
function viewRecipe(recipe) {
    console.log(recipe);
    if (recipe === undefined) {
        console.log("error");
    }
    else {
        (0, utilities_1.line)();
        console.log(recipe.name);
        (0, utilities_1.line)();
        console.log("ingredients: ");
        (0, utilities_1.line)();
        for (var i = 0; i < recipe.ingredients.length; i++) {
            console.log(recipe.ingredients[i] + " " + (0, list_1.head)(recipe.measurements[i]) + (0, list_1.tail)(recipe.measurements[i]) + "\n");
        }
        console.log("servings" + " " + recipe.servings);
        (0, utilities_1.line)();
        console.log("instructions");
        (0, utilities_1.line)();
        console.log(recipe.instructions + "\n");
    }
}
function searchRecipe(keysToHashed, cookbook) {
    var userSearch = (0, utilities_1.validAnswer)("Search >", "").toLowerCase();
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
            var recipeSearch = (0, hashtables_1.ph_lookup)(cookbook, (0, list_1.tail)(keysToHashed[i]));
            recipeSearch === undefined ? userChoice = false : userChoice = recipeSearch;
        }
    }
    return userChoice;
}
