import React, { Fragment, Dispatch, useEffect } from "react";
import "./SigupLevelTeacher.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IStateType, IRootPageStateType } from "../../store/models/root.interface";
import SigupLevelTeacherList from "./SigupLevelTeacherList";
import { getCourse } from "../../common/service/course/getCourse";
import { getArtType } from "../../common/service/art_type/getArtType";
import { getLevel } from "../../common/service/art_level/getLevel";

const SigupLevelTeacher: React.FC = () => {
    //console.log(id)
    /*   let isId: number = 0;
    
      let history = useHistory(); */

    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(getCourse())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getArtType())
    }, [dispatch])
    
    useEffect(() => {
        dispatch(getLevel())
    }, [dispatch])

    useEffect(() => {
        dispatch(updateCurrentPath("Lớp", "Danh sách"));
    }, [path.area, dispatch]);

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Đăng ký</h1>
            <p className="mb-4">Thông tin chung</p>

            <h6 className="mb-4 font-weight-bold text-green">Danh sách trình độ</h6>

            <div className="row">
                <SigupLevelTeacherList />
            </div>
        </Fragment >
    );
};

export default SigupLevelTeacher;
