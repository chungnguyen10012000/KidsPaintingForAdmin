import React, { Fragment, Dispatch, useEffect } from "react";
import "./SigupOfCourse.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IStateType, IRootPageStateType } from "../../store/models/root.interface";
import { clearSelectedMyClass, setModificationState,
  changeSelectedMyClass } from "../../store/actions/myclass.actions";
import { MyClassModificationStatus, IMyClass} from "../../store/models/myclass.interface";
import SigupOfCourseList from "./SigupOfClassList";

const SigupOfCourse: React.FC = () => {
  //console.log(id)
/*   let isId: number = 0;

  let history = useHistory(); */

  const dispatch: Dispatch<any> = useDispatch();
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

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
          <div className="col-xl-12 col-lg-12">
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
        </div>
      </Fragment >
    );
};

export default SigupOfCourse;
