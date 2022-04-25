import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ContestList from "./ContestList";
import ContestForm from "./ContestForm";
import TopCard from "../../common/components/TopCard";
import "./Contest.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IContestState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import {
  clearSelectedContest, setModificationState,
  changeSelectedContest
} from "../../store/actions/contest.actions";
import { ContestModificationStatus, IContest } from "../../store/models/contest.interface";
import { useParams } from "react-router-dom";
import { getArtType } from "../../common/service/art_type/getArtType";
import { getLevel } from "../../common/service/art_level/getLevel";
import { getContest } from "../../common/service/contest/getContest";

type role = {
  id: string;
};

const Contests: React.FC = () => {

  const { id } = useParams<role>()

  const dispatch: Dispatch<any> = useDispatch();
  const contests: IContestState = useSelector((state: IStateType) => state.contest);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = contests.contest.length;
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
  }

  const [isCheckOpen1, setIsCheckOpen1] = useState(false)

  if (id === 'teacher') {
    return (
      <Fragment>
        <h1 className="h3 mb-2 text-gray-800">Cuộc thi</h1>
        <p className="mb-4">Thông tin chung</p>
        <div className="row">
          <TopCard title="TỔNG SỐ CUỘC THI" text={`${numberItemsCount}`} icon="box" class="primary" />
        </div>

        <h6 className="mb-4 font-weight-bold text-green">Danh sách cuộc thi</h6>

        <div className="row">
          <ContestList />
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
            {
              dispatch(setModificationState(ContestModificationStatus.Create))
              setIsCheckOpen1(!isCheckOpen1)
            }}>
            <i className="fas fa fa-plus"></i>
            Tạo cuộc thi
          </button>
        </div>

        {((contests.modificationState === ContestModificationStatus.Create && isCheckOpen1 === true)) ?
          <ContestForm /> : null}
      </div>

      <h6 className="mb-4 font-weight-bold text-green">Danh sách cuộc thi</h6>

      <div className="row">
        <ContestList onSelect={onContestSelect}/>
      </div> 
    </Fragment >
  );
};

export default Contests;
