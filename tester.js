"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var list_1 = require("../Project-group-21/lib/list");
var hashtables_1 = require("./lib/hashtables");
var prompt = PromptSync({ sigint: true });
var units = ["ml", "l", "g", "dl"];
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function viewRecipe(id, hashedTable) {
    var recipe = (0, hashtables_1.ph_lookup)(hashedTable, id);
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
function createRecipe(hashedTable, keysToHashed) {
    var newRecipe = {
        name: prompt("name: > "),
        id: getRandomArbitrary(1000, 9999), //make sure its unique
        servings: prompt("Estimated servings: > "),
        tags: [],
        instructions: prompt("instructions: > "),
        ingredients: [],
        measurements: [],
    };
    var done = true;
    while (done === true) {
        var addedIngredient = prompt("Name a ingredient > ");
        newRecipe.ingredients.push(addedIngredient);
        var ourString = "Enter amount of ".concat(addedIngredient, "> ");
        var inputMeasurements = prompt(ourString);
        var integersFromMeasurements = inputMeasurements.match(/(\d+)/)[1]; //asså det här är ju bara inte rätt men inte fel, lös det
        var lettersFromMeasurements = "";
        for (var i = 0; i < units.length; i++) {
            if (inputMeasurements.search(units[i]) === -1) {
                continue;
            }
            else {
                lettersFromMeasurements = units[i];
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
function cookbook(tag, hashedTable, keysToHashed) {
    var _loop_1 = function () {
        var test = questioneer(["Create Recipe", "View Recipe", "Close cookbook"]);
        switch (test) {
            case (1):
                createRecipe(hashedTable, keysToHashed);
                break;
            case (2):
                var names_1 = [];
                keysToHashed.forEach(function (element) {
                    names_1.push((0, list_1.head)(element));
                });
                viewRecipe((0, list_1.tail)(keysToHashed[questioneer(names_1) - 1]), hashedTable);
                break;
            case (3): return { value: false };
            default:
                console.log("Invalid input");
        }
    };
    while (true) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
function questioneer(vallista) {
    for (var i = 0; i < vallista.length; i++) {
        console.log(i + 1 + " " + vallista[i]);
    }
    var q = prompt(">  ");
    3;
    3;
    3;
    3;
    3;
    3;
    return (Number(q));
}
function main() {
    var hashedTable = (0, hashtables_1.ph_empty)(13, hashtables_1.hash_id);
    var keysToHashed = []; //pair(name, id)
    while (true) {
        var test = questioneer(["Open", "Quit"]);
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
