import { sheduleItemList } from "../../database/data/schedule_item"
import { ScheduleItem } from "../../database/model/scheduleItem"

const contexParse = (res) => {
    const scheduleItems = []
    res.forEach(element => {
        scheduleItems.push(new ScheduleItem(element))
    });
    return scheduleItems
}

export function getScheduleItem(ok) {
    const fakeScheduleItemList = contexParse(sheduleItemList)
    return ok(fakeScheduleItemList);
}