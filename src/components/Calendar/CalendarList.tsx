import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IScheduleState } from "../../store/models/root.interface";
import { ISchedule } from "../../store/models/schedule.interface";

export type scheduleListProps = {
    onSelect?: (schedule: ISchedule) => void;
    children?: React.ReactNode;
};

function CalendarList(props: scheduleListProps): JSX.Element {

    const schedules: IScheduleState = useSelector((state: IStateType) => state.schedules);

    const scheduleElements: (JSX.Element | null)[] = schedules.schedules.map( (lesson_time_item, index) => {
        if (!lesson_time_item) { return null; }
        return (<tr className={`table-row ${(schedules.selectedSchedule && schedules.selectedSchedule.id === lesson_time_item.id) ? "selected" : ""}`}
            onClick={() => {
                if (props.onSelect) props.onSelect(lesson_time_item);
            }}
            key={`class_${index}`}>
            <th scope="row">{index}</th>
            <td>{lesson_time_item.name}</td>
            <td>{lesson_time_item.description}</td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Miêu tả</th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleElements}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="">1</a></li>
                    <li className="page-item"><a className="page-link" href="">2</a></li>
                    <li className="page-item"><a className="page-link" href="">3</a></li>
                    <li className="page-item"><a className="page-link" href="">Next</a></li>
                  </ul>
                </nav>
        </div>

    );
}

export default CalendarList;
