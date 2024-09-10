function toString(value) {
    if (isNaN(value.layer) || isNaN(value.sign) || isNaN(value.mag)) {
        return "NaN";
    }
    if (value.mag === Number.POSITIVE_INFINITY || value.layer === Number.POSITIVE_INFINITY) {
        return value.sign === 1 ? "Infinity" : "-Infinity";
    }
    if (value.layer === 0) {
        if (value.mag < 1e8 && value.mag > 1e-5 || value.mag === 0) {
            return (value.sign * value.mag).toFixed(2);
        }
        return value.m.toFixed(2) + "e" + value.e;
    } else if (value.layer === 1) {
        if (value.mag < 1e8 && value.mag > 1e-5 || value.mag === 0) {
            return value.m.toFixed(2) + "e" + value.e;
        }
        return "e" + toString(value.log10());
    } else {
        //layer 2+
        if (value.layer <= 5) {
            return (value.sign === -1 ? "-" : "") + "e" + toString(value.log10());
        } else {
            return (value.sign === -1 ? "-" : "") + value.mag.toFixed(2) + "F" + value.layer;
        }
    }
}

function delete0(num) {
    return toString(num).replace(/((?<=\.[0-9]*)|\.)(0+)(?=e|$)/, "")
}

function display(num) {
    return delete0(num).replace(/((?<!.*\..*)|(?<=.*(e|F).*))(\d)(?=(\d\d\d)+(?!\d))/g, "$3,")
}

function choosesDisplay() {
    return `
<button class="choose" id="0" onmousedown="choose = 0"><img src="自动化.png" alt="自动化"></button>` +
        (upgrades[3] ? `
<button class="choose" id="2" onmousedown="choose = 2"><img src="试卷.png" alt="试卷"></button>` : "") +
        (EU[4] ? `
<button class="choose" id="3" onmousedown="choose = 3"><img src="睡眠.png" alt="睡眠"></button>` : "") +
        (SM[3] ? `
<button class="choose" id="4" onmousedown="choose = 4"><img src="游戏.png" alt="游戏"></button>` : "") +
        `
<button class="choose" id="1" onmousedown="choose = 1"><img src="更新日志.png" alt="更新日志"></button>`
}

function homeworks() {
    return `
<img src="作业.png" alt="作业">
<div class="H">你最高写了
${display(maxHomework)}
本作业</div>
<div class="H">
${display(teachers)}
位老师给你布置了
${display(assignedHomeworks())}
本作业</div>
<div class="H">你已经写了
${display(finishHomeworks)}
本作业，提升自动作业机速度×
${display(speedup())}
</div>`
}

function homeworkMachines() {
    return `
<div class="A">你有
${display(machines)}
个自动作业机，每秒可以写
${display(speed())}
本作业</div>
<button class="A" onmousedown="buyMachine()">购买1个<br>需要
${display(price())}
本写好的作业</button>
${buyMaxButton()}
${buyMaxAuto()}
<br>
${upgradesDisplay()}`
}

function buyMaxButton() {
    return upgrades[2] ? `
<button class="A" onmousedown="buyMax()">购买最大</button>` : ""
}

function buyMaxAuto() {
    return EU[1] ? `
<button class="A" onmousedown="auto = !auto">自动：
${auto ? "是" : "否"}
</button>` : ""
}

function upgradesDisplay() {
    return `
${upgrade0()}${upgrade1()}${upgrade2()}${upgrade3()}`
}

function upgrade0() {
    return upgrades[0] ? `
<button class="U" style="background: #c06000">
升级0：<br>将作业机效率×4<br>花费： 10 本写好的作业
</button>` : maxHomework.gte(4) ? `
<button class="U" onmousedown="buyUpgrade(0)">
升级0：<br>将作业机效率×4<br>花费： 10 本写好的作业
</button>` : `<div class="A">到达 4 本作业解锁升级</div>`
}

function upgrade1() {
    return upgrades[1] ? `
<button class="U" style="background: #c06000">
升级1：<br>已写完的作业提升作业机效率<br>花费： 250 本写好的作业
</button>` : upgrades[0] ? `
<button class="U" onmousedown="buyUpgrade(1)">
升级1：<br>已写完的作业提升作业机效率<br>花费： 250 本写好的作业
</button>` : ""
}

