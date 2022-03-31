import React, { Fragment, Dispatch, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import "./SigupOfCourse.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IMyClassState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import { clearSelectedMyClass, setModificationState,
  changeSelectedMyClass } from "../../store/actions/myclass.actions";
import { MyClassModificationStatus, IMyClass} from "../../store/models/myclass.interface";
import SigupOfCourseList from "./SigupOfCourseList";

const SigupOfCourse: React.FC = () => {
  //console.log(id)
/*   let isId: number = 0;

  let history = useHistory(); */

  const dispatch: Dispatch<any> = useDispatch();
  const myClass: IMyClassState = useSelector((state: IStateType) => state.myclass);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = myClass.myclass.length;

  useEffect(() => {
    dispatch(clearSelectedMyClass());
    dispatch(updateCurrentPath("Lớp", "Danh sách"));
  }, [path.area, dispatch]);

  function onMyClassSelect(myClass: IMyClass): void {
    dispatch(changeSelectedMyClass(myClass));
    dispatch(setModificationState(MyClassModificationStatus.None));
  }

    return (
      <Fragment>
        <h1 className="h3 mb-2 text-gray-800">Đăng ký</h1>
        <p className="mb-4">Thông tin chung</p>
        <div className="row">
          <TopCard title="TỔNG SỐ LỚP" text={`${numberItemsCount}`} icon="box" class="primary" />
          <TopCard title="TỔNG SỐ KHÓA" text={`${numberItemsCount}`} icon="box" class="primary" />
        </div>
  
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-green">Danh sách lớp</h6>
                <div className="header-buttons">
                </div>
              </div>
              <div className="card-body">
                <SigupOfCourseList
                  onSelect={onMyClassSelect}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-green">Danh sách khóa học</h6>
                <div className="header-buttons">
                </div>
              </div>
              <div className="card-body">
                <SigupOfCourseList
                  onSelect={onMyClassSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment >
    );
};

export default SigupOfCourse;
