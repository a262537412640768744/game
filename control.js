let select = name => document.querySelector(`.${name}`)
let display0 = select("D0")
let display1 = select("D1")
let chooses = select("chooses")

let assignedHomeworks = () => teachers.add(1).pow(6)
let auto = false
let currentChallenge = -1
let dreamAuto = [false, false, false]
let dreams = [new D(0), new D(0), new D(0), new D(0)]
let dreamLevels = [new D(0), new D(0), new D(0)]
let DPrice = (n) => (new D(2)).
    pow((new D(2)).pow(n - 1)).
    pow(dreamLevels[n - 1].add(1).mul(2).add(1)).
    mul(SU[1] ? 1 : 100)
let DSpeed = (n) => dreamLevels[n - 1].
    add(dreams[n]).
    mul((new D(2)).pow(dreamLevels[n - 1])).
    mul(gamesUptodream())
let DSpeedup = () => dreams[0].div(5000).add(1)
let examinationGain = () => finishHomeworks.root(20).sub(1).mul(EC[3] ? new D(2) : new D(1)).
    mul(sleepGainup()).
    floor()
let examinationPapers = new D(0)
let examinationSpeedup = () => [1, 3].includes(currentChallenge) ? 
    new D(1) : examinationPapers.div(10).add(1).pow(5).pow(currentChallenge == 2 ? 0.6 : 1)
let EC = [false, false, false, false]
let ECconfirm = true
let ERauto = false
let ERconfirm = true
let ERexponential = new D(0.5)
let EU = [false, false, false, false, false]
let finalExaminations = new D(0)
let finishHomeworks = new D(0)
let fPrice = () => finalExaminations.
    pow(2).
    add(finalExaminations).
    mul(3).
    add(1)
let FEauto = false
let games = new D(0)
let gamesUptosleep = () => games.mul(1.75).add(1)
let gamesUptodream = () => games.add(1).root(3).pow(2)
let gameGain = () => sleepPoint.root(64).div(2).sub(1).floor()
let GM = [false, false, false, false]
let GRconfirm = true
let knowledge = new D(0)
let knowledgeSpeed = () => finalExaminations.div(10)
let knowledgeSpeedup = () => knowledge.div(10).add(1).pow(6).pow([2, 3].includes(currentChallenge) ? 0.5 : 1)
let machines = new D(0)
let maxHomework = new D(0)
let price = () => machines
let SRAuto = false
let SRmultiplyer = new D(0.025)
let sleepGain = () => examinationPapers.add(1).log(4).sqrt().div(4).sub(2).floor()
let sleepPoint = new D(0)
let sleepSpeedup = () => (new D(2)).
    pow(sleepPoint.mul(4.5)).
    pow(DSpeedup()).
    pow(gamesUptosleep())
let sleepGainup = () => (new D(2)).
    pow(sleepPoint).
    pow(DSpeedup()).
    pow(gamesUptosleep())
let speedup = () => upgrades[1] ? teachers.sqrt().pow([2, 3].includes(currentChallenge) ? 0.4 : 1) : new D(1)
let speed = () => machines.pow([2, 3].includes(currentChallenge) ? 0.8 : 1).
    mul(speedup()).
    mul(examinationSpeedup()).
    mul(knowledgeSpeedup()).
    mul(sleepSpeedup()).
    mul(upgrades[0] ? 0.75 : 0.25).
    pow(1 + (EC[2] ? (+EC[0] + +EC[1] + +EC[2] + +EC[3]) / 240 : 0))
let SM = [false, false, false, false]
let SRconfirm = true
let SU = [false, false]
let teachers = new D(1)
let upgrades = [false, false, false, false]
load()
save()

let choose = 0

function fix() {
    if (finishHomeworks.lt(0)) {
        finishHomeworks = new D(0)
    }
    if (!EU[3] && currentChallenge != -1) {
        currentChallenge = -1
    }
}

function hardReset() {
    if (confirm("你确定要硬重置吗？") && 
    confirm("你确定要硬重置吗？") && 
    confirm("你确定要硬重置吗？") && 
    confirm("你确定要硬重置吗？") && 
    confirm("你确定要硬重置吗？")
    ) {
        reset()
    }
}

function buyMachine() {
    if (finishHomeworks.gte(price()) && !([0, 3].includes(currentChallenge))) {
        finishHomeworks = finishHomeworks.sub(price())
        machines = machines.add(1)
    }
}

function buyMax() {
    if ([0, 3].includes(currentChallenge)) return
    let totalHomeworks = machines.sub(1).mul(machines).div(2).add(finishHomeworks)
    let newAutomate = totalHomeworks.mul(8).add(1).sqrt().add(1).div(2).floor()
    let remainder = totalHomeworks.sub(newAutomate.sub(1).mul(newAutomate).div(2))
    finishHomeworks = remainder
    machines = newAutomate
}

function buyUpgrade(n) {
    let upgradePrice = [10, 250, 9000, 180000][n]
    if (finishHomeworks.gte(upgradePrice)) {
        finishHomeworks = finishHomeworks.sub(upgradePrice)
        upgrades[n] = true
    }
}

function examinationReset(a = true) {
    if (a && ERconfirm && !confirm("你确定要写试卷？这会重置你之前的进度！")) return
    if (finishHomeworks.gte(1048576)) {
        examinationPapers = examinationPapers.add(examinationGain())
        finishHomeworks = new D(0)
        teachers = new D(1)
        machines = new D(0)
        currentChallenge = -1
        if (EU[0]) {
            return
        }
        upgrades = [false, false, false, true]
    }
}

function buyEU(n) {
    let EUPrice = [20, 40, 1600, 2e11, 1e60][n]
    if (examinationPapers.gte(EUPrice)) {
        examinationPapers = examinationPapers.sub(EUPrice)
        EU[n] = true
    }
}

