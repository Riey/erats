import {EraContext} from "../../../../src/eraContext";
import {GameBase} from "./gameBase";

export class Character {

}

export class Money {
    current: number;
    goal: number;
}

export class Day {
    current: number;
    end: number | null;
}

export class VariableData {
    characters: Array<Character>;
    day: Day;
    date: Date;
    money: Money;
    gameBase: GameBase;
}

export function saveSav(varData: VariableData): string {
    return JSON.stringify(varData);
}

export function loadSav(sav: string): VariableData {
    return JSON.parse(sav);
}

export type YmContext = EraContext<VariableData>;
