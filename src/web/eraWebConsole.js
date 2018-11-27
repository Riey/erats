"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const eraConsole_1 = require("../eraConsole");
const await_timeout_1 = require("await-timeout");
const INPUT_UPDATE_EVENT_NAME = "era-input-update";
const WAIT_INTERVAL = 50;
const inputUpdateEvent = new Event(INPUT_UPDATE_EVENT_NAME, {
    bubbles: false,
    cancelable: false
});
var InputRoute;
(function (InputRoute) {
    InputRoute[InputRoute["Normal"] = 0] = "Normal";
    InputRoute[InputRoute["EnterKey"] = 1] = "EnterKey";
})(InputRoute = exports.InputRoute || (exports.InputRoute = {}));
function consoleLineAlignmentToClassName(align) {
    switch (align) {
        case eraConsole_1.ConsoleLineAlignment.Left: return "era-line-left";
        case eraConsole_1.ConsoleLineAlignment.Center: return "era-line-center";
        case eraConsole_1.ConsoleLineAlignment.Right: return "era-line-right";
    }
}
class EraWebConsole {
    constructor(parent, inputElem, onSetColor, onSetBgColor, onSetHlColor) {
        this.alignment = eraConsole_1.ConsoleLineAlignment.Left;
        this.parent = parent;
        this._inputElem = inputElem;
        inputElem.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                this.sendInputByInputElem(InputRoute.EnterKey);
            }
            else if (this._inputElem.value.length === this._inputReq.data) {
                this.sendInputByInputElem(InputRoute.Normal);
            }
        });
        this.onSetColor = onSetColor ? onSetColor : () => { };
        this.onSetBgColor = onSetBgColor ? onSetBgColor : () => { };
        this.onSetHlColor = onSetHlColor ? onSetHlColor : () => { };
        this.newLine();
    }
    sendInputByInputElem(route) {
        if (this._inputReq === null) {
            return;
        }
        switch (this._inputReq.type) {
            case eraConsole_1.InputRequestType.AnyKey:
            case eraConsole_1.InputRequestType.EnterKey: {
                this.onEnterResponse(route, null);
                break;
            }
            case eraConsole_1.InputRequestType.Int: {
                this.onEnterResponse(route, this._inputElem.valueAsNumber);
                break;
            }
            case eraConsole_1.InputRequestType.Str: {
                this.onEnterResponse(route, this._inputElem.value);
                break;
            }
        }
        this._inputElem.value = "";
    }
    updateInputElem() {
        if (this._inputReq == null) {
            this._inputElem.disabled = true;
        }
        else {
            this._inputElem.disabled = false;
            switch (this._inputReq.type) {
                case eraConsole_1.InputRequestType.Int: {
                    this._inputElem.type = "number";
                    break;
                }
                default: {
                    this._inputElem.type = "text";
                    break;
                }
            }
        }
    }
    makePlainTextElem(text) {
        const ret = document.createElement("span");
        ret.style.color = this.color;
        ret.style.fontFamily = this.fontFamily;
        ret.style.fontSize = this.fontSize;
        ret.style.fontStyle = this.fontItalic ? "italic" : "normal";
        ret.style.fontWeight = this.fontBold ? "bold" : "normal";
        ret.innerText = text;
        return ret;
    }
    makeButtonTextElem(text, res) {
        const ret = this.makePlainTextElem(text);
        const color = this.color;
        const hlColor = this.hlColor;
        const click = () => {
            this.onEnterResponse(InputRoute.Normal, res);
        };
        ret.addEventListener("click", click);
        const mouseenter = () => {
            ret.style.color = hlColor;
        };
        const mouseleave = () => {
            ret.style.color = color;
        };
        ret.addEventListener("mouseenter", mouseenter);
        ret.addEventListener("touchstart", mouseenter);
        ret.addEventListener("mouseleave", mouseleave);
        ret.addEventListener("touchend", mouseleave);
        this.parent.addEventListener(INPUT_UPDATE_EVENT_NAME, function inputUpdate() {
            ret.style.color = color;
            ret.removeEventListener("mouseenter", mouseenter);
            ret.removeEventListener("touchstart", mouseenter);
            ret.removeEventListener("mouseleave", mouseleave);
            ret.removeEventListener("touchend", mouseleave);
            this.removeEventListener("click", click);
            this.removeEventListener(INPUT_UPDATE_EVENT_NAME, inputUpdate);
        });
        return ret;
    }
    onEnterResponse(route, res) {
        if (this._inputReq == null) {
            return;
        }
        switch (this._inputReq.type) {
            case eraConsole_1.InputRequestType.EnterKey: {
                if (route != InputRoute.EnterKey) {
                    return;
                }
                break;
            }
            default: {
                break;
            }
        }
        this._inputRes = res;
    }
    newLine() {
        this.lastLine = document.createElement("div");
        this.lastLine.className = consoleLineAlignmentToClassName(this.alignment);
        this.parent.appendChild(this.lastLine);
    }
    print(text) {
        const elem = this.makePlainTextElem(text);
        this.lastLine.appendChild(elem);
    }
    printBtn(text, res) {
        const elem = this.makeButtonTextElem(text, res);
        this.lastLine.appendChild(elem);
    }
    printLine(text) {
        this.print(text);
        this.newLine();
    }
    drawLine() {
        const line = document.createElement("hr");
        line.style.color = this.color;
        line.className = "era-drawline";
        this.lastLine.appendChild(line);
        this.newLine();
    }
    wait(req) {
        return __awaiter(this, void 0, void 0, function* () {
            while (this._inputReq != null) {
                yield await_timeout_1.default.set(WAIT_INTERVAL * 2);
            }
            this._inputReq = req;
            this.updateInputElem();
            while (this._inputRes == null) {
                if (req.expire != null && req.expire <= Date.now()) {
                    return undefined;
                }
                yield await_timeout_1.default.set(WAIT_INTERVAL);
            }
            this._inputReq = null;
            const res = this._inputRes;
            this._inputRes = null;
            this.parent.dispatchEvent(inputUpdateEvent);
            this.updateInputElem();
            return res;
        });
    }
    setLineAlignment(alignment) {
        this.lastLine.className = consoleLineAlignmentToClassName(alignment);
        this.alignment = alignment;
    }
    getLineAlignment() {
        return this.alignment;
    }
    setBgColor(color) {
        this.onSetBgColor(color);
        this.bgColor = color;
    }
    getBgColor() {
        return this.bgColor;
    }
    setColor(color) {
        this.onSetColor(color);
        this.color = color;
    }
    getColor() {
        return this.color;
    }
    setHlColor(color) {
        this.hlColor = color;
    }
    getHlColor() {
        return this.hlColor;
    }
}
exports.EraWebConsole = EraWebConsole;
//# sourceMappingURL=eraWebConsole.js.map