function HaveFinalExam() {
    if (examinationPapers.gte(fPrice())) {
        if (!EC[1]) {
            examinationPapers = examinationPapers.sub(fPrice())
        }
        finalExaminations = finalExaminations.add(1)
    }
}

function MaxFE() {
    if (examinationPapers.lt(fPrice())) return;
    let totalEP = EC[1] ? examinationPapers : finalExaminations.pow(3).add(examinationPapers)
    let newFE = EC[1] ? totalEP.mul(4).sub(1).div(12).sqrt().sub(0.5).floor() : totalEP.root(3).floor()
    let remainder = EC[1] ? examinationPapers : totalEP.sub(newFE.pow(3))
    examinationPapers = remainder
    finalExaminations = newFE
}

function clickEC(n) {
    let goal = [2e92, 9e78, 1e154, 3e64][n]
    if (currentChallenge == n) {
        if (finishHomeworks.gte(goal)) {
            EC[n] = true
            currentChallenge = -1
            return;
        }
        if (ECconfirm &&
            !confirm("你确定要退出挑战？你将不会得到任何奖励！")) return
        currentChallenge = -1
    } else if (currentChallenge == -1) {
        if (ECconfirm &&
            !confirm("你确定要进入挑战？请做好准备！")) return
        examinationReset(false)
        if ([0, 3].includes(n)) {
            machines = new D(1)
        }
        currentChallenge = n
    }
}

function sleepReset(a = true) {
    if (a && SRconfirm && !confirm("你确定要睡觉？这会重置你之前的进度！")) return
    if (examinationPapers.gte((new D(4)).pow(144))) {
        sleepPoint = sleepPoint.add(sleepGain())
        finishHomeworks = new D(0)
        teachers = new D(1)
        machines = new D(0)
        examinationPapers = new D(0)
        finalExaminations = new D(0)
        knowledge = new D(0)
        currentChallenge = -1
        if (SM[0] || sleepPoint.gte(3)) {
            return
        }
        upgrades = [false, false, false, true]
        EU = [false, false, false, false, true]
        EC = [false, false, false, false]
    }
}

function changeERauto() {
    ERexponential = new D(prompt("输入数值："))
}

function buyDream(n) {
    if (sleepPoint.gte(DPrice(n))) {
        if (!SU[0]) {
            sleepPoint = sleepPoint.sub(DPrice(n))
        }
        dreamLevels[n - 1] = dreamLevels[n - 1].add(1)
    }
}

function MaxDream(n) {
    if (sleepPoint.gte(DPrice(n))) {
        dreamLevels[n - 1] = sleepPoint.log2().div((new D(2)).pow(n - 1)).sub(1).div(2).floor()
    }
}

function buySU(n) {
    let SUPrice = [2 ** 48 * 100, 2 ** 72 * 100][n]
    if (sleepPoint.gte(SUPrice)) {
        sleepPoint = sleepPoint.sub(SUPrice)
        SU[n] = true
    }
}

function gameReset(a = true) {
    if (a && GRconfirm && !confirm("你确定要安装游戏？这会重置你之前的进度！")) return
    if (sleepPoint.gte((new D(2)).pow(128))) {
        games = games.add(gameGain())
        finishHomeworks = new D(0)
        teachers = new D(1)
        machines = new D(0)
        examinationPapers = new D(0)
        finalExaminations = new D(0)
        knowledge = new D(0)
        currentChallenge = -1
        sleepPoint = new D(1)
        dreams = [new D(0), new D(0), new D(0), new D(0)]
        dreamLevels = [new D(0), new D(0), new D(0)]
        if (GM[0] || games.gte(6)) {
            return
        }
        upgrades = [false, false, false, true]
        EU = [false, false, false, false, true]
        EC = [false, false, false, false]
        SM = [false, false, false, true]
        SU = [false, false]
    }
}

function changeSRauto() {
    SRmultiplyer = new D(prompt("输入数值："))
}

function update() {
    fix()

    for (let i = 0; i < 3; i++) {
        let goal = [3, 8, 12][i];
        if (games.gte(goal)) {
            GM[i] = true
        }
    }

    if (GM[2] && SRAuto && sleepGain().
        gte(sleepPoint.
        mul(SRmultiplyer))) {
        sleepReset(false)
    }

    for (let i = 1; i < 4; i++) {
        if (GM[2] && dreamAuto[i - 1]) {
            MaxDream(i)
        }
    }

    for (let i = 0; i < 3; i++) {
        dreams[i] = dreams[i].add(DSpeed(i + 1).mul(0.04))
    }

    if (SM[1] && ERauto && examinationGain().
        gte(examinationPapers.
        mul(sleepGainup().
        pow(ERexponential)))) {
        examinationReset(false)
    }

    if (SM[1] && FEauto) {
        MaxFE()
    }

    if (EU[1] && auto) {
        buyMax()
    }

    for (let i = 0; i < 4; i++) {
        let goal = [3, 8, 7500, 2 ** 112][i];
        if (sleepPoint.gte(goal)) {
            SM[i] = true
        }
    }

    knowledge = knowledge.add(knowledgeSpeed().mul(0.04))

    finishHomeworks = finishHomeworks.add(speed().mul(0.04))
    if (finishHomeworks.gte(assignedHomeworks())) {
        teachers = finishHomeworks.root(6).sub(1).ceil()
    }
    if (finishHomeworks.gt(maxHomework)) {
        maxHomework = finishHomeworks
    }

    display0.innerHTML = homeworks()
    display1.innerHTML = [
        homeworkMachines(), changelog(), 
        examination(), sleepDisplay(), 
        gameDisplay()][choose]
    chooses.innerHTML = choosesDisplay()

    setTimeout(update, 40)
}
update()
