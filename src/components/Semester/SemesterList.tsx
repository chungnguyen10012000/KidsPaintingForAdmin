import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ISemesterState } from "../../store/models/root.interface";
import { ISemester } from "../../store/models/semester.interface";

export type semesterListProps = {
    onSelect?: (semester: ISemester) => void;
    children?: React.ReactNode;
};

function SemesterList(props: semesterListProps): JSX.Element {

    const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);

    const semesterElements: (JSX.Element | null)[] = semesters.semesters.map(lesson_time_item => {
        if (!lesson_time_item) { return null; }
        return (<tr className={`table-row ${(semesters.selectedSemester && semesters.selectedSemester.id === lesson_time_item.id) ? "selected" : ""}`}
            onClick={() => {
                if (props.onSelect) props.onSelect(lesson_time_item);
            }}
            key={`class_${lesson_time_item.id}`}>
            <th scope="row">{lesson_time_item.id}</th>
            <td>{lesson_time_item.name}</td>
            <td>{lesson_time_item.year}</td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Năm</th>
                    </tr>
                </thead>
                <tbody>
                    {semesterElements}
                </tbody>
            </table>
        </div>

    );
}

export default SemesterList;
