import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ContestList from "./ContestList";
import ContestForm from "./ContestForm";
import TopCard from "../../common/components/TopCard";
import "./Contest.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IContestState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
  removeContest, clearSelectedContest, setModificationState,
  changeSelectedContest
} from "../../store/actions/contest/contest.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { ContestModificationStatus, IContest } from "../../store/models/contest.interface";
import { useHistory, useParams } from "react-router-dom";
import { getArtType } from "../../store/actions/art_type/getArtType";
import { getLevel } from "../../store/actions/art_level/getLevel";
import { getContest } from "../../store/actions/contest/getContest";
import { deleteContest } from "../../store/actions/contest/deleteContest";

type role = {
  id: string;
};

const Contests: React.FC = () => {

  const { id } = useParams<role>()
  let [isId, setIsId] = useState<number>(0)
  let [description, setDescription] = useState<string>("");

  let history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();
  const contests: IContestState = useSelector((state: IStateType) => state.contest);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = contests.contest.length;
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    dispatch(getContest())
  }, [dispatch])

  useEffect(() => {
    dispatch(getArtType())
  }, [dispatch])
  useEffect(() => {
    dispatch(getLevel())
  }, [dispatch])

  useEffect(() => {
    dispatch(clearSelectedContest());
    dispatch(updateCurrentPath("Cuộc thi", "Danh sách"));
  }, [path.area, dispatch]);

  function onContestSelect(product: IContest): void {
    dispatch(changeSelectedContest(product));
    dispatch(setModificationState(ContestModificationStatus.None));
    setIsId(product.id)
    setDescription(product.description)
  }

  function onContestRemove() {
    if (contests.selectedContest) {
      setPopup(true);
    }
  }

  if (id === 'teacher') {
    return (
      <Fragment>
        <h1 className="h3 mb-2 text-gray-800">Cuộc thi</h1>
        <p className="mb-4">Thông tin chung</p>
        <div className="row">
          <TopCard title="TỔNG SỐ CUỘC THI" text={`${numberItemsCount}`} icon="box" class="primary" />
        </div>

        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-green">Danh sách cuộc thi</h6>
                <div className="header-buttons">
                  <button className="btn btn-success btn-blue" onClick={() => {
                    if (contests.selectedContest) {
                      history.push({
                        pathname: '/teacher/contest-grade',
                        state: { id: isId }
                      })
                    }
                  }}>
                    <i className="fas fa fa-info-circle"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <ContestList
                  onSelect={onContestSelect}
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
      <h1 className="h3 mb-2 text-gray-800">Cuộc thi</h1>
      <p className="mb-4">Thông tin chung</p>
      <div className="row">
        <TopCard title="TỔNG SỐ CUỘC THI" text={`${numberItemsCount}`} icon="box" class="primary" />
        <TopCard title="TỔNG SỐ CUỘC THI ĐÃ KẾT THÚC" text={`${numberItemsCount}`} icon="box" class="primary" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Lưu ý</h6>
            </div>
            <div className="card-body">
              <p>Những cuộc thi đã kết thúc được tô màu đỏ</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <button className="btn btn-success btn-green btn-create" onClick={() =>
            dispatch(setModificationState(ContestModificationStatus.Create))}>
            <i className="fas fa fa-plus"></i>
            Tạo cuộc thi
          </button>
        </div>

        {((contests.modificationState === ContestModificationStatus.Create)) ?
          <ContestForm /> : null}
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách cuộc thi</h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationState(ContestModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onContestRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() => {
                  if (contests.selectedContest) {
                    history.push({
                      pathname: `/${id}/contest-detail`,
                      state: { body: description }
                    })
                  }
                }}>
                  <i className="fas fa fa-info-circle"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <ContestList
                onSelect={onContestSelect}
              />
            </div>
          </div>
        </div>
        {((contests.modificationState === ContestModificationStatus.Edit && contests.selectedContest)) ?
          <ContestForm /> : null}
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
                if (!contests.selectedContest) {
                  return;
                }
                dispatch(addNotification("Cuộc thi", ` ${contests.selectedContest.name} đã bị xóa khỏi hệ thống`));
                dispatch(deleteContest(contests.selectedContest.id));
                dispatch(clearSelectedContest());
                setPopup(false);
              }}>Xóa
            </button>
          </div>
        </div>
      </Popup>
    </Fragment >
  );
};

export default Contests;
