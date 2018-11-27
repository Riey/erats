"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function leftPad(str, len, ch = '.') {
    len = len - str.length + 1;
    return len > 0 ?
        new Array(len).join(ch) + str : str;
}
exports.leftPad = leftPad;
//# sourceMappingURL=stringFormat.js.map