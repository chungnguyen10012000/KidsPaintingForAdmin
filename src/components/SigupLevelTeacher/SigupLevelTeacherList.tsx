import React, { useState } from "react";
import { ICourse } from "../../store/models/courses.interface";

const data = [
    {
        "courseName": "Khóa học sơn dầu dành cho trẻ 9-12 tuổi",
        "maxCourseParticipant": "60"
    }
]

export type myclassListProps = {
    onSelect?: (myclass: ICourse) => void;
    children?: React.ReactNode;
};

function SigupLevelTeacherList(props: myclassListProps): JSX.Element {


    const [checkSigup, setCheckSigup] = useState(false)

    function getDisabledClass(): string {
        return checkSigup ? "disabled" : "";
    }

    const courseElements: (JSX.Element | null)[] = data.map((course_item, index) => {
        if (!course_item) { return null; }
        return (<tr className={`table-row `}
            key={`class_${index}`}>
            <th scope="row">{index + 1}</th>
            <td>{course_item.courseName}</td>
            <td>{course_item.maxCourseParticipant}</td>
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
                        <th scope="col">Số lượng tối đa học sinh</th>
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
