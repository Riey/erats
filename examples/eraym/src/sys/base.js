"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Character {
}
exports.Character = Character;
class Money {
}
exports.Money = Money;
class Day {
}
exports.Day = Day;
class VariableData {
}
exports.VariableData = VariableData;
function saveSav(varData) {
    return JSON.stringify(varData);
}
exports.saveSav = saveSav;
function loadSav(sav) {
    return JSON.parse(sav);
}
exports.loadSav = loadSav;
//# sourceMappingURL=base.js.map