function upgrade2() {
    return upgrades[2] ? `
<button class="U" style="background: #c06000">
升级2：<br>解锁购买最大作业机<br>花费： 9,000 本写好的作业
</button>` : upgrades[1] ? `
<button class="U" onmousedown="buyUpgrade(2)">
升级2：<br>解锁购买最大作业机<br>花费： 9,000 本写好的作业
</button>` : ""
}

function upgrade3() {
    return upgrades[3] ? `
<button class="U" style="background: #c06000">
升级3：<br>解锁试卷<br>花费： 180,000 本写好的作业
</button>` : upgrades[2] ? `
<button class="U" onmousedown="buyUpgrade(3)">
升级3：<br>解锁试卷<br>花费： 180,000 本写好的作业
</button>` : ""
}

function examination() {
    return `
<div class="E">你已经写了
${display(examinationPapers)}
张试卷，提升自动作业机速度×
${display(examinationSpeedup())}
</div>
<button class="E" onmousedown="examinationReset()">写
${display((examinationGain().gte(0) ? examinationGain() : new D(0))
    )}
张试卷<br>但是重置前面的所有内容<br>要求： 1,048,576 本写好的作业</button>
${ERAuto()}
<br>
${EUDisplay()}
<br>
${finalExamination()}
<br>
${ECDisplay()}`
}

function ERAuto() {
    return SM[1] ? `
<button class="E" onmousedown="ERauto = !ERauto">自动：
${ERauto ? "是" : "否"}
</button>
<span class="E" style="background: #c0c000">
达到总量×睡眠点效果^${display(ERexponential)}时触发</span>
<button class="E" onmousedown="changeERauto()">调整数值</button>` : ""
}

function EUDisplay() {
    return `
${EU0()}${EU1()}${EU2()}${EU3()}${EU4()}`
}

function EU0() {
    return EU[0] ? `
<button class="EU" style="background: #c0c000">
试卷升级0：<br>重置时保留升级<br>花费： 20 张写好的试卷
</button>` : maxHomework.gte(33554432) ? `
<button class="EU" onmousedown="buyEU(0)">
试卷升级0：<br>重置时保留升级<br>花费： 20 张写好的试卷
</button>` : `<div class="E">到达 33,554,432 本作业解锁升级</div>`
}

function EU1() {
    return EU[1] ? `
<button class="EU" style="background: #c0c000">
试卷升级1：<br>解锁自动购买最大<br>花费： 40 张写好的试卷
</button>` : EU[0] ? `
<button class="EU" onmousedown="buyEU(1)">
试卷升级1：<br>解锁自动购买最大<br>花费： 40 张写好的试卷
</button>` : ""
}

function EU2() {
    return EU[2] ? `
<button class="EU" style="background: #c0c000">
试卷升级2：<br>解锁期末考试<br>花费： 1,600 张写好的试卷
</button>` : EU[1] ? `
<button class="EU" onmousedown="buyEU(2)">
试卷升级2：<br>解锁期末考试<br>花费： 1,600 张写好的试卷
</button>` : ""
}

function EU3() {
    return EU[3] ? `
<button class="EU" style="background: #c0c000">
试卷升级3：<br>解锁试卷挑战<br>花费： 8e9 张写好的试卷
</button>` : EU[2] ? `
<button class="EU" onmousedown="buyEU(3)">
试卷升级3：<br>解锁试卷挑战<br>花费： 8e9 张写好的试卷
</button>` : ""
}

function EU4() {
    return EU[4] ? `
<button class="EU" style="background: #c0c000">
试卷升级4：<br>解锁睡眠<br>花费： 1e50 张写好的试卷
</button>` : EC[3] ? `
<button class="EU" onmousedown="buyEU(4)">
试卷升级4：<br>解锁睡眠<br>花费： 1e50 张写好的试卷
</button>` : ""
}

