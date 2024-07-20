function toString(value) {
    if (isNaN(value.layer) || isNaN(value.sign) || isNaN(value.mag)) {
        return "NaN";
    }
    if (value.mag === Number.POSITIVE_INFINITY || value.layer === Number.POSITIVE_INFINITY) {
        return value.sign === 1 ? "Infinity" : "-Infinity";
    }
    if (value.layer === 0) {
        if (value.mag < 1e9 && value.mag > 1e-5 || value.mag === 0) {
            return (value.sign * value.mag).toFixed(2);
        }
        return value.m.toFixed(2) + "e" + value.e;
    } else if (value.layer === 1) {
        return value.m.toFixed(2) + "e" + value.e;
    } else {
      //layer 2+
        if (value.layer <= 5) {
            return (value.sign === -1 ? "-" : "") + "e".repeat(value.layer) + value.mag.toFixed(2);
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
        `
<button class="choose" id="1" onmousedown="choose = 1"><img src="更新日志.png" alt="更新日志"></button>`
}

function homeworks() {
    return `
<img src="作业.png" alt="作业">
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
    return `${upgrade0()}${upgrade1()}${upgrade2()}${upgrade3()}`
}

function upgrade0() {
    return upgrades[0] ? `
<button class="U" style="background: #c06000">
升级0：<br>将作业机效率×3<br>花费： 10 本写好的作业
</button>` : maxHomework.gte(4) ? `
<button class="U" onmousedown="buyUpgrade(0)">
升级0：<br>将作业机效率×3<br>花费： 10 本写好的作业
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
张试卷<br>但是重置前面的所有东西<br>要求： 1,048,576 本写好的作业</button><br>
${EUDisplay()}
<br>
${finalExamination()}
<br>
${ECDisplay()}`
}

function EUDisplay() {
    return `${EU0()}${EU1()}${EU2()}${EU3()}`
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
试卷升级2：<br>解锁期末考试<br>花费： 1600 张写好的试卷
</button>` : EU[1] ? `
<button class="EU" onmousedown="buyEU(2)">
试卷升级2：<br>解锁期末考试<br>花费： 1600 张写好的试卷
</button>` : ""
}

function EU3() {
    return EU[3] ? `
<button class="EU" style="background: #c0c000">
试卷升级3：<br>解锁试卷挑战<br>花费： 2e11 张写好的试卷
</button>` : EU[2] ? `
<button class="EU" onmousedown="buyEU(3)">
试卷升级3：<br>解锁试卷挑战<br>花费： 2e11 张写好的试卷
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
${MaxFEButton()}` : ""
}

function MaxFEButton() {
    return EC[0] ? `
<button class="F" onmousedown="MaxFE()">最大期末考试</button>` : ""
}

function ECDisplay() {
    return (EU[3] ? 
`<div class="E">你现在${currentChallenge == -1 ? "不" : ""}在挑战${currentChallenge == -1 ? "里" : currentChallenge}
</div>` : "") + `
${EC0()}${EC1()}${EC2()}`
}

function EC0() {
    return EC[0] ? `
<button class="EC" style="background: #c0c000" onmousedown="clickEC(0)">
试卷挑战0：<br>你只有一个自动作业机<br>
挑战目标： 2e95 本写好的作业<br>已完成<br>奖励：解锁最大期末考试
</button>` : EU[3] ? `<button class="EC" onmousedown="clickEC(0)">
试卷挑战0：<br>你只有一个自动作业机<br>
挑战目标： 2e95 本写好的作业<br>点击这个按钮
${currentChallenge == 0 ? (finishHomeworks.gte(2e95) ? "完成挑战" : "退出挑战") : "进入挑战"}
<br>奖励：解锁最大期末考试
</button>` : ""
}

function EC1() {
    return EC[1] ? `
<button class="EC" style="background: #c0c000" onmousedown="clickEC(1)">
试卷挑战1：<br>试卷不会提升你的作业机速度<br>
挑战目标： 9e78 本写好的作业<br>已完成<br>奖励：期末考试不重置你的试卷
</button>` : EC[0] ? `<button class="EC" onmousedown="clickEC(1)">
试卷挑战1：<br>试卷不会提升你的作业机速度<br>
挑战目标： 9e78 本写好的作业<br>点击这个按钮
${currentChallenge == 1 ? (finishHomeworks.gte(9e78) ? "完成挑战" : "退出挑战") : "进入挑战"}
<br>奖励：期末考试不重置你的试卷
</button>` : ""
}

function EC2() {
    return EC[2] ? `
<button class="EC" style="background: #c0c000" onmousedown="clickEC(2)">
试卷挑战2：<br>作业机效果^0.8，试卷效果^0.6，知识效果^0.5，升级1效果^0.4<br>
挑战目标： 1e154 本写好的作业<br>已完成<br>奖励：作业机速度*写完的作业^(完成的挑战数/240)
</button>` : EC[1] ? `<button class="EC" onmousedown="clickEC(2)">
试卷挑战2：<br>作业机效果^0.8，试卷效果^0.6，知识效果^0.5，升级1效果^0.4<br>
挑战目标： 1e154 本写好的作业<br>点击这个按钮
${currentChallenge == 2 ? (finishHomeworks.gte(1e154) ? "完成挑战" : "退出挑战") : "进入挑战"}
<br>奖励：作业机速度*写完的作业^(完成的挑战数/240)
</button>` : ""
}

function changelog() {
    return `
<button class="settings" onmousedown="fix()">修bug</button>
<button class="settings" onmousedown="hardReset()">硬重置</button>
<br>
<button class="settings" onmousedown="ERconfirm = !ERconfirm">写试卷时确认：
${ERconfirm ? "是" : "否"}
</button><button class="settings" onmousedown="ECconfirm = !ECconfirm">进入、退出试卷挑战时确认：
${ECconfirm ? "是" : "否"}
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
</div>`
}
