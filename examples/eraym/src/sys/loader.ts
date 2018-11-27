import {GameBase} from "./gameBase";
import {VariableData, YmContext} from "./base";
import {EraWebConsole} from "../../../../src/web/eraWebConsole";
import {EraContext} from "../../../../src/eraContext";
import "babel-polyfill";

export function loadContext(gameBase: GameBase): YmContext {
    const inputBtn = document.getElementById("era-input-btn");

    const console = new EraWebConsole(
        document.getElementById("era-console"),
        document.getElementById("era-input") as HTMLInputElement,
        c => {
            inputBtn.style.color = c;
        },
        c => {
            document.documentElement.style.backgroundColor = c;
        });

    return new EraContext<VariableData>(console, {
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