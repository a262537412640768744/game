function save() {
    localStorage.setItem("homework", finishHomeworks.toString())
    localStorage.setItem("teacher", teachers.toString())
    localStorage.setItem("automate", machines.toString())
    localStorage.setItem("max", maxHomework.toString())
    localStorage.setItem("upgrades", JSON.stringify(upgrades))
    localStorage.setItem("examinationPapers", examinationPapers.toString())
    localStorage.setItem("ERconfirm", JSON.stringify(ERconfirm))
    localStorage.setItem("EU", JSON.stringify(EU))
    localStorage.setItem("auto", JSON.stringify(auto))
    localStorage.setItem("finals", finalExaminations.toString())
    localStorage.setItem("knowledge", knowledge.toString())
    localStorage.setItem("EC", JSON.stringify(EC))
    localStorage.setItem("ECconfirm", JSON.stringify(ECconfirm))
    localStorage.setItem("currentChallenge", JSON.stringify(currentChallenge))
    localStorage.setItem("sleep", sleepPoint.toString())
    localStorage.setItem("SRconfirm", JSON.stringify(SRconfirm))
    localStorage.setItem("SM", JSON.stringify(SM))
    localStorage.setItem("ERauto", JSON.stringify(ERauto))
    localStorage.setItem("ERexponential", ERexponential.toString())
    localStorage.setItem("FEauto", JSON.stringify(FEauto))
    setTimeout(save, 0)
}

function get(name, default_, func) {
    return localStorage.getItem(name) === null ? default_ : func(localStorage.getItem(name))
}

function load() {
    finishHomeworks = get("homework", new D(0), n => new D(n))
    teachers = get("teacher", new D(1), n => new D(n))
    machines = get("automate", new D(0), n => new D(n))
    maxHomework = get("max", new D(0), n => new D(n))
    upgrades = get("upgrades", [false, false, false, false], JSON.parse)
    examinationPapers = get("examinationPapers", new D(0), n => new D(n))
    ERconfirm = get("ERconfirm", true, JSON.parse)
    EU = get("EU", [false, false, false, false, false], JSON.parse)
    auto = get("auto", false, JSON.parse)
    finalExaminations = get("finals", new D(0), n => new D(n))
    knowledge = get("knowledge", new D(0), n => new D(n))
    EC = get("EC", [false, false, false, false], JSON.parse)
    ECconfirm = get("ECconfirm", true, JSON.parse)
    currentChallenge = get("currentChallenge", -1, JSON.parse)
    sleepPoint = get("sleep", new D(0), n => new D(n))
    SRconfirm = get("SRconfirm", true, JSON.parse)
    SM = get("SM", [false, false, false, false], JSON.parse)
    ERauto = get("ERauto", false, JSON.parse)
    ERexponential = get("ERexponential", 0.5, n => new D(n))
    FEauto = get("FEauto", false, JSON.parse)
}

function reset() {
    choose = 0
    finishHomeworks = new D(0)
    teachers = new D(1)
    machines = new D(0)
    maxHomework = new D(0)
    upgrades = [false, false, false, false]
    examinationPapers = new D(0)
    ERconfirm = true
    EU = [false, false, false, false, false]
    auto = false
    finalExaminations = new D(0)
    knowledge = new D(0)
    EC = [false, false, false, false]
    ECconfirm = true
    currentChallenge = -1
    sleepPoint = new D(0)
    SRconfirm = true
    SM = [false, false, false, false]
    ERauto = false
    ERexponential = new D(0)
    FEauto = false
}