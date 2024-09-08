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
        ({finishHomeworks = new D(0), teachers = new D(1), machines = new D(0), maxHomework = new D(0), auto = false, 
            upgrades = [false, false, false, false]} = p.homeworks);
        ({examinationPapers = new D(0), ERconfirm = true, EU = [false, false, false, false, false], finalExaminations = new D(0), knowledge = new D(0),
            EC = [false, false, false, false], ECconfirm = true, currentChallenge = -1, ERauto = false, ERexponential = new D(0.5),
            FEauto = false} = p.examination);
        ({sleepPoint = new D(0), SRconfirm = true, SM = [false, false, false, false], dreams = [new D(0), new D(0), new D(0), new D(0)], dreamLevels = [new D(0), new D(0), new D(0)],
            SU = [false, false], SRauto = false, SRmultiplyer = new D(0.025), dreamAuto = false} = p.sleep);
        ({games = new D(0), GRconfirm = true, GM = [false, false, false, false, false], GE = new D(0)} = p.game);
    } else {
        load()
    }
}
