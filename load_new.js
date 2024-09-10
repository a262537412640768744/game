function player() {
    return {
        homeworks: {
            homeworks: finishHomeworks,
            teachers: teachers,
            machines: machines,
            maxHomework: maxHomework,
            upgrades: upgrades,
            auto: auto
        },
        examination: {
            examination: examinationPapers,
            ERconfirm: ERconfirm,
            EU: EU,
            finalExaminations: finalExaminations,
            knowledge: knowledge,
            EC: EC,
            ECconfirm: ECconfirm,
            currentChallenge: currentChallenge,
            ERauto: ERauto,
            ERexponential: ERexponential,
            FEauto: FEauto
        },
        sleep: {
            sleepPoint: sleepPoint,
            SRconfirm: SRconfirm,
            SM: SM,
            dreams: dreams,
            dreamLevels: dreamLevels,
            SU: SU,
            SRauto: SRauto,
            SRmultiplyer: SRmultiplyer,
            dreamAuto: dreamAuto
        },
        game: {
            games: games,
            GRconfirm: GRconfirm,
            GM: GM,
            GE: GE
        }
    }
}

function save_new() {
    localStorage.setItem("homeworkIncremental", JSON.stringify(player()))
    setTimeout(save_new, 40)
}

function transformToDecimal(object) {
    for (i in object) {
        if (typeof (object[i]) == "string" && !isNaN(new Decimal(object[i]).mag)) {
            object[i] = new Decimal(object[i])
        }
        if (typeof (object[i]) == "object" && !isNaN(new Decimal(object[i]).mag)) {
            transformToDecimal(object[i])
        }
    }
}

function load_new() {
    if (localStorage.getItem("homeworkIncremental") !== null) {
        let p = JSON.parse(localStorage.getItem("homeworkIncremental"))
        transformToDecimal(p);
        ({homeworks: finishHomeworks = new D(0), teachers: teachers = new D(1), machines: machines = new D(0), maxHomework: maxHomework = new D(0), auto: auto = false, 
            upgrades: upgrades = [false, false, false, false]} = p.homeworks);
        ({examination: examinationPapers = new D(0), ERconfirm: ERconfirm = true, EU: EU = [false, false, false, false, false], finalExaminations: finalExaminations = new D(0), knowledge: knowledge = new D(0),
            EC: EC = [false, false, false, false], ECconfirm: ECconfirm = true, currentChallenge: currentChallenge = -1, ERauto: ERauto = false, ERexponential: ERexponential = new D(0.5),
            FEauto: FEauto = false} = p.examination);
        ({sleepPoint: sleepPoint = new D(0), SRconfirm: SRconfirm = true, SM: SM = [false, false, false, false], dreams: dreams = [new D(0), new D(0), new D(0), new D(0)], dreamLevels: dreamLevels = [new D(0), new D(0), new D(0)],
            SU: SU = [false, false], SRauto: SRauto = false, SRmultiplyer: SRmultiplyer = new D(0.025), dreamAuto: dreamAuto = false} = p.sleep);
        ({games: games = new D(0), GRconfirm: GRconfirm = true, GM: GM = [false, false, false, false, false], GE: GE = new D(0)} = p.game);
    } else {
        load()
    }
}
