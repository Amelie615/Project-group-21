"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitstring = exports.units = void 0;
exports.questionnaire = questionnaire;
exports.IDGenerator = IDGenerator;
exports.round = round;
exports.changeUnits = changeUnits;
exports.validAnswer = validAnswer;
exports.line = line;
exports.stringToUnit = stringToUnit;
var PromptSync = require("prompt-sync");
var convert_1 = require("convert");
var list_1 = require("../lib/list");
var prompt = PromptSync({ sigint: true });
exports.units = ["ml", "mL", "L", "l", "g", "dl", "kg", "US fluid ounce", "cups",
    "pounds", "pound", "lb", "ounces", "ounce", "cup", "qt",
    "pt", "liters", "deciliters", "deciliter", "milliliters",
    "milliliter", "gram", "kilogram", "liter", "gal", "gallons"];
exports.unitstring = ["ml", "mL", "L", "l", "g", "dl", "kg", "US fluid ounce", "cups",
    "pounds", "pound", "lb", "ounces", "ounce", "cup", "qt",
    "pt", "liters", "deciliters", "deciliter", "milliliters",
    "milliliter", "gram", "kilogram", "liter", "gal", "gallons"];
/**
 * creates a list of options to choose from
 * @example questionnaire(["kanelbullar", "chokladbollar"])
 * will print out
 * 1 kanelbullar
 * 2 chokladbollar
 * and then return the user input as a number
 * @param {Array<string>} options the options to be printed
 * @returns {number} the number for a specific option
 */
function questionnaire(options) {
    line();
    for (var i = 0; i < options.length; i++) {
        console.log(i + 1 + " " + options[i]);
    }
    line();
    var chosenOp = validAnswer(">  ", "num", []);
    console.log(" ");
    return (Number(chosenOp));
}
/**
 * creates a random number between a chosen min and max value
 * @example IDGenerator(1000, 9999, ["kanelbulle", 5566])
 * returns a random number between 1000 and 9999 that doesn't equal 5566
 * @param {number} min the minimun value for the number
 * @param {number} max the maximum value for the number
 * @param {CookbookKeys} keys the keys and names for the recipes in the cookbook
 * @returns {number} a random number
 */
function IDGenerator(min, max, keys) {
    var id = Math.floor(Math.random() * (max - min)
        + min);
    for (var i = 0; i < keys.length; i++) {
        if ((0, list_1.tail)(keys[i]) === id) {
            id = IDGenerator(min, max, keys);
        }
    }
    return id;
}
/**
 * Rounds the value number with a specific amount of decimals
 * @example round(2.53223, 1)
 * returns 2.5
 * @param {number} value the value to be rounded
 * @param {number} precision the amount of decimals
 * @returns {number} a rounded number with precision amount of decimals
 */
function round(value, precision) {
    var multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
}
/**
 * changes units of ingredients
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 * @param {string} flag a flag that indicates how the units should be handled (either "" or "switchUnit")
 */
function changeUnits(recipe, cookbook, flag) {
    var currentUnit = ["metric",
        "imperial"];
    var indexunit = recipe.unit === "metric"
        ? 0
        : 1;
    if (flag === "switchUnit") {
        indexunit = indexunit === 1
            ? 0
            : 1;
    }
    for (var i = 0; i < recipe.measurements.length; i++) {
        if (exports.unitstring.indexOf((0, list_1.tail)(recipe.measurements[i])) !== -1) {
            var stringIndex = exports.unitstring
                .indexOf((0, list_1.tail)(recipe.measurements[i]));
            var newUnit = exports.units[stringIndex];
            var conversion = (0, convert_1.convert)((0, list_1.head)(recipe.measurements[i]), newUnit).to("best", currentUnit[indexunit]);
            recipe.measurements[i] = (0, list_1.pair)(parseFloat(conversion
                .quantity
                .toFixed(1)), conversion.unit);
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
            removeWhiteSpace = removeLetandSpace === null
                ? ""
                : removeLetandSpace[1];
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
        if (removeWhiteSpace === "") {
            console.log("Invalid input.");
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
 * converts string to Unit type if possible
 * @example stringToUnit("dl")
 * returns "dl" (type Unit)
 * @example stringToUnit("st")
 * returns "st" (type string)
 * @param {string} unit the string to convert
 * @returns {Unit | string} the corresponding unit to given string, or the string if no equivalent unit exists
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
