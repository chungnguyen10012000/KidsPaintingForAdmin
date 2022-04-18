import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IScheduleItemState, IScheduleState, ILessonTimeState } from "../../store/models/root.interface";
import { IScheduleItem } from "../../store/models/schedule_item.interface";

export type scheduleItemListProps = {
    onSelect?: (scheduleItem: IScheduleItem) => void;
    children?: React.ReactNode;
};

function CalendarItemList(props: scheduleItemListProps): JSX.Element {

    const scheduleItems: IScheduleItemState = useSelector((state: IStateType) => state.scheduleItems);
    const schedules: IScheduleState | null = useSelector((state: IStateType) => state.schedules);
    const lessonTimes: ILessonTimeState = useSelector((state: IStateType) => state.lessonTimes);

    let scheduleList: string[] = []
    scheduleItems.scheduleItems.map ((schedule_item) => {
        return schedules.schedules.forEach(element => {
            if (element.id === schedule_item.schedule_id){
                return scheduleList.push(element.name)
            }
        });
    })

    let lessonTimeList: string[] = []
    scheduleItems.scheduleItems.map ((schedule_item) => {
        return lessonTimes.lessonTimes.forEach(element => {
            if (element.id === schedule_item.lesson_time){
                return lessonTimeList.push(`${element.start_time} => ${element.end_time}`)
            }
        });
    })
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
            <td>{scheduleList[index]}</td>
            <td>{lessonTimeList[index]}</td> 
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
