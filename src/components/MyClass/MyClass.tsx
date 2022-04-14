import React, { Fragment, Dispatch, useState, useEffect } from "react";
import MyClassList from "./MyClassList";
import MyClassForm from "./MyClassForm";
import TopCard from "../../common/components/TopCard";
import "./MyClass.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IMyClassState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { removeMyClass, clearSelectedMyClass, setModificationState,
  changeSelectedMyClass } from "../../store/actions/myclass.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { MyClassModificationStatus, IMyClass} from "../../store/models/myclass.interface";
import { useParams } from "react-router";
import MyClassListForKid from "./MyClassListForKid";
import { useHistory } from "react-router-dom";
import MyClassWasTeachList from "./MyClassWasTeachList"

type role = {
  id: string;
};

const MyClass: React.FC = () => {
  const { id } = useParams<role>()
  //console.log(id)
  let isId: number = 0;

  let history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();
  const myClass: IMyClassState = useSelector((state: IStateType) => state.myclass);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = myClass.myclass.length;
  const [popup, setPopup] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  console.log(searchTerm)

  useEffect(() => {
    dispatch(clearSelectedMyClass());
    dispatch(updateCurrentPath("Lớp", "Danh sách"));
  }, [path.area, dispatch]);

  function onMyClassSelect(myClass: IMyClass): void {
    dispatch(changeSelectedMyClass(myClass));
    dispatch(setModificationState(MyClassModificationStatus.None));
    isId = myClass.id
  }

  function onMyClassRemove() {
    if(myClass.selectedMyClass) {
      setPopup(true);
    }
  }

  if (id === "teacher") {
    return (
      <Fragment>
        <h1 className="h3 mb-2 text-gray-800">Lớp</h1>
        <p className="mb-4">Thông tin chung</p>
        <div className="row">
          <TopCard title="TỔNG SỐ LỚP HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
          <TopCard title="TỔNG SỐ HỌC SINH" text={`${numberItemsCount}`} icon="box" class="primary" />
        </div>
  
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-green">Danh sách lớp</h6>
                <div className="header-buttons">
                </div>
              </div>
              <div className="card-body">
                <MyClassListForKid
                  onSelect={onMyClassSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment >
    );
  }

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Lớp</h1>
      <p className="mb-4">Thông tin chung</p>
      <div className="row">
        <TopCard title="TỔNG SỐ LỚP HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
        <div className="col-xl-6 col-md-6 mb-4">
            <div className="card-body">
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={handleChange}
                style={{width: '100%'}}
              />
            </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách lớp</h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(MyClassModificationStatus.Create))}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationState(MyClassModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onMyClassRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() => 
                  {
                    if (myClass.selectedMyClass){
                      history.push({
                        pathname: '/admin/sesson',
                        state: { id : isId}
                      })
                    }
                  }}>
                  <i className="fas fa fa-info-circle"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <MyClassList
                onSelect={onMyClassSelect}
              />
            </div>
          </div>
        </div>
        {((myClass.modificationState === MyClassModificationStatus.Create)
          || (myClass.modificationState === MyClassModificationStatus.Edit && myClass.selectedMyClass)) ?
          <MyClassForm /> : null}
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
                if (!myClass.selectedMyClass) {
                  return;
                }
                dispatch(addNotification("Lớp", ` ${myClass.selectedMyClass.name} đã bị xóa khỏi hệ thống`));
                dispatch(removeMyClass(myClass.selectedMyClass.id));
                dispatch(clearSelectedMyClass());
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