function finalExamination() {
    return EU[2] ? `
<div class="E">你已经进行了
${display(finalExaminations)}
次期末考试，每秒可以增加
${display(knowledgeSpeed())}
知识</div><div class="E">你有
${display(knowledge)}
知识，提升自动作业机速度×
${display(knowledgeSpeedup())}
</div><button class="F" onmousedown="HaveFinalExam()">进行一次期末考试<br>花费：
${display(fPrice())}
张写好的试卷</button>
${MaxFEButton()}
${FEAuto()}` : ""
}

function MaxFEButton() {
    return EC[0] ? `
<button class="F" onmousedown="MaxFE()">最大期末考试</button>` : ""
}

function FEAuto() {
    return SM[1] ? `
<button class="E" onmousedown="FEauto = !FEauto">自动：
${FEauto ? "是" : "否"}
</button>` : ""
}

function ECDisplay() {
    return (EU[3] ? 
`<div class="E">你现在${currentChallenge == -1 ? "不" : ""}在挑战${currentChallenge == -1 ? "里" : currentChallenge}
</div>` : "") + `
${EC0()}${EC1()}${EC2()}${EC3()}`
}

function EC0() {
    return EC[0] ? `
<button class="EC" style="background: #c0c000" onmousedown="clickEC(0)">
试卷挑战0：<br>你只有一个自动作业机<br>
挑战目标： 1e77 本写好的作业<br>已完成<br>奖励：解锁最大期末考试
</button>` : EU[3] ? `
<button class="EC" onmousedown="clickEC(0)">
试卷挑战0：<br>你只有一个自动作业机<br>
挑战目标： 1e77 本写好的作业<br>点击这个按钮
${currentChallenge == 0 ? (finishHomeworks.gte(5e76) ? "完成挑战" : "退出挑战") : "进入挑战"}
<br>奖励：解锁最大期末考试
</button>` : ""
}

function EC1() {
    return EC[1] ? `
<button class="EC" style="background: #c0c000" onmousedown="clickEC(1)">
试卷挑战1：<br>试卷不会提升你的作业机速度<br>
挑战目标： 4e62 本写好的作业<br>已完成<br>奖励：期末考试不减少你的试卷
</button>` : EC[0] ? `
<button class="EC" onmousedown="clickEC(1)">
试卷挑战1：<br>试卷不会提升你的作业机速度<br>
挑战目标： 4e62 本写好的作业<br>点击这个按钮
${currentChallenge == 1 ? (finishHomeworks.gte(4e62) ? "完成挑战" : "退出挑战") : "进入挑战"}
<br>奖励：期末考试不减少你的试卷
</button>` : ""
}

function EC2() {
    return EC[2] ? `
<button class="EC" style="background: #c0c000" onmousedown="clickEC(2)">
试卷挑战2：<br>作业机效果^0.8，试卷效果^0.6，知识效果^0.5，升级1效果^0.4<br>
挑战目标： 1e125 本写好的作业<br>已完成<br>奖励：作业机速度*写完的作业^(完成的挑战数/240)
</button>` : EC[1] ? `
<button class="EC" onmousedown="clickEC(2)">
试卷挑战2：<br>作业机效果^0.8，试卷效果^0.6，知识效果^0.5，升级1效果^0.4<br>
挑战目标： 1e125 本写好的作业<br>点击这个按钮
${currentChallenge == 2 ? (finishHomeworks.gte(1e125) ? "完成挑战" : "退出挑战") : "进入挑战"}
<br>奖励：作业机速度*写完的作业^(完成的挑战数/240)
</button>` : ""
}

function EC3() {
    return EC[3] ? `
<button class="EC" style="background: #c0c000" onmousedown="clickEC(3)">
试卷挑战3：<br>前三个挑战同时进行<br>
挑战目标： 3e52 本写好的作业<br>已完成<br>奖励：试卷获取量*8
</button>` : EC[2] ? `
<button class="EC" onmousedown="clickEC(3)">
试卷挑战3：<br>前三个挑战同时进行<br>
挑战目标： 3e52 本写好的作业<br>点击这个按钮
${currentChallenge == 3 ? (finishHomeworks.gte(3e52) ? "完成挑战" : "退出挑战") : "进入挑战"}
<br>奖励：试卷获取量*8
</button>` : ""
}

