import {EraWebConsole} from "../src/web/eraWebConsole";
import {ConsoleLineAlignment} from "../src/eraConsole";

window.addEventListener("load", () => {
    const console = document.getElementById("era-console");

    const eraConsole = new EraWebConsole(console);

    eraConsole.setBgColor("black");
    eraConsole.setColor("white");
    eraConsole.setHlColor("yellow");

    eraConsole.fontSize = "32px";
    eraConsole.print("Hello, world!");
    eraConsole.setLineAlignment(ConsoleLineAlignment.Center);
    eraConsole.newLine();
});