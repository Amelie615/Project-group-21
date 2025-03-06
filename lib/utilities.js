"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitstring = exports.units = void 0;
exports.questionnaire = questionnaire;
exports.getRandomArbitrary = getRandomArbitrary;
exports.changeUnits = changeUnits;
var PromptSync = require("prompt-sync");
var convert_1 = require("convert");
var list_1 = require("../lib/list");
var prompt = PromptSync({ sigint: true });
exports.units = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup", "tsp", "tbsp", "teaspoon", "tablespoon"]; // FIXA SYSTEM
exports.unitstring = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup", "tsp", "tbsp", "teaspoon", "tablespoon"]; // FIXA SYSTEM
function questionnaire(vallista) {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
    for (var i = 0; i < vallista.length; i++) {
        console.log(i + 1 + " " + vallista[i]);
    }
    console.log(" ");
    var q = prompt(">  ");
    console.log(" ");
    return (Number(q));
}
function getRandomArbitrary(min, max, keys) {
    var id = Math.floor(Math.random() * (max - min) + min);
    for (var i = 0; i < keys.length; i++) {
        if ((0, list_1.tail)(keys[i]) === id) {
            id = getRandomArbitrary(min, max, keys);
        }
    }
    return id;
}
function changeUnits(recipe, table, flag) {
    var currentUnit = ["metric", "imperial"];
    var indexunit = recipe.unit === "metric" ? 0 : 1;
    if (flag === "switchUnit") {
        // indexunit = (indexunit + 1) % 2
        indexunit = indexunit === 1 ? 0 : 1;
    }
    for (var i = 0; i < recipe.measurements.length; i++) { //För varje measurement
        if (exports.unitstring.indexOf((0, list_1.tail)(recipe.measurements[i])) !== -1) {
            var stringIndex = exports.unitstring.indexOf((0, list_1.tail)(recipe.measurements[i]));
            var newUnit = exports.units[stringIndex];
            var conversion = (0, convert_1.convert)((0, list_1.head)(recipe.measurements[i]), newUnit).to("best", currentUnit[indexunit]);
            recipe.measurements[i] = (0, list_1.pair)(parseFloat(conversion.quantity.toFixed(1)), conversion.unit);
        }
    }
    recipe.unit = currentUnit[indexunit];
}
