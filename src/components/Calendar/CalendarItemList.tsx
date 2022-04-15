import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IScheduleItemState, IScheduleState } from "../../store/models/root.interface";
import { IScheduleItem } from "../../store/models/schedule_item.interface";
import { ISchedule } from "../../store/models/schedule.interface";

export type scheduleItemListProps = {
    onSelect?: (scheduleItem: IScheduleItem) => void;
    children?: React.ReactNode;
};

function CalendarItemList(props: scheduleItemListProps): JSX.Element {

    const scheduleItems: IScheduleItemState = useSelector((state: IStateType) => state.scheduleItems);
    const schedules: IScheduleState | null = useSelector((state: IStateType) => state.schedules);
    console.log(schedules.schedules)
    console.log(scheduleItems.scheduleItems)
    const scheduleItemElements: (JSX.Element | null)[] = scheduleItems.scheduleItems.map(lesson_time_item => {
        if (!lesson_time_item) { return null; }
        console.log("id schedule: ", lesson_time_item.schedule_id)
        const result: any = schedules.schedules.find( (name: ISchedule) => name.id === lesson_time_item.schedule_id );
        console.log("thuoc",result)

        return (<tr className={`table-row ${(scheduleItems.selectedScheduleItem && scheduleItems.selectedScheduleItem.id === lesson_time_item.id) ? "selected" : ""}`}
            onClick={() => {
                if (props.onSelect) props.onSelect(lesson_time_item);
            }}
            key={`class_${lesson_time_item.id}`}>
            <th scope="row">{lesson_time_item.id}</th>
            <td>{result.name}</td>
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
