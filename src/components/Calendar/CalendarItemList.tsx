import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IScheduleItemState, IScheduleState, ILessonTimeState } from "../../store/models/root.interface";
import { IScheduleItem } from "../../store/models/schedule_item.interface";
import { ISchedule } from "../../store/models/schedule.interface";
import { ILessonTime } from "../../store/models/lesson_time.interface";

export type scheduleItemListProps = {
    onSelect?: (scheduleItem: IScheduleItem) => void;
    children?: React.ReactNode;
};

function CalendarItemList(props: scheduleItemListProps): JSX.Element {

    const scheduleItems: IScheduleItemState = useSelector((state: IStateType) => state.scheduleItems);
    const schedules: IScheduleState | null = useSelector((state: IStateType) => state.schedules);
    const lessonTimes: ILessonTimeState = useSelector((state: IStateType) => state.lessonTimes);
    // console.log(schedules.schedules)
    // console.log(scheduleItems.scheduleItems)
    const scheduleItemElements: (JSX.Element | null)[] = scheduleItems.scheduleItems.map((lesson_time_item, index)=> {
        if (!lesson_time_item) { return null; }
        //console.log("id schedule: ", lesson_time_item.schedule_id)
        // let result: any = schedules.schedules.find( (name: ISchedule) => name.id === lesson_time_item.schedule_id );
        // let result_1: any = lessonTimes.lessonTimes.find( (name: ILessonTime) => name.id === lesson_time_item.lesson_time );
        // console.log('lesson time',result_1)
        return (<tr className={`table-row ${(scheduleItems.selectedScheduleItem && scheduleItems.selectedScheduleItem.id === lesson_time_item.id) ? "selected" : ""}`}
            onClick={() => {
                if (props.onSelect) props.onSelect(lesson_time_item);
            }}
            key={`class_${index}`}>
            <th scope="row">{index}</th>
            <td>{lesson_time_item.schedule_id}</td>
            <td>{lesson_time_item.lesson_time}</td> 
            <td>{lesson_time_item.date_of_week}</td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Thuộc lịch</th>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Ngày trong tuần</th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleItemElements}
                </tbody>
            </table>
        </div>

    );
}

export default CalendarItemList;
