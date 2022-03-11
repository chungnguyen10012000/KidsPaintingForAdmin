import React, { Fragment, Dispatch, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import "./Lesson.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IMyClassState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import {
    clearSelectedMyClass,
} from "../../store/actions/myclass.actions";
import { useLocation, useHistory } from 'react-router-dom';

const Lesson: React.FC = () => {

    let location = useLocation()
    let { id } = location.state
    //console.log(id)
    let history = useHistory()

    const dispatch: Dispatch<any> = useDispatch();
    const myClass: IMyClassState = useSelector((state: IStateType) => state.myclass);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    let numberItemsCount: number = 0; // length lesson of class
    for (let index = 0; index < myClass.myclass.length; index++) {
        if(myClass.myclass[index].id === id){
            numberItemsCount = myClass.myclass[index].amount
        }
        
    }
    //console.log(numberItemsCount)
    const n = Array.from(Array(numberItemsCount + 1).keys())

    useEffect(() => {
        dispatch(clearSelectedMyClass());
        dispatch(updateCurrentPath("Buổi học", "Danh sách"));
    }, [path.area, dispatch]);

    const myLessonElements: (JSX.Element | null)[] = n.map(lesson_item => {
        if (!lesson_item) { return null; }
        return (<tr className={`table-row ${(myClass.selectedMyClass && myClass.selectedMyClass.id === id) ? "selected" : ""}`}
          onClick={() => {
            history.push({
                pathname: '/teacher/lesson-detail',
                state: { id : lesson_item}
            })
          }}
          key={`lesson_${lesson_item}`}>
          <th scope="row">{lesson_item}</th>
          <td>{lesson_item}</td>
        </tr>);
      });
    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Buổi học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="TỔNG SỐ BUỔI HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách buổi học</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive portlet">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Buổi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            myLessonElements
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default Lesson;
