import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ILessonTimeState } from "../../store/models/root.interface";
import { ILessonTime } from "../../store/models/lesson_time.interface";

export type lessonTimeListProps = {
    onSelect?: (lessonTime: ILessonTime) => void;
    children?: React.ReactNode;
};

function LessonTimeList(props: lessonTimeListProps): JSX.Element {

    const lessonTimes: ILessonTimeState = useSelector((state: IStateType) => state.lessonTimes);

    const lessonTimeElements: (JSX.Element | null)[] = lessonTimes.lessonTimes.map(lesson_time_item => {
        if (!lesson_time_item) { return null; }
        return (<tr className={`table-row ${(lessonTimes.selectedLessonTime && lessonTimes.selectedLessonTime.id === lesson_time_item.id) ? "selected" : ""}`}
            onClick={() => {
                if (props.onSelect) props.onSelect(lesson_time_item);
            }}
            key={`class_${lesson_time_item.id}`}>
            <th scope="row">{lesson_time_item.id}</th>
            <td>{lesson_time_item.start_time}</td>
            <td>{lesson_time_item.end_time}</td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Thời gian bắt đầu</th>
                        <th scope="col">Thời gian kết thúc</th>
                    </tr>
                </thead>
                <tbody>
                    {lessonTimeElements}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="/">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="/">1</a></li>
                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                    <li className="page-item"><a className="page-link" href="/">Next</a></li>
                  </ul>
                </nav>
        </div>

    );
}

export default LessonTimeList;
