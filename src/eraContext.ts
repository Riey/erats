import {EraConsole} from "./eraConsole";

export class EraContext<V = any> {
    console: EraConsole;
    varData: V;

    constructor(console: EraConsole, varData: V) {
        this.console = console;
        this.varData = varData;
    }
}