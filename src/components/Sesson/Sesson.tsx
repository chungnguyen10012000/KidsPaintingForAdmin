import React, { Fragment, Dispatch, useState, useEffect } from "react";
import SessonList from "./SessonList";
import SessonForm from "./SessonForm";
import TopCard from "../../common/components/TopCard";
import "./Sesson.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ISessonState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { removeSesson, clearSelectedSesson, setModificationState,
  changeSelectedSesson } from "../../store/actions/sesson.action";
import { addNotification } from "../../store/actions/notifications.action";
import { SessonModificationStatus, ISesson} from "../../store/models/sesson.interface";
import { useLocation } from "react-router-dom";
//import { useParams } from "react-router";

type role = {
  id: string;
};

const Sesson: React.FC = () => {
  //const { id } = useParams<role>()
  //console.log(id)
  let location = useLocation()
  let { isId } = location.state
  console.log(isId)
  const dispatch: Dispatch<any> = useDispatch();
  const sesson: ISessonState = useSelector((state: IStateType) => state.sessons);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = sesson.sessons.length;
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(clearSelectedSesson());
    dispatch(updateCurrentPath("Lớp", "Buổi học"));
  }, [path.area, dispatch]);

  function onSessonSelect(sesson: ISesson): void {
    dispatch(changeSelectedSesson(sesson));
    dispatch(setModificationState(SessonModificationStatus.None));
  }

  function onSessonRemove() {
    if(sesson.selectedSesson) {
      setPopup(true);
    }
  }

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
                <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(SessonModificationStatus.Create))}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationState(SessonModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onSessonRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <SessonList
                onSelect={onSessonSelect}
              />
            </div>
          </div>
        </div>
        {((sesson.modificationState === SessonModificationStatus.Create)
          || (sesson.modificationState === SessonModificationStatus.Edit && sesson.selectedSesson)) ?
          <SessonForm /> : null}
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
                if (!sesson.selectedSesson) {
                  return;
                }
                dispatch(addNotification("Lớp", ` ${sesson.selectedSesson.name} đã bị xóa khỏi hệ thống`));
                dispatch(removeSesson(sesson.selectedSesson.id));
                dispatch(clearSelectedSesson());
                setPopup(false);
              }}>Xóa
              </button>
          </div>
        </div>
      </Popup>
    </Fragment >
  );
};

export default Sesson;
