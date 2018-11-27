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
const eraConsole_1 = require("../../../../src/eraConsole");
function systemTitle(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.console.setLineAlignment(eraConsole_1.ConsoleLineAlignment.Center);
        ctx.console.printLine(`${ctx.varData.gameBase.title}`);
        ctx.console.printLine(`v${ctx.varData.gameBase.version / 1000}`);
        ctx.console.printLine(`통합자: ${ctx.varData.gameBase.author}`);
        ctx.console.printLine(`(${ctx.varData.gameBase.year})`);
        ctx.console.printLine(``);
        ctx.console.printLine(`${ctx.varData.gameBase.info}`);
        ctx.console.printLine('「노예를 괴롭혀주세요…… 노예를 아껴주세요」');
        ctx.console.setLineAlignment(eraConsole_1.ConsoleLineAlignment.Left);
        ctx.console.drawLine();
        ctx.console.printBtn("[0] 힘세고 강한 시작", 0);
        ctx.console.newLine();
        ctx.console.printBtn("[1] 불러오기", 1);
        ctx.console.newLine();
        const input = yield ctx.console.wait({
            type: eraConsole_1.InputRequestType.Int,
            expire: null,
            data: null,
        });
        ctx.console.printLine(`Enter: ${input}`);
    });
}
exports.systemTitle = systemTitle;
//# sourceMappingURL=title.js.map