import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";

//import { useLocation } from "react-router-dom";

import "quill/dist/quill.snow.css";





const ExerciseGrade: React.FC = () => {

    //let { id } = useLocation().state

    const dispatch: Dispatch<any> = useDispatch();
    dispatch(updateCurrentPath("Bài tập", "Danh sách nộp"));


    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Chấm điểm bài tập</h1>
            <p className="mb-4">Thông tin chung</p>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <h6 className="m-0 font-weight-bold text-green">Danh sách bài nộp</h6>
                </div>
                <div className="card-body text-center">
                    <img src="https://media.fmp-data.bliss.build/original_images/Air_competition_1.jpg" alt="Girl in a jacket" width="500" height="600" />
                    <form >
                        <div className="form-group">
                            <label>Nhập điểm</label>
                            <input type="text" className="form-control" placeholder="" />
                            <label>Nhận xét</label>
                            <input type="text" className="form-control" placeholder="" />
                            <button className="btn btn-primary">Gửi</button>
                        </div>
                    </form>
                </div>
            </div>

        </Fragment>
    )
};

export default ExerciseGrade;
