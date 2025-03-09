"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRecipe = initializeRecipe;
exports.createRecipe = createRecipe;
exports.viewRecipe = viewRecipe;
exports.searchRecipe = searchRecipe;
var list_1 = require("./list");
var hashtables_1 = require("./hashtables");
var PromptSync = require("prompt-sync");
var utilities_1 = require("./utilities");
var ingredients_1 = require("./ingredients");
var prompt = PromptSync({ sigint: true });
/**
 * initializes a new recipe
 * @param {CookbookKeys} keys the name and id for all recipes in cookbook
 * @returns a recipe
 */
function initializeRecipe(keys) {
    var newRecipe = {
        name: (0, utilities_1.validAnswer)("Name: > ", "", []).toLowerCase(),
        id: (0, utilities_1.getRandomArbitrary)(1000, 9999, keys),
        servings: parseInt((0, utilities_1.validAnswer)("Estimated servings: > ", "num", [])),
        instructions: "",
        ingredients: [],
        measurements: [],
        unit: "metric"
    };
    return newRecipe;
}
/**
 * creates a new recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 * @param {CookbookKeys} keys the name and id for all recipes in cookbook
 */
function createRecipe(cookbook, keys) {
    (0, utilities_1.line)();
    console.log("Enter the following information for your recipe \n(It is possible to change this afterwards, don't worry.)");
    var newRecipe = initializeRecipe(keys);
    var done = true;
    while (done === true) {
        var ingredient = (0, utilities_1.validAnswer)("Name an ingredient > ", "", []);
        (0, ingredients_1.makeIngredient)(newRecipe, ingredient, cookbook);
        if ((0, utilities_1.validAnswer)("Do you want to add another ingredient? y/n > ", "opt", ["n", "y"]).toLowerCase() === "n") {
            done = false;
        }
    }
    newRecipe.instructions = (0, utilities_1.validAnswer)("instructions: > ", "", []);
    viewRecipe(newRecipe);
    keys.push((0, list_1.pair)(newRecipe.name, newRecipe.id));
    (0, hashtables_1.ph_insert)(cookbook, newRecipe.id, newRecipe);
}
/**
 * prints out recipe
 * @param {Recipe} recipe the chosen recipe
 */
function viewRecipe(recipe) {
    console.log(recipe);
    if (recipe === undefined) {
        console.log("error");
    }
    else {
        (0, utilities_1.line)();
        console.log(recipe.name);
        (0, utilities_1.line)();
        console.log("ingredients: \n");
        (0, ingredients_1.viewIngredients)(recipe);
        console.log("servings: " + recipe.servings);
        (0, utilities_1.line)();
        console.log("instructions: \n");
        console.log(recipe.instructions + "\n");
    }
}
/**
 * search for a recipe
 * @param {CookbookKeys} keys the name and id for all recipes in cookbook
 * @param {Cookbook} cookbook the cookbook hashtable
 * @returns {Recipe | boolean} the recipes found or false if no recipe found
 */
function searchRecipe(keys, cookbook) {
    var userSearch = (0, utilities_1.validAnswer)("Search >", "", []).toLowerCase();
    var searchResult = [];
    keys.forEach(function (element) {
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
    for (var i = 0; i < keys.length; i++) { //titta på deet här
        console.log(keys, chosenRecipeName);
        if ((0, list_1.head)(keys[i]) === chosenRecipeName) { //
            var recipeSearch = (0, hashtables_1.ph_lookup)(cookbook, (0, list_1.tail)(keys[i]));
            recipeSearch === undefined ? userChoice = false : userChoice = recipeSearch;
        }
    }
    return userChoice;
}
