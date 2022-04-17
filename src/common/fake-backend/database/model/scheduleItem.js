export class ScheduleItem {
    constructor(scheduleItemJson) {
        this.id = scheduleItemJson.id
        this.schedule_id = scheduleItemJson.schedule_id
        this.date_of_week = scheduleItemJson.date_of_week
        this.lesson_time = scheduleItemJson.lesson_time
    }
}