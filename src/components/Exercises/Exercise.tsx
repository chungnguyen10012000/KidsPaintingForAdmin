import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ExerciseList from "./ExerciseList";
import ExerciseForm from "./ExerciseForm";
import TopCard from "../../common/components/TopCard";
import "./Exercise.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IExerciseState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { removeExercise, clearSelectedExercise, setModificationState,
  changeSelectedExercise } from "../../store/actions/exercise.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { ExerciseModificationStatus, IExercise } from "../../store/models/exercise.interface";
import { useHistory } from "react-router-dom";


const Exercises: React.FC = () => {

  let history = useHistory();

  const [idExercise, setIdExercise] = useState<number>(0)

  const dispatch: Dispatch<any> = useDispatch();
  const exercises: IExerciseState = useSelector((state: IStateType) => state.exercises);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = exercises.exercises.length;
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(clearSelectedExercise());
    dispatch(updateCurrentPath("Bài tập",""));
  }, [path.area, dispatch]);

  function onExerciseSelect(product: IExercise): void {
    dispatch(changeSelectedExercise(product));
    dispatch(setModificationState(ExerciseModificationStatus.None));
    setIdExercise(product.id)
  }

  function onExerciseRemove() {
    if(exercises.selectedExercise) {
      setPopup(true);
    }
  }

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Bài tập</h1>
      <p className="mb-4">Thông tin chung</p>
      <div className="row">
        <TopCard title="TỔNG SỐ BÀI TẬP" text={`${numberItemsCount}`} icon="box" class="primary" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách bài tập</h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(ExerciseModificationStatus.Create))}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationState(ExerciseModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onExerciseRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() => 
                  {
                    if (exercises.selectedExercise){
                      history.push({
                        pathname: `/teacher/exercise-grade`,
                        state: {id: idExercise}
                      })
                    }
                  }}>
                  <i className="fas fa fa-info-circle"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <ExerciseList
                onSelect={onExerciseSelect}
              />
            </div>
          </div>
        </div>
        {((exercises.modificationState === ExerciseModificationStatus.Create)
          || (exercises.modificationState === ExerciseModificationStatus.Edit && exercises.selectedExercise)) ?
          <ExerciseForm /> : null}
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
                if (!exercises.selectedExercise) {
                  return;
                }
                dispatch(addNotification("Cuộc thi", ` ${exercises.selectedExercise.name} đã bị xóa khỏi hệ thống`));
                dispatch(removeExercise(exercises.selectedExercise.id));
                dispatch(clearSelectedExercise());
                setPopup(false);
              }}>Xóa
              </button>
          </div>
        </div>
      </Popup>
    </Fragment >
  );
};

export default Exercises;
