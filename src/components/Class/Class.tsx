import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ClassList from "./ClassList";
import ClassForm from "./ClassForm";
import TopCard from "../../common/components/TopCard";
import "./Class.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IClassState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { removeClass, clearSelectedClass, setModificationState,
  changeSelectedClass } from "../../store/actions/class.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { ClassModificationStatus, IClass} from "../../store/models/class.interface";

const MyClass: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const myClass: IClassState = useSelector((state: IStateType) => state.class);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = myClass.class.length;
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(clearSelectedClass());
    dispatch(updateCurrentPath("Giáo viên", "Danh sách"));
  }, [path.area, dispatch]);

  function onClassSelect(_class: IClass): void {
    dispatch(changeSelectedClass(_class));
    dispatch(setModificationState(ClassModificationStatus.None));
  }

  function onClassRemove() {
    if(myClass.selectedClass) {
      setPopup(true);
    }
  }

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Lớp</h1>
      <p className="mb-4">Thông tin chung</p>
      <div className="row">
        <TopCard title="TỔNG SỐ LỚP HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách lớp</h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(ClassModificationStatus.Create))}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationState(ClassModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onClassRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <ClassList
                onSelect={onClassSelect}
              />
            </div>
          </div>
        </div>
        {((myClass.modificationState === ClassModificationStatus.Create)
          || (myClass.modificationState === ClassModificationStatus.Edit && myClass.selectedClass)) ?
          <ClassForm /> : null}
      </div>


      <Popup
        className="popup-modal"
        open={popup}
        onClose={() => setPopup(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Bạn chắc chắn?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!myClass.selectedClass) {
                  return;
                }
                dispatch(addNotification("Lớp", ` ${myClass.selectedClass.name} đã bị xóa khỏi hệ thống`));
                dispatch(removeClass(myClass.selectedClass.id));
                dispatch(clearSelectedClass());
                setPopup(false);
              }}>Xóa
              </button>
          </div>
        </div>
      </Popup>
    </Fragment >
  );
};

export default MyClass;
