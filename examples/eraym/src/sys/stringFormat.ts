export function leftPad(str: string, len: number, ch='.'): string {
    len = len - str.length + 1;
    return len > 0 ?
        new Array(len).join(ch) + str : str;
}