import {ConsoleLineAlignment, EraConsole, InputRequest, InputRequestType, InputResponse} from "../eraConsole";
import Timeout from "await-timeout";

const INPUT_UPDATE_EVENT_NAME = "era-input-update";
const WAIT_INTERVAL = 50;

const inputUpdateEvent = new Event(INPUT_UPDATE_EVENT_NAME, {
    bubbles: false,
    cancelable: false
});

export enum InputRoute {
    Normal,
    EnterKey,
}

export type OnColorChanged = (string) => void;

function consoleLineAlignmentToClassName (align: ConsoleLineAlignment) {
    switch (align) {
        case ConsoleLineAlignment.Left: return "era-line-left";
        case ConsoleLineAlignment.Center: return "era-line-center";
        case ConsoleLineAlignment.Right: return "era-line-right";
    }
}

export class EraWebConsole implements EraConsole {

    color: string;
    bgColor: string;
    hlColor: string;

    fontFamily: string;
    fontSize: string;
    fontBold: boolean;
    fontItalic: boolean;
    alignment: ConsoleLineAlignment;


    private readonly parent: HTMLElement;
    private lastLine: HTMLDivElement;

    private _inputReq: InputRequest | null;
    private _inputRes: InputResponse | null;
    private readonly _inputElem: HTMLInputElement;

    private readonly onSetHlColor: (string) => void;
    private readonly onSetColor: OnColorChanged;
    private readonly onSetBgColor: OnColorChanged;

    constructor(parent: HTMLElement, inputElem: HTMLInputElement, onSetColor?: OnColorChanged, onSetBgColor?: OnColorChanged, onSetHlColor?: OnColorChanged) {
        this.alignment = ConsoleLineAlignment.Left;
        this.parent = parent;
        this._inputElem = inputElem;

        inputElem.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                this.sendInputByInputElem(InputRoute.EnterKey);
            } else if (this._inputElem.value.length === this._inputReq.data) {
                this.sendInputByInputElem(InputRoute.Normal);
            }
        });

        this.onSetColor = onSetColor ? onSetColor : () => {};
        this.onSetBgColor = onSetBgColor ? onSetBgColor : () => {};
        this.onSetHlColor = onSetHlColor ? onSetHlColor : () => {};
        this.newLine();
    }

    sendInputByInputElem(route: InputRoute) {
        if (this._inputReq === null) {
            return;
        }

        switch (this._inputReq.type) {
            case InputRequestType.AnyKey:
            case InputRequestType.EnterKey: {
                this.onEnterResponse(route, null);
                break;
            }

            case InputRequestType.Int: {
                this.onEnterResponse(route, this._inputElem.valueAsNumber);
                break;
            }

            case InputRequestType.Str: {
                this.onEnterResponse(route, this._inputElem.value);
                break;
            }
        }

        this._inputElem.value = "";
    }

    private updateInputElem() {
        if (this._inputReq == null) {
            this._inputElem.disabled = true;
        } else {
            this._inputElem.disabled = false;
            switch (this._inputReq.type) {
                case InputRequestType.Int: {
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

    private makePlainTextElem(text: string): HTMLElement {
        const ret = document.createElement("span");
        ret.style.color = this.color;
        ret.style.fontFamily = this.fontFamily;
        ret.style.fontSize = this.fontSize;
        ret.style.fontStyle = this.fontItalic ? "italic" : "normal";
        ret.style.fontWeight = this.fontBold ? "bold" : "normal";

        ret.innerText = text;

        return ret;
    }

    private makeButtonTextElem(text: string, res: InputResponse): HTMLElement {

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

        this.parent.addEventListener(INPUT_UPDATE_EVENT_NAME, function inputUpdate () {
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

    onEnterResponse(route: InputRoute, res: InputResponse) {
        if (this._inputReq == null) {
            return;
        }

        switch (this._inputReq.type) {
            case InputRequestType.EnterKey: {
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

    print(text: string) {
        const elem = this.makePlainTextElem(text);
        this.lastLine.appendChild(elem);
    }

    printBtn(text: string, res: InputResponse) {
        const elem = this.makeButtonTextElem(text, res);
        this.lastLine.appendChild(elem);
    }

    printLine(text: string) {
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

    async wait(req: InputRequest): Promise<InputResponse> {

        while (this._inputReq != null) {
            await Timeout.set(WAIT_INTERVAL * 2);
        }

        this._inputReq = req;
        this.updateInputElem();

        while (this._inputRes == null) {
            if (req.expire != null && req.expire <= Date.now()) {
                return undefined;
            }

            await Timeout.set(WAIT_INTERVAL);
        }

        this._inputReq = null;

        const res = this._inputRes;
        this._inputRes = null;

        this.parent.dispatchEvent(inputUpdateEvent);
        this.updateInputElem();

        return res;
    }


    setLineAlignment(alignment: ConsoleLineAlignment) {
        this.lastLine.className = consoleLineAlignmentToClassName(alignment);
        this.alignment = alignment;
    }

    getLineAlignment(): ConsoleLineAlignment {
        return this.alignment;
    }

    setBgColor(color) {
        this.onSetBgColor(color);
        this.bgColor = color;
    }

    getBgColor() {
        return this.bgColor;
    }

    setColor(color: string) {
        this.onSetColor(color);
        this.color = color;
    }

    getColor(): string {
        return this.color;
    }

    setHlColor(color: string) {
        this.hlColor = color;
    }

    getHlColor(): string {
        return this.hlColor;
    }
}