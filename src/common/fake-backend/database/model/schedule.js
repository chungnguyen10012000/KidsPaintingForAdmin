export class Schedule {
    constructor(scheduleJson) {
        this.id = scheduleJson.id
        this.name = scheduleJson.name
        this.description = scheduleJson.description
    }
}