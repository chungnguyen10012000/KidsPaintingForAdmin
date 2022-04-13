export class Contest {
    constructor(contestJson) {
        this.contestID = contestJson.contestID
        this.contestName = contestJson.contestName
        this.contestBody = contestJson.contestBody
        this.contestStatus = contestJson.contestStatus
        this.startTime = contestJson.startTime
        this.endTime = contestJson.endTime
    }
}