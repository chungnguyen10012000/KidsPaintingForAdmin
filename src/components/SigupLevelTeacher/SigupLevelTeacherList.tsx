import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ICourse } from "../../store/models/courses.interface";
import { ICourseState, IStateType } from "../../store/models/root.interface";


export type myclassListProps = {
    onSelect?: (myclass: ICourse) => void;
    children?: React.ReactNode;
};

function SigupLevelTeacherList(props: myclassListProps): JSX.Element {


    const [checkSigup, setCheckSigup] = useState(false)

    function getDisabledClass(): string {
        return checkSigup ? "disabled" : "";
    }

    const courses: ICourseState = useSelector((state: IStateType) => state.courses);

    const courseElements: (JSX.Element | null)[] = courses.courses.map((course_item, index) => {
        if (!course_item) { return null; }
        return (<tr className={`table-row `}
            key={`class_${index}`}>
            <th scope="row">{index + 1}</th>
            <td>{course_item.name}</td>
            <td><button className={`btn btn-success left-margin ${getDisabledClass()}`} onClick={() => {
                alert("Đăng ký thành công!")
                setCheckSigup(true)
            }}
            >
                Đăng ký</button> </td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên lớp</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {courseElements}
                </tbody>
            </table>
        </div>

    );
}

export default SigupLevelTeacherList;