function sleepDisplay() {
    return `
<div class="S">你有
${display(sleepPoint)}
个睡眠点，提升自动作业机速度×
${display(sleepSpeedup())}
，提升写试卷量×
${display(sleepGainup())}
</div><button class="S" onmousedown="sleepReset()">睡觉获得
${display((sleepGain().gte(0) ? sleepGain() : new D(0))
    )}
睡眠点<br>但是重置前面的所有内容<br>要求： 4.97e86 张写好的试卷</button>
${SRAutoDisplay()}
<br>
${SMDisplay()}
${SUDisplay()}
<br>
${dreamDisplay()}`
}

function SRAutoDisplay() {
    return SM[2] ? `
<button class="S" onmousedown="SRauto = !SRauto">自动：
${SRauto ? "是" : "否"}
</button>
<span class="S" style="background: #60c000">
达到总量×${display(SRmultiplyer)}时触发</span>
<button class="S" onmousedown="changeSRauto()">调整数值</button>` : ""
}

function SMDisplay() {
    return `
${SM0()}${SM1()}${SM2()}${SM3()}`
}

function SM0() {
    return SM[0] ? `
<div class="SM" style="background: #60c000">
睡眠里程碑0： 3 个睡眠点
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：重置时保留试卷升级和挑战
</div>` : sleepPoint.gte(1) || SM[3] ? `
<div class="SM">
睡眠里程碑0： 3 个睡眠点
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：重置时保留试卷升级和挑战
</div>` : `<div class="SM">睡觉 1 次解锁睡眠里程碑</div>`
}

function SM1() {
    return SM[1] ? `
<div class="SM" style="background: #60c000">
睡眠里程碑1： 8 个睡眠点
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁更强的自动化
</div>` : SM[0] ? `
<div class="SM">
睡眠里程碑1： 8 个睡眠点
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁更强的自动化
</div>` : ""
}

function SM2() {
    return SM[2] ? `
<div class="SM" style="background: #60c000">
睡眠里程碑2： 7,500 个睡眠点
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁梦境和睡眠升级
</div>` : SM[1] ? `
<div class="SM">
睡眠里程碑2： 7,500 个睡眠点
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁梦境和睡眠升级
</div>` : ""
}

function SM3() {
    return SM[3] ? `
<div class="SM" style="background: #60c000">
睡眠里程碑3： 5.19e33 个睡眠点
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁游戏
</div>` : SM[2] ? `
<div class="SM">
睡眠里程碑3： 5.19e33 个睡眠点
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁游戏
</div>` : ""
}

function SUDisplay() {
    return `
${SU0()}${SU1()}`
}

function SU0() {
    return SU[0] ? `
<button class="SU" style="background: #60c000">
睡眠升级0：<br>购买梦境不花费睡眠点<br>花费： 2.81e16 睡眠点
</button>` : SM[2] ? `
<button class="SU" onmousedown="buySU(0)">
睡眠升级0：<br>购买梦境不花费睡眠点<br>花费： 2.81e16 睡眠点
</button>` : ""
}

function SU1() {
    return SU[1] ? `
<button class="SU" style="background: #60c000">
睡眠升级1：<br>梦境花费/100<br>花费： 4.72e23 睡眠点
</button>` : SU[0] ? `
<button class="SU" onmousedown="buySU(1)">
睡眠升级1：<br>梦境花费/100<br>花费： 4.72e23 睡眠点
</button>` : ""
}

