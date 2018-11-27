"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eraWebConsole_1 = require("../../../../src/web/eraWebConsole");
const eraContext_1 = require("../../../../src/eraContext");
require("babel-polyfill");
function loadContext(gameBase) {
    const inputBtn = document.getElementById("era-input-btn");
    const console = new eraWebConsole_1.EraWebConsole(document.getElementById("era-console"), document.getElementById("era-input"), c => {
        inputBtn.style.color = c;
    }, c => {
        document.documentElement.style.backgroundColor = c;
    });
    return new eraContext_1.EraContext(console, {
        gameBase: gameBase,
        characters: [],
        day: {
            current: 0,
            end: 120,
        },
        money: {
            current: 1000,
            goal: 1000000,
        },
        date: new Date(Date.UTC(1, 1))
    });
}
exports.loadContext = loadContext;
//# sourceMappingURL=loader.js.map