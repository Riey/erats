import {loadContext} from "./src/sys/loader";
import {systemTitle} from "./src/system/title";

window.addEventListener("load", async () => {

    const ctx = loadContext({
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

    await systemTitle(ctx);
});
