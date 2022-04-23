import React from "react";
import { useSelector } from "react-redux";
import { ICourseState, ILevelState, IMytypeState, IStateType } from "../../store/models/root.interface";


function SigupLevelTeacherList(): JSX.Element {


    const courses: ICourseState = useSelector((state: IStateType) => state.courses);
    const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);
    const levels: ILevelState = useSelector((state: IStateType) => state.levels);

    let typeList: string[] = []

    courses.courses.map((course_item) => {
        return mytypes.mytypes.forEach(element => {
            if (element.id === course_item.art_type_id) {
                return typeList.push(element.name)
            }
        });
    })

    let levelList: string[] = []

    courses.courses.map((course_item) => {
        return levels.levels.forEach(element => {
            if (element.id === course_item.art_level_id) {
                return levelList.push(element.name)
            }
        });
    })

    const courseElements: (JSX.Element | null)[] = courses.courses.map((course_item, index) => {
        if (!course_item) { return null; }
        return (
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" key={index}>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">{course_item.name}</h6>
                        <div className="header-buttons">
                        </div>
                    </div>
                    <img className="card-img-top" src={require('../../assets/img/course/course_2.jpg')} alt=""></img>
                    <div className="card-body">
                        <p className="card-text">Thể loại: {typeList[index]}</p>
                        <p className="card-text">Trình độ: {levelList[index]}</p>
                        <button className="btn btn-success">Đăng kí</button>
                    </div>
                </div>
            </div>
        );
    });


    return (
        <>
            {courseElements}
        </>

    );
}

export default SigupLevelTeacherList;
