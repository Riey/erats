import {EraConsole} from "./eraConsole";

export interface EraContext<V = any> {
    console: EraConsole;
    varData: V;
}