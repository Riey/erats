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
const loader_1 = require("./src/sys/loader");
const title_1 = require("./src/system/title");
window.addEventListener("load", () => __awaiter(this, void 0, void 0, function* () {
    const ctx = loader_1.loadContext({
        version: 3181,
        minimum_version: 2100,
        title: "eraTHYMKR 2018 국내 갱신판 · 181028",
        author: "ㅇㄹ",
        year: "2018년 10월 28일 최종갱신",
        info: "※본 게임은 조교 SLG 제작 툴 erakanon을 수정·재배포한 것입니다."
    });
    ctx.console.setColor("white");
    ctx.console.setBgColor("black");
    ctx.console.setHlColor("yellow");
    ctx.console.fontSize = "2rem";
    yield title_1.systemTitle(ctx);
}));
//# sourceMappingURL=index.js.map