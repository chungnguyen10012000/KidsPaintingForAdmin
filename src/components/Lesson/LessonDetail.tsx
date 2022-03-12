import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import ExerciseList from "../Exercises/ExerciseList";
import { useHistory } from "react-router-dom";


const LessonDetail: React.FC = () => {

  let history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Buổi học", "Chi tiết buổi học"));

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Chi tiết buổi học</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Link giảng dạy</h6>
            </div>
            <div className="card-body">
              <button
                className={`btn btn-primary btn-user btn-block`}
              >
                Tham gia ngay
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green"> Danh sách bài tập</h6>
            </div>
            <div className="card-body">
              {
                <ExerciseList />
              }
              <button
                className={`btn btn-primary btn-user btn-block`}
                onClick={() => {
                  history.push('/teacher/exercise')
                }}
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default LessonDetail;
