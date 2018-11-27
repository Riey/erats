import {YmContext} from "../sys/base";
import {ConsoleLineAlignment, InputRequestType} from "../../../../src/eraConsole";

export async function systemTitle(ctx: YmContext) {

    ctx.console.setLineAlignment(ConsoleLineAlignment.Center);
    ctx.console.printLine(`${ctx.varData.gameBase.title}`);
    ctx.console.printLine(`v${ctx.varData.gameBase.version / 1000}`);
    ctx.console.printLine(`통합자: ${ctx.varData.gameBase.author}`);
    ctx.console.printLine(`(${ctx.varData.gameBase.year})`);
    ctx.console.printLine(``);
    ctx.console.printLine(`${ctx.varData.gameBase.info}`);
    ctx.console.printLine('「노예를 괴롭혀주세요…… 노예를 아껴주세요」');

    ctx.console.setLineAlignment(ConsoleLineAlignment.Left);
    ctx.console.drawLine();

    ctx.console.printBtn("[0] 힘세고 강한 시작", 0);
    ctx.console.newLine();
    ctx.console.printBtn("[1] 불러오기", 1);
    ctx.console.newLine();

    const input = await ctx.console.wait({
        type: InputRequestType.Int,
        expire: null,
        data: null,
    }) as number;

    ctx.console.printLine(`Enter: ${input}`);
}
