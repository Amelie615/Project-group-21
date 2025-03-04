"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitstring = exports.units = void 0;
exports.questioneer = questioneer;
exports.getRandomArbitrary = getRandomArbitrary;
exports.changeUnits = changeUnits;
exports.homogenizeUnits = homogenizeUnits;
var PromptSync = require("prompt-sync");
var convert_1 = require("convert");
var list_1 = require("../lib/list");
var prompt = PromptSync({ sigint: true });
exports.units = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup"]; // FIXA SYSTEM
exports.unitstring = ["ml", "l", "g", "dl", "kg", "US fluid ounce", "cups", "pounds", "ounces", "cup"]; // FIXA SYSTEM
function questioneer(vallista) {
    for (var i = 0; i < vallista.length; i++) {
        console.log(i + 1 + " " + vallista[i]);
    }
    var q = prompt(">  ");
    return (Number(q));
}
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function changeUnits(recipe, table, flag) {
    var unituknow = ["metric", "imperial"];
    var indexunit = unituknow.indexOf(recipe.unit);
    if (flag === "switchUnit") {
        indexunit = (indexunit + 1) % 2;
    }
    for (var i = 0; i < recipe.measurements.length; i++) { //För varje measurement
        if (exports.unitstring.indexOf((0, list_1.tail)(recipe.measurements[i])) !== -1) {
            var theindex = exports.unitstring.indexOf((0, list_1.tail)(recipe.measurements[i]));
            var theunit = exports.units[theindex];
            var conversion = (0, convert_1.convert)((0, list_1.head)(recipe.measurements[i]), theunit).to("best", unituknow[indexunit]);
            recipe.measurements[i] = (0, list_1.pair)(Math.floor(conversion.quantity), conversion.unit);
        }
    }
    recipe.unit = unituknow[indexunit];
}
function homogenizeUnits(recipe) {
    for (var i = 0; i < recipe.measurements.length; i++) {
    }
}