function dreamDisplay() {
    return SM[2] ? `
<div class="D0">
你有
${display(dreams[0])}
梦境能量，提升睡眠点效果^
${display(DSpeedup())}</div><div class="D1">你有
${display(dreamLevels[0])} + ${display(dreams[1])} = ${display(dreamLevels[0].add(dreams[1]))}
梦境，每秒生产
${display(dreamLevels[0].add(dreams[1]))} * ${display((new D(2)).pow(dreamLevels[0]).
    mul(gamesUptodream()))} =
${display(DSpeed(1))}
梦境能量<button class="D1" onmousedown="buyDream(1)">
购买 1 个，需要花费${display(DPrice(1))}睡眠点</button>${buyMaxDream(1)}${DreamAuto(1)}</div><div class="D2">你有
${display(dreamLevels[1])} + ${display(dreams[2])} = ${display(dreamLevels[1].add(dreams[2]))}
二阶梦境，每秒生产
${display(dreamLevels[1].add(dreams[2]))} * ${display((new D(2)).pow(dreamLevels[1]).
    mul(gamesUptodream()))} =
${display(DSpeed(2))}
梦境<button class="D2" onmousedown="buyDream(2)">
购买 1 个，需要花费${display(DPrice(2))}睡眠点</button>${buyMaxDream(2)}${DreamAuto(2)}</div><div class="D3">你有
${display(dreamLevels[2])} + ${display(dreams[3])} = ${display(dreamLevels[2].add(dreams[3]))}
三阶梦境，每秒生产
${display(dreamLevels[2].add(dreams[3]))} * ${display((new D(2)).pow(dreamLevels[2]).
    mul(gamesUptodream()))} =
${display(DSpeed(3))}
二阶梦境<button class="D3" onmousedown="buyDream(3)">
购买 1 个，需要花费${display(DPrice(3))}睡眠点</button>${buyMaxDream(3)}${DreamAuto(3)}</div>` : ""
}

function buyMaxDream(n) {
    return GM[1] ? `
<button class="D${n}" onmousedown="MaxDream(${n})">购买最大</button>` : ""
}

function DreamAuto(n) {
    return GM[2] ? `
<button class="D${n}" onmousedown="dreamAuto[${n - 1}] = !dreamAuto[${n - 1}]">自动：
${dreamAuto[n - 1] ? "是" : "否"}</button>` : ""
}

function gameDisplay() {
    return `
<div class="G">你有
${display(games)}
个游戏，提升睡眠层级效果^
${display(gamesUptosleep())}
，提升梦境生产速度*
${display(gamesUptodream())}
</div><button class="G" onmousedown="gameReset()">安装
${display((gameGain().gte(0) ? gameGain() : new D(0)))}
个游戏<br>但是重置前面的所有内容（保留1个睡眠点）<br>要求： 3.4e38 个睡眠点</button>
${GMDisplay()}
${gameEngine()}`
}

function GMDisplay() {
    return `
${GM0()}${GM1()}${GM2()}${GM3()}`
}

function GM0() {
    return GM[0] ? `
<div class="GM" style="background: #00c000">
游戏里程碑0： 3 个游戏
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：重置时保留睡眠里程碑和升级
</div>` : games.gte(1) || GM[3] ? `
<div class="GM">
游戏里程碑0： 3 个游戏
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：重置时保留睡眠里程碑和升级
</div>` : `<div class="GM">安装 1 次游戏解锁游戏里程碑</div>`
}

function GM1() {
    return GM[1] ? `
<div class="GM" style="background: #00c000">
游戏里程碑1： 8 个游戏
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁购买最大梦境
</div>` : GM[0] ? `
<div class="GM">
游戏里程碑1： 8 个游戏
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁购买最大梦境
</div>` : ""
}

function GM2() {
    return GM[2] ? `
<div class="GM" style="background: #00c000">
游戏里程碑2： 12 个游戏
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁更强的自动化
</div>` : GM[1] ? `
<div class="GM">
游戏里程碑2： 12 个游戏
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁更强的自动化
</div>` : ""
}

function GM3() {
    return GM[3] ? `
<div class="GM" style="background: #00c000">
游戏里程碑3： 80 个游戏
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁游戏引擎和升级
</div>` : GM[2] ? `
<div class="GM">
游戏里程碑3： 80 个游戏
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
奖励：解锁游戏引擎和升级
</div>` : ""
}

function gameEngine() {
    return GM[3] ? `
<div class="G">
你有 ${display(GE)} 游戏引擎，提升睡眠点获取* ${display(GEGainup())}
</div>
<button class="G" onmousedown="BuyEngine()">
购买一个游戏引擎
<br>
需要 ${display(GEPrice())} 游戏
</button>` : ""
}

