"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitstring = exports.units = void 0;
exports.questionnaire = questionnaire;
exports.getRandomArbitrary = getRandomArbitrary;
exports.changeUnits = changeUnits;
exports.validAnswer = validAnswer;
exports.line = line;
exports.stringToUnit = stringToUnit;
var PromptSync = require("prompt-sync");
var convert_1 = require("convert");
var list_1 = require("../lib/list");
var prompt = PromptSync({ sigint: true });
exports.units = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup", "tsp", "tbsp", "teaspoon", "tablespoon"]; // FIXA SYSTEM
exports.unitstring = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup", "tsp", "tbsp", "teaspoon", "tablespoon"]; // FIXA SYSTEM
/**
 * creates a list of options to choose from
 * @param {Array<string>} options the options to be printed
 * @returns the number for a specific option
 */
function questionnaire(options) {
    line();
    for (var i = 0; i < options.length; i++) {
        console.log(i + 1 + " " + options[i]);
    }
    line();
    var chosenOp = prompt(">  ");
    console.log(" ");
    return (Number(chosenOp));
}
/**
 * creates a random number between a chosen min and max value
 * @param {number} min the minimun value for the number
 * @param {number} max the maximum value for the number
 * @param {CookbookKeys} keys the keys and names for the recipes in the cookbook
 * @returns a random number
 */
function getRandomArbitrary(min, max, keys) {
    var id = Math.floor(Math.random() * (max - min) + min);
    for (var i = 0; i < keys.length; i++) {
        if ((0, list_1.tail)(keys[i]) === id) {
            id = getRandomArbitrary(min, max, keys);
        }
    }
    return id;
}
/**
 * changes units on ingredients
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 * @param {string} flag a flag that indicates how the units should be handled
 */
function changeUnits(recipe, cookbook, flag) {
    var currentUnit = ["metric", "imperial"];
    var indexunit = recipe.unit === "metric" ? 0 : 1;
    if (flag === "switchUnit") {
        indexunit = indexunit === 1 ? 0 : 1;
    }
    for (var i = 0; i < recipe.measurements.length; i++) { //För varje measurements
        if (exports.unitstring.indexOf((0, list_1.tail)(recipe.measurements[i]).toLowerCase()) !== -1) {
            var stringIndex = exports.unitstring.indexOf((0, list_1.tail)(recipe.measurements[i]));
            var newUnit = exports.units[stringIndex];
            var conversion = (0, convert_1.convert)((0, list_1.head)(recipe.measurements[i]), newUnit).to("best", currentUnit[indexunit]);
            recipe.measurements[i] = (0, list_1.pair)(parseFloat(conversion.quantity.toFixed(1)), conversion.unit);
        }
    }
    recipe.unit = currentUnit[indexunit];
}
function validAnswer(usedPrompt, flag, opt) {
    var wronganswer = true;
    var answer = "";
    var _loop_1 = function () {
        answer = prompt(usedPrompt);
        var removeWhiteSpace = "";
        if (flag === "num") {
            var removeLetandSpace = answer.match(/(\d+)/);
            removeWhiteSpace = removeLetandSpace === null ? "" : removeLetandSpace[1];
        }
        else if (flag === "") {
            removeWhiteSpace = answer.replace(/\s/g, "");
        }
        else if (flag === "opt") {
            removeWhiteSpace = "";
            opt.forEach(function (element) {
                if (element === answer) {
                    removeWhiteSpace = answer.trimEnd();
                }
            });
        }
        console.log("answer:" + removeWhiteSpace);
        if (removeWhiteSpace === "") {
            console.log("invalid input.");
            return "continue";
        }
        else {
            wronganswer = false;
        }
    };
    while (wronganswer) {
        _loop_1();
    }
    return answer;
}
//Prints line for UI
function line() {
    console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
}
/**
 * converts string to Unit type
 * @param {string} unit the string to convert
 * @returns the corresponding unit to given string, or the string if no equivalent unit exists
 */
function stringToUnit(unit) {
    var newUnit = "ml";
    for (var i = 0; i < exports.unitstring.length; i++) {
        if (unit.toLowerCase() === exports.unitstring[i].toLowerCase()) {
            newUnit = exports.units[i];
            return newUnit;
        }
    }
    return unit;
}
