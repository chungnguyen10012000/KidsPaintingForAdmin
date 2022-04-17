import { contestList } from "../../database/data/contest"
import { Contest } from "../../database/model/contest"

const contexParse = (res) => {
    const contests = []
    res.forEach(element => {
        contests.push(new Contest(element))
    });
    return contests
}

export function getContest(ok) {
    const fakeContestList = contexParse(contestList)
    return ok(fakeContestList);
}