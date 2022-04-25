import React, { Dispatch, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IContestState, IMytypeState, ILevelState } from "../../store/models/root.interface";
import { IContest, ContestModificationStatus } from "../../store/models/contest.interface";
import { useHistory, useParams } from "react-router-dom";
import { clearSelectedContest, setModificationState } from "../../store/actions/contest.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { deleteContest } from "../../common/service/contest/deleteContest";
import Popup from "reactjs-popup";


type Options = {
  name: string;
  value: any;
}

type role = {
  id: string;
};

export type contestListProps = {
  onSelect?: (contest: IContest) => void;
  children?: React.ReactNode;
};

function ContestList(props: contestListProps): JSX.Element {

  let history = useHistory();
  const { id } = useParams<role>()

  const dispatch: Dispatch<any> = useDispatch();

  const contests: IContestState = useSelector((state: IStateType) => state.contest);
  const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);
  const levels: ILevelState = useSelector((state: IStateType) => state.levels);

  let typeList: string[] = []
  let levelList: string[] = []
    contests.contest.map((contest_item) => {
      return mytypes.mytypes.forEach(element => {
        if (element.id === contest_item.art_type_id) {
          return typeList.push(element.name)
        }
      });
    })

    contests.contest.map((contest_item) => {
      return levels.levels.forEach(element => {
        if (element.id === contest_item.art_level_id) {
          return levelList.push(element.name)
        }
      });
    })

  const [popup, setPopup] = useState(false);
  const [contest, setContest] = useState<any>()

  function onContestRemove(contest: IContest) {
    console.log('enter Remove')
    setPopup(true);
    setContest(contest)
  }


  const contestElements: (JSX.Element | null)[] = contests.contest.map((contest_item, index) => {
    if (!contest_item) { return null; }
    return (
      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" key={index}>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{contest_item.name}</h6>
            <div className="header-buttons">
            </div>
          </div>
          <img className="card-img-top" src={require('../../assets/img/contest/contest_1.png')} alt="" onClick={() => {
            history.push({
              pathname: `/${id}/contest-detail`,
              state: { body: contest_item.description }
            })
          }}></img>
          <div className="card-body">
            <p className="card-text">Thể loại: {typeList[index]}</p>
            <p className="card-text">Trình độ: {levelList[index]}</p>
            <p className="card-text">Số người tham gia tối đa: {contest_item.max_participant}</p>
            <p className="card-text">Thời gian: {contest_item.start_time} đến {contest_item.end_time}</p>
            <button
              className="btn btn-success btn-blue"
              onClick={() => {
                if (props.onSelect) props.onSelect(contest_item);
                dispatch(setModificationState(ContestModificationStatus.Edit))
                history.push({
                  pathname: `/${id}/edit-contest`,
                  state: { body: contest_item.description }
                })
              }
              }
            >
              <i className="fas fa fa-pen"></i>
              Chỉnh sửa</button>
            <button className="btn btn-success btn-red float-right" onClick={() => {
              onContestRemove(contest_item)
            }}>
              <i className="fas fa fa-times" ></i>
              Xóa
            </button>
          </div>
        </div>
      </div>
    );
  });


  const productElements: (JSX.Element | null)[] = contests.contest.map((contest_item, index) => {
    if (!contest_item) { return null; }
    return (
      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" key={index}>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{contest_item.name}</h6>
            <div className="header-buttons">
            </div>
          </div>
          <img className="card-img-top" src={require('../../assets/img/contest/contest_1.png')} alt=""></img>
          <div className="card-body">
            <p className="card-text">Thể loại: {typeList[index]}</p>
            <p className="card-text">Trình độ: {levelList[index]}</p>
            <p className="card-text">Số người tham gia tối đa: {contest_item.max_participant}</p>
            <p className="card-text">Thời gian: {contest_item.start_time} đến {contest_item.end_time}</p>
            <button
              className="btn btn-success"
              onClick={() => {
                history.push({
                  pathname: '/teacher/contest-grade',
                  state: { id: contest_item.id }
                })
              }
              }
            >Chấm bài</button>
          </div>
        </div>
      </div>
    );
  });


  return (
    <>
      {
        function () {
          if (id === 'teacher') {
            return productElements
          }
          else {
            return contestElements
          }
        }()
      }
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
                if (!contest) {
                  return;
                }
                dispatch(addNotification("Cuộc thi", ` ${contest.name} đã bị xóa khỏi hệ thống`));
                dispatch(deleteContest(contest.id));
                dispatch(clearSelectedContest());
                setPopup(false);
              }}>Xóa
            </button>
          </div>
        </div>
      </Popup>


    </>
  );
}

export default ContestList;

