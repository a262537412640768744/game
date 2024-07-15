let select = name => document.querySelector(`.${name}`)
let display0 = select("D0")
let display1 = select("D1")
let chooses = select("chooses")

let assignedHomeworks = () => teachers.add(1).pow(6)
let auto = false
let examinationPapers = new D(0)
let examinationGain = () => finishHomeworks.root(20).sub(1).floor()
let EU = [false, false, false, false, false]
let finalExaminations = new D(0)
let finishHomeworks = new D(0)
let fPrice = () => finalExaminations.
    pow(2).
    add(finalExaminations).
    mul(3).
    add(1)
let knowledge = new D(0)
let knowledgeSpeed = () => finalExaminations.div(10)
let knowledgeSpeedup = () => knowledge.div(10).add(1).pow(6)
let machines = new D(0)
let maxHomework = new D(0)
let price = () => machines
let speedup = () => upgrades[1] ? teachers.sqrt() : new D(1)
let examinationSpeedup = () => examinationPapers.div(10).add(1).pow(5)
let speed = () => machines.mul(speedup()).
    mul(examinationSpeedup()).
    mul(knowledgeSpeedup()).
    mul(upgrades[0] ? 0.75 : 0.25)
let teachers = new D(1)
let upgrades = [false, false, false, false]
load()
save()

let choose = 0

function buyMachine() {
    if (finishHomeworks.gte(price())) {
        finishHomeworks = finishHomeworks.sub(price())
        machines = machines.add(1)
    }
}

function buyMax() {
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

function examinationReset() {
    if (finishHomeworks.gte(1048576)) {
        examinationPapers = examinationPapers.add(examinationGain())
        finishHomeworks = new D(0)
        teachers = new D(1)
        machines = new D(0)
        if (EU[0]) {
            return
        }
        upgrades = [false, false, false, true]
    }
}

function buyEU(n) {
    let EUPrice = [20, 40, 1600, 100000, 25000000][n]
    if (examinationPapers.gte(EUPrice)) {
        examinationPapers = examinationPapers.sub(EUPrice)
        EU[n] = true
    }
}

function HaveFinalExam() {
    if (examinationPapers.gte(fPrice())) {
        examinationPapers = examinationPapers.sub(fPrice())
        finalExaminations = finalExaminations.add(1)
    }
}

function update() {
    if (EU[1] && auto) {
        buyMax()
    }

    finishHomeworks = finishHomeworks.add(speed().mul(0.04))
    if (finishHomeworks.gte(assignedHomeworks())) {
        teachers = finishHomeworks.root(6).sub(1).ceil()
    }
    if (finishHomeworks.gt(maxHomework)) {
        maxHomework = finishHomeworks
    }

    knowledge = knowledge.add(knowledgeSpeed().mul(0.04))

    display0.innerHTML = homeworks()
    display1.innerHTML = [homeworkMachines(), changelog(), examination()][choose]
    chooses.innerHTML = choosesDisplay()

    setTimeout(update, 40)
}
update()
