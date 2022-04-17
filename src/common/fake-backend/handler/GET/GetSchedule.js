import { sheduleList } from "../../database/data/schedule"
import { Schedule } from "../../database/model/schedule"

const contexParse = (res) => {
    const schedules = []
    res.forEach(element => {
        schedules.push(new Schedule(element))
    });
    return schedules
}

export function getSchedule(ok) {
    const fakeScheduleList = contexParse(sheduleList)
    return ok(fakeScheduleList);
}