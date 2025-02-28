"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.units = void 0;
exports.questioneer = questioneer;
exports.getRandomArbitrary = getRandomArbitrary;
var PromptSync = require("prompt-sync");
var prompt = PromptSync({ sigint: true });
exports.units = ["ml", "l", "g", "dl"]; // FIXA SYSTEM
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
