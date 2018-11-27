export enum InputRequestType {
    AnyKey,
    EnterKey,
    Int,
    Str,
}

export class InputRequest {
    type: InputRequestType;
    expire: number | null;
    data: number | null;
}

export type InputResponse = undefined | null | number | string;

export enum ConsoleLineAlignment {
    Left,
    Center,
    Right,
}

export interface EraConsole {

    fontFamily: string;
    fontSize: string;
    fontBold: boolean;
    fontItalic: boolean;

    setColor(color: string);
    getColor(): string;
    setBgColor(color: string);
    getBgColor(): string;
    setHlColor(color: string);
    getHlColor(): string;

    setLineAlignment(alignment: ConsoleLineAlignment);
    getLineAlignment(): ConsoleLineAlignment;

    print(text: string);
    printLine(text: string);
    newLine();

    drawLine();

    printBtn(text: string, res: InputResponse);

    wait(req: InputRequest): Promise<InputResponse>;
}