function changelog() {
    return `
<button class="settings" onmousedown="hardReset()">硬重置</button>
<br>
<button class="settings" onmousedown="ERconfirm = !ERconfirm">写试卷时确认：
${ERconfirm ? "是" : "否"}
</button><button class="settings" onmousedown="ECconfirm = !ECconfirm">进入、退出试卷挑战时确认：
${ECconfirm ? "是" : "否"}
</button><button class="settings" onmousedown="SRconfirm = !SRconfirm">睡觉时确认：
${SRconfirm ? "是" : "否"}
</button><button class="settings" onmousedown="GRconfirm = !GRconfirm">安装游戏时确认：
${GRconfirm ? "是" : "否"}
</button>
<br>
<div class="settings">说明：本游戏不需要软上限，也没有软上限</div>
<div class="changelog">更新日志：</div>
<div class="changelog">
版本v0.0.0：添加老师、作业、作业机、升级0~2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/11
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完4096本作业（3位老师）
</div>
<div class="changelog">
版本v0.0.1：修改了一些显示，增加了一些难度
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/11
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完1,000,000本作业（9位老师）
</div>
<div class="changelog">
版本v0.1.0：做出了重置层“试卷”，修改了一些显示
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/12
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完3.48e9本作业（可以写2张试卷）
</div>
<div class="changelog">
版本v0.1.1：添加2个试卷升级，修改了一些显示
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/15
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完1e20本作业（可以写9张试卷）
</div>
<div class="changelog">
版本v0.1.2：添加1个试卷升级和期末考试
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/15
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完1e100本作业（可以写99,999张试卷）
</div>
<div class="changelog">
版本v0.1.3：添加1个试卷升级和1个试卷挑战
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/16夜晚
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完1e200本作业（可以写1e10张试卷）
</div>
<div class="changelog">
版本v0.1.4：添加了一些设置功能
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/17
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完1e200本作业（可以写1e10张试卷）
</div>
<div class="changelog">
版本v0.1.5：添加了1个试卷挑战，修复了修复bug不成功的bug
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/18
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完1.79e308本作业（可以写2.59e15张试卷）
</div>
<div class="changelog">
版本v0.1.6：添加了1个试卷挑战，修复了一些bug
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/20
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完1e500本作业（可以写1e25张试卷）
</div>
<div class="changelog">
版本v0.1.7：添加了1个试卷升级和1个试卷挑战，修复了一些bug
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/21
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完1e1,200本作业（可以写2e60张试卷）
</div>
<div class="changelog">
版本v1.0.0：添加了重置层“睡眠”
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/22夜晚
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完1e2,000本作业
</div>
<div class="changelog">
版本v1.0.1：添加了1个睡眠里程碑
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/24
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完3.52e3,082本作业
</div>
<div class="changelog">
版本v1.0.2：添加了1个睡眠里程碑和更强的自动化，修改了一些显示
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/26
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完1e150,000本作业
</div>
<div class="changelog">
版本v1.0.3：添加了2个睡眠里程碑和梦境
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/27夜晚
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完e1e10本作业
</div>
<div class="changelog">
版本v1.0.4：添加了2个睡眠升级，修复了一些bug
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/28
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完e1e60本作业
</div>
<div class="changelog">
版本v1.0.5：什么也没更新
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/7/31
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完e3.49e76本作业
</div>
<div class="changelog">
版本v1.1.0：添加了重置层“游戏”
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/8/1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完e1.2e99本作业
</div>
<div class="changelog">
版本v1.1.1：添加了1个游戏里程碑，修改了一些显示，降低了一些难度
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/8/2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完e3.01e127本作业
</div>
<div class="changelog">
版本v1.1.2：添加了2个游戏里程碑和更强的自动化
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/8/3
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完e4.04e153本作业
</div>
<div class="changelog">
版本v1.1.3：削弱了一些时间墙
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/8/9
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完e4.04e153本作业
</div>
<div class="changelog">
版本v1.1.4：修改了存档格式，添加了游戏引擎
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/9/7
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完e4.67e230本作业
</div>
<div class="changelog">
版本v1.1.5：平衡试卷层级
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2024/9/10
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
EndGame：写完e4.67e230本作业
</div>`
}
