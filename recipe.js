"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyRecipe = emptyRecipe;
exports.createRecipe = createRecipe;
exports.viewRecipe = viewRecipe;
exports.searchRecipe = searchRecipe;
var list_1 = require("./lib/list");
var hashtables_1 = require("./lib/hashtables");
var PromptSync = require("prompt-sync");
var utilities_1 = require("./lib/utilities");
var prompt = PromptSync({ sigint: true });
function emptyRecipe() {
    var empty_recipe = {
        name: prompt("name: > "),
        id: (0, utilities_1.getRandomArbitrary)(1000, 9999), //make sure its unique
        servings: prompt("Estimated servings: > "),
        tags: [],
        instructions: prompt("instructions: > "),
        ingredients: [],
        measurements: [],
    };
    return empty_recipe;
}
function createRecipe(hashedTable, keysToHashed) {
    var newRecipe = emptyRecipe();
    var done = true;
    while (done === true) {
        var addedIngredient = prompt("Name a ingredient > ");
        newRecipe.ingredients.push(addedIngredient);
        var ourString = "Enter amount of ".concat(addedIngredient, "> ");
        var inputMeasurements = prompt(ourString);
        var integersFromMeasurements = inputMeasurements.match(/(\d+)/)[1]; //asså det här är ju bara inte rätt men inte fel, lös det
        var lettersFromMeasurements = "";
        for (var i = 0; i < utilities_1.units.length; i++) {
            if (inputMeasurements.search(utilities_1.units[i]) === -1) {
                continue;
            }
            else {
                lettersFromMeasurements = utilities_1.units[i];
            }
        }
        newRecipe.measurements.push((0, list_1.pair)(integersFromMeasurements, lettersFromMeasurements));
        done = prompt("Add another ingredient? true/ false ") === "true" ? true : false;
    }
    console.log(newRecipe.measurements);
    console.log(newRecipe);
    keysToHashed.push((0, list_1.pair)(newRecipe.name, newRecipe.id)); //Check så att duplicate of id inte finns
    (0, hashtables_1.ph_insert)(hashedTable, newRecipe.id, newRecipe);
    console.log((0, hashtables_1.ph_lookup)(hashedTable, newRecipe.id));
}
function viewRecipe(recipe) {
    // const recipe : Recipe | undefined = ph_lookup(hashedTable, id)
    console.log(recipe);
    if (recipe === undefined) {
        console.log("error");
    }
    else {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(recipe.name);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~\n");
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
    var userSearch = prompt("Search >");
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
    var chosenRecipeName = searchResult[(0, utilities_1.questioneer)(searchResult) - 1];
    for (var i = 0; i < keysToHashed.length; i++) {
        console.log("HEJ");
        console.log(keysToHashed, chosenRecipeName);
        if ((0, list_1.head)(keysToHashed[i]) === chosenRecipeName) { //
            var recipeSearch = (0, hashtables_1.ph_lookup)(hashedTable, (0, list_1.tail)(keysToHashed[i]));
            recipeSearch === undefined ? userChoice = false : userChoice = recipeSearch;
            console.log("DEN KOMMER IN");
        }
    }
    return userChoice;
}
