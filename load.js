function save() {
    localStorage.setItem("homework", finishHomeworks.toString())
    localStorage.setItem("teacher", teachers.toString())
    localStorage.setItem("automate", machines.toString())
    localStorage.setItem("max", maxHomework.toString())
    localStorage.setItem("upgrades", JSON.stringify(upgrades))
    localStorage.setItem("examinationPapers", examinationPapers.toString())
    localStorage.setItem("EU", JSON.stringify(EU))
    localStorage.setItem("auto", JSON.stringify(auto))
    localStorage.setItem("finals", finalExaminations.toString())
    localStorage.setItem("knowledge", knowledge.toString())
    localStorage.setItem("EC", JSON.stringify(EC))
    localStorage.setItem("currentChallenge", JSON.stringify(currentChallenge))
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
    EU = get("EU", [false, false, false, false, false], JSON.parse)
    auto = get("auto", false, JSON.parse)
    finalExaminations = get("finals", new D(0), n => new D(n))
    knowledge = get("knowledge", new D(0), n => new D(n))
    EC = get("EC", [false, false, false, false], JSON.parse)
    currentChallenge = get("currentChallenge", 0, JSON.parse)
}

function reset() {
    choose = 0
    finishHomeworks = new D(0)
    teachers = new D(1)
    machines = new D(0)
    maxHomework = new D(0)
    upgrades = [false, false, false, false]
    examinationPapers = new D(0)
    EU = [false, false, false, false, false]
    auto = false
    finalExaminations = new D(0)
    knowledge = new D(0)
    EC = [false, false, false, false]
    currentChallenge = -1